import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

/**
 * /api/upload-cert — upload file sertifikat (gambar / PDF / Word)
 * ke Supabase Storage bucket "certificates".
 *
 * Method: POST (multipart/form-data via base64 body JSON)
 * Body: { file: "<base64>", filename: "nama.pdf", mimeType: "application/pdf" }
 */
export default async function handler(req, res) {
    if (handleCors(req, res)) return;
    if (req.method !== 'POST') return jsonError(res, 'Method not allowed', 405);
    if (!requireAuth(req, res)) return;

    try {
        const { file, filename, mimeType } = req.body || {};
        if (!file || !filename) return jsonError(res, 'file and filename are required', 400);

        // Allowed types: image, PDF, Word
        const allowed = [
            'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (mimeType && !allowed.includes(mimeType)) {
            return jsonError(res, `File type not allowed: ${mimeType}`, 400);
        }

        // Decode base64
        const base64Data = file.replace(/^data:[^;]+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Sanitize filename
        const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `${Date.now()}_${safeFilename}`;

        const supabase = getSupabase();

        // Ensure bucket exists (idempotent)
        await supabase.storage.createBucket('certificates', { public: true }).catch(() => {});

        const { error: uploadError } = await supabase.storage
            .from('certificates')
            .upload(path, buffer, {
                contentType: mimeType || 'application/octet-stream',
                upsert: false,
            });

        if (uploadError) return jsonError(res, uploadError.message, 500);

        const { data: urlData } = supabase.storage.from('certificates').getPublicUrl(path);

        return jsonResponse(res, {
            success: true,
            url: urlData.publicUrl,
            path,
            filename: safeFilename,
            mimeType: mimeType || 'application/octet-stream',
        });
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
