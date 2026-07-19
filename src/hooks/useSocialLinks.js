/**
 * useSocialLinks — single hook untuk social links dari Supabase/context.
 *
 * Urutan prioritas:
 * 1. Data dari Supabase (via PortfolioDataContext → socialLinks object)
 * 2. Fallback ke personalInfo.socialLinks (data/personalInfo.js)
 *
 * Return: object { instagram, tiktok, linkedin, github, ... }
 * Setiap key hanya ada jika URL-nya valid (bukan '#' atau kosong).
 */
import { usePortfolioContext } from '../context/PortfolioDataContext';
import { socialLinks as staticSocialLinks } from '../data/personalInfo';

export function useSocialLinks() {
    const { socialLinks: contextSocial } = usePortfolioContext();

    // Gabungkan: context menang, fallback ke static
    const merged = {
        ...staticSocialLinks,       // static fallback
        ...(contextSocial || {}),   // override dengan data dari Supabase
    };

    // Filter: buang yang kosong atau '#'
    const clean = {};
    Object.entries(merged).forEach(([platform, url]) => {
        if (url && url !== '#' && url.trim() !== '') {
            clean[platform] = url;
        }
    });

    return clean;
}

/** Helper: ambil satu platform, kembalikan url atau '#' */
export function useSocialUrl(platform) {
    const links = useSocialLinks();
    return links[platform] || '#';
}

export default useSocialLinks;
