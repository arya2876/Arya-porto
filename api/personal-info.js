import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;

    const supabase = getSupabase();
    const type = req.query.type || 'info';
    const id = req.query.id;

    try {
        switch (req.method) {
            case 'GET': {
                if (type === 'all') {
                    const [info, stats, social, skills, techStack] = await Promise.all([
                        supabase.from('personal_info').select('*').limit(1).single(),
                        supabase.from('statistics').select('*').order('sort_order'),
                        supabase.from('social_links').select('*').order('sort_order'),
                        supabase.from('skills').select('*').order('sort_order'),
                        supabase.from('tech_stack').select('*').order('sort_order'),
                    ]);
                    return jsonResponse(res, {
                        personalInfo: info.data || {},
                        statistics: stats.data || [],
                        socialLinks: social.data || [],
                        skills: skills.data || [],
                        techStack: techStack.data || [],
                    });
                }
                if (type === 'stats') {
                    const { data } = await supabase.from('statistics').select('*').order('sort_order');
                    return jsonResponse(res, data || []);
                }
                if (type === 'social') {
                    const { data } = await supabase.from('social_links').select('*').order('sort_order');
                    return jsonResponse(res, data || []);
                }
                const { data } = await supabase.from('personal_info').select('*').limit(1).single();
                return jsonResponse(res, data || {});
            }

            case 'PUT': {
                if (!requireAuth(req, res)) return;
                const body = req.body;

                if (type === 'stats') {
                    const { error } = await supabase.from('statistics').update({
                        value: body.value, suffix: body.suffix, label: body.label, sort_order: body.sort_order || 0
                    }).eq('id', body.id);
                    if (error) return jsonError(res, error.message, 500);
                    return jsonResponse(res, { success: true });
                }

                if (type === 'social') {
                    const { error } = await supabase.from('social_links').update({
                        platform: body.platform, url: body.url, icon: body.icon, sort_order: body.sort_order || 0
                    }).eq('id', body.id);
                    if (error) return jsonError(res, error.message, 500);
                    return jsonResponse(res, { success: true });
                }

                // Update personal info
                const { data: existing } = await supabase.from('personal_info').select('id').limit(1).single();
                if (existing) {
                    const { error } = await supabase.from('personal_info').update({
                        name: body.name, roles: body.roles, primary_role: body.primary_role,
                        tagline: body.tagline, description: body.description,
                        profile_image: body.profile_image, profile_image_fallback: body.profile_image_fallback,
                        status: body.status, email: body.email, phone: body.phone,
                        location: body.location, cv_url: body.cv_url, about_paragraphs: body.about_paragraphs,
                        updated_at: new Date().toISOString(),
                    }).eq('id', existing.id);
                    if (error) return jsonError(res, error.message, 500);
                } else {
                    const { error } = await supabase.from('personal_info').insert(body);
                    if (error) return jsonError(res, error.message, 500);
                }
                return jsonResponse(res, { success: true, message: 'Personal info updated' });
            }

            case 'POST': {
                if (!requireAuth(req, res)) return;
                const body = req.body;
                const table = type === 'stats' ? 'statistics' : type === 'social' ? 'social_links' : null;
                if (!table) return jsonError(res, 'Invalid type for POST');
                const { data, error } = await supabase.from(table).insert(body).select().single();
                if (error) return jsonError(res, error.message, 500);
                return jsonResponse(res, { success: true, id: data.id });
            }

            case 'DELETE': {
                if (!requireAuth(req, res)) return;
                if (!id) return jsonError(res, 'ID required');
                const table = type === 'stats' ? 'statistics' : type === 'social' ? 'social_links' : null;
                if (!table) return jsonError(res, 'Invalid type for DELETE');
                const { error } = await supabase.from(table).delete().eq('id', id);
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
