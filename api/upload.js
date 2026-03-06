import { handleCors, requireAuth, jsonResponse, jsonError } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
        return jsonError(res, 'Method not allowed', 405);
    }

    if (!requireAuth(req, res)) return;

    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            return jsonError(res, 'Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to env.', 500);
        }

        const { image } = req.body; // base64 string
        if (!image) return jsonError(res, 'No image provided', 400);

        const folder = req.body.folder || 'portfolio';

        // Upload to Cloudinary via REST API
        const formData = new URLSearchParams();
        formData.append('file', image);
        formData.append('upload_preset', 'portfolio_unsigned');
        formData.append('folder', folder);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.error) {
            return jsonError(res, data.error.message, 500);
        }

        return jsonResponse(res, {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height,
        });
    } catch (err) {
        return jsonError(res, err.message, 500);
    }
}
