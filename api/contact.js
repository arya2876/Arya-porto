import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

/**
 * /api/contact — form contact publik menyimpan pesan ke contact_messages.
 *
 * Lapisan pertahanan:
 * 1. Honeypot ("website"): bot mengisinya, manusia tidak melihatnya.
 * 2. Validasi + sanitasi server-side (panjang, format email, strip control chars).
 * 3. Rate limit sederhana per-IP (in-memory; reset saat cold start — cukup
 *    sebagai speed bump di serverless).
 * 4. Insert memakai service role di SERVER SAJA (pola api/* yang sudah ada);
 *    RLS di tabel aktif tanpa policy anon → anon key tidak bisa apa-apa.
 * 5. GET hanya untuk admin ber-JWT (baca pesan masuk dari panel admin).
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    return false;
}

function sanitize(value, maxLen) {
    if (typeof value !== 'string') return '';
    return value
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .replace(/\s{3,}/g, ' ')
        .trim()
        .slice(0, maxLen);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
    if (handleCors(req, res)) return;

    try {
        switch (req.method) {
            case 'POST': {
                const body = req.body || {};

                // Honeypot terisi → pura-pura sukses supaya bot tidak belajar.
                if (typeof body.website === 'string' && body.website.length > 0) {
                    return jsonResponse(res, { success: true });
                }

                const ip =
                    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
                    req.socket?.remoteAddress ||
                    'unknown';
                if (isRateLimited(ip)) {
                    return jsonError(res, 'Too many messages — please wait a minute and try again.', 429);
                }

                const name = sanitize(body.name, 100);
                const email = sanitize(body.email, 150);
                const message = sanitize(body.message, 2000);
                // Field opsional dari form yang ada (subject/projectType) ikut disimpan di message
                const subject = sanitize(body.subject, 150);
                const projectType = sanitize(body.projectType, 50);

                if (name.length < 2) return jsonError(res, 'Please enter your name.', 400);
                if (!EMAIL_RE.test(email)) return jsonError(res, 'Please enter a valid email address.', 400);
                if (message.length < 10) return jsonError(res, 'Message is too short (minimum 10 characters).', 400);

                const fullMessage = [
                    projectType ? `[${projectType}]` : '',
                    subject ? `${subject} — ` : '',
                    message,
                ].join(' ').trim();

                const supabase = getSupabase();
                const { error } = await supabase
                    .from('contact_messages')
                    .insert({ name, email, message: fullMessage });
                if (error) return jsonError(res, 'Could not save your message. Please try again later.', 500);
                return jsonResponse(res, { success: true });
            }
            case 'GET': {
                // Hanya admin (JWT) yang boleh membaca pesan masuk.
                if (!requireAuth(req, res)) return;
                const supabase = getSupabase();
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, data || []);
            }
            default:
                return jsonError(res, 'Method not allowed', 405);
        }
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
