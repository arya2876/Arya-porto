import bcrypt from 'bcryptjs';
import { getSupabase, handleCors, generateToken, verifyAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;

    const supabase = getSupabase();
    const action = req.query.action || (req.method === 'GET' ? 'check' : 'login');

    try {
        switch (action) {
            case 'login': {
                const { username, password } = req.body || {};
                if (!username || !password) {
                    return jsonError(res, 'Username and password required', 400);
                }

                const { data: user, error } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('username', username)
                    .single();

                if (error || !user) {
                    return jsonError(res, 'Invalid username or password', 401);
                }

                const validPassword = await bcrypt.compare(password, user.password_hash);
                if (!validPassword) {
                    return jsonError(res, 'Invalid username or password', 401);
                }

                const token = generateToken({ id: user.id, username: user.username, name: user.full_name });
                return jsonResponse(res, {
                    success: true,
                    token,
                    user: { id: user.id, username: user.username, name: user.full_name }
                });
            }

            case 'check': {
                const user = verifyAuth(req);
                if (!user) {
                    return jsonError(res, 'Not authenticated', 401);
                }
                return jsonResponse(res, { authenticated: true, user });
            }

            case 'logout': {
                return jsonResponse(res, { success: true, message: 'Logged out' });
            }

            case 'setup': {
                // One-time setup: create admin user with hashed password
                const hash = await bcrypt.hash('admin123', 10);
                const { error } = await supabase
                    .from('admin_users')
                    .upsert({ username: 'admin', password_hash: hash, full_name: 'Admin' }, { onConflict: 'username' });

                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true, message: 'Admin user created. Username: admin, Password: admin123' });
            }

            default:
                return jsonError(res, 'Invalid action', 400);
        }
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
