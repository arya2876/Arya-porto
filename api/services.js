import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;
    const supabase = getSupabase();
    const id = req.query.id;

    try {
        switch (req.method) {
            case 'GET': {
                const { data, error } = await supabase.from('services').select('*').order('sort_order');
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, data || []);
            }
            case 'POST': {
                if (!requireAuth(req, res)) return;
                const body = req.body;
                if (typeof body.features === 'string') body.features = JSON.parse(body.features);
                if (typeof body.technologies === 'string') body.technologies = JSON.parse(body.technologies);
                const { data, error } = await supabase.from('services').insert(body).select().single();
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true, id: data.id });
            }
            case 'PUT': {
                if (!requireAuth(req, res)) return;
                const body = req.body;
                if (typeof body.features === 'string') body.features = JSON.parse(body.features);
                if (typeof body.technologies === 'string') body.technologies = JSON.parse(body.technologies);
                const { error } = await supabase.from('services').update(body).eq('id', body.id);
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true });
            }
            case 'DELETE': {
                if (!requireAuth(req, res)) return;
                if (!id) return jsonError(res, 'ID required');
                const { error } = await supabase.from('services').delete().eq('id', id);
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true });
            }
            default:
                return jsonError(res, 'Method not allowed', 405);
        }
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
