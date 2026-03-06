import { getSupabase, handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
        return jsonError(res, 'Method not allowed', 405);
    }

    if (!requireAuth(req, res)) return;

    try {
        const supabase = getSupabase();

        // For Vercel, we use Supabase Storage for file uploads
        // The admin panel sends files as base64 or via direct Supabase upload
        // This endpoint returns the Supabase storage URL config
        const { data: buckets } = await supabase.storage.listBuckets();
        const portfolioBucket = buckets?.find(b => b.name === 'portfolio');

        if (!portfolioBucket) {
            // Create the bucket if it doesn't exist
            await supabase.storage.createBucket('portfolio', {
                public: true,
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf'],
                fileSizeLimit: 5 * 1024 * 1024, // 5MB
            });
        }

        // Generate a signed upload URL for the client
        const filename = `${Date.now()}-${req.body.filename || 'upload'}`;
        const folder = req.body.folder || 'images';
        const filePath = `${folder}/${filename}`;

        const { data, error } = await supabase.storage
            .from('portfolio')
            .createSignedUploadUrl(filePath);

        if (error) return jsonError(res, error.message, 500);

        const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/portfolio/${filePath}`;

        return jsonResponse(res, {
            success: true,
            signedUrl: data.signedUrl,
            token: data.token,
            path: filePath,
            publicUrl,
        });
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
