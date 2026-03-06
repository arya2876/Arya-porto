import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;
    const supabase = getSupabase();
    const type = req.query.type;
    const id = req.query.id;

    try {
        // Handle categories
        if (type === 'categories') {
            if (req.method === 'GET') {
                const { data, error } = await supabase.from('portfolio_categories').select('*').order('sort_order');
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, data || []);
            }
        }

        switch (req.method) {
            case 'GET': {
                const { data, error } = await supabase.from('projects').select('*').order('sort_order');
                if (error) return jsonError(res, error.message, 500);
                // Transform snake_case to camelCase for frontend
                const transformed = (data || []).map(p => ({
                    ...p,
                    fullDescription: p.full_description,
                    liveUrl: p.live_url,
                    githubUrl: p.github_url,
                    placeholderVariant: p.placeholder_variant,
                }));
                return jsonResponse(res, transformed);
            }
            case 'POST': {
                if (!requireAuth(req, res)) return;
                const body = req.body;
                if (typeof body.tags === 'string') body.tags = JSON.parse(body.tags);
                if (typeof body.technologies === 'string') body.technologies = JSON.parse(body.technologies);
                if (typeof body.images === 'string') body.images = JSON.parse(body.images);
                const { data, error } = await supabase.from('projects').insert(body).select().single();
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true, id: data.id });
            }
            case 'PUT': {
                if (!requireAuth(req, res)) return;
                const body = req.body;
                if (typeof body.tags === 'string') body.tags = JSON.parse(body.tags);
                if (typeof body.technologies === 'string') body.technologies = JSON.parse(body.technologies);
                if (typeof body.images === 'string') body.images = JSON.parse(body.images);
                const { error } = await supabase.from('projects').update(body).eq('id', body.id);
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true });
            }
            case 'DELETE': {
                if (!requireAuth(req, res)) return;
                if (!id) return jsonError(res, 'ID required');
                const { error } = await supabase.from('projects').delete().eq('id', id);
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
