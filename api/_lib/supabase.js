import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const jwtSecret = process.env.JWT_SECRET || 'default-secret-change-me';

/**
 * Get Supabase client with service role (bypasses RLS)
 */
export function getSupabase() {
    return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * Set CORS headers
 */
export function setCors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Handle CORS preflight
 */
export function handleCors(req, res) {
    setCors(res);
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}

/**
 * Generate JWT token
 */
export function generateToken(payload) {
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
}

/**
 * Verify JWT token from Authorization header
 */
export function verifyAuth(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    try {
        const token = authHeader.split(' ')[1];
        return jwt.verify(token, jwtSecret);
    } catch {
        return null;
    }
}

/**
 * Require authentication - sends 401 if not authenticated
 */
export function requireAuth(req, res) {
    const user = verifyAuth(req);
    if (!user) {
        res.status(401).json({ error: 'Unauthorized. Please login first.' });
        return null;
    }
    return user;
}

/**
 * Send JSON response
 */
export function jsonResponse(res, data, status = 200) {
    res.status(status).json(data);
}

/**
 * Send error response
 */
export function jsonError(res, message, status = 400) {
    res.status(status).json({ error: message });
}
