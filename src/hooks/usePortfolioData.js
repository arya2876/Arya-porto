import { useState, useEffect } from 'react';

// API base URL - uses Vite proxy in dev, relative path in production
const API_BASE = '/api/endpoints';

/**
 * Custom hook to fetch portfolio data from the PHP API
 * Falls back to static data if the API is unavailable
 * 
 * @param {string} endpoint - API endpoint path (e.g., 'personal-info.php?type=all')
 * @param {*} fallbackData - Static data to use as fallback
 * @param {function} transform - Optional transform function for API data
 * @returns {{ data: *, loading: boolean, error: string|null, refetch: function }}
 */
export function usePortfolioData(endpoint, fallbackData = null, transform = null) {
    const [data, setData] = useState(fallbackData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/${endpoint}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            let result = await response.json();

            if (transform) {
                result = transform(result);
            }

            setData(result);
            setError(null);
        } catch (err) {
            console.warn(`[Portfolio API] Failed to fetch ${endpoint}, using fallback:`, err.message);
            setError(err.message);
            // Keep fallback data
            if (fallbackData !== null) {
                setData(fallbackData);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Fetch all personal data at once (personal info + stats + social + skills + tech stack)
 */
export function useAllPersonalData(fallback = {}) {
    return usePortfolioData('personal-info.php?type=all', fallback);
}

/**
 * Fetch experience timeline
 */
export function useExperience(fallback = []) {
    return usePortfolioData('experience.php', fallback);
}

/**
 * Fetch projects
 */
export function useProjects(fallback = []) {
    return usePortfolioData('projects.php', fallback);
}

/**
 * Fetch portfolio categories
 */
export function usePortfolioCategories(fallback = []) {
    return usePortfolioData('projects.php?type=categories', fallback);
}

/**
 * Fetch services
 */
export function useServices(fallback = []) {
    return usePortfolioData('services.php', fallback);
}

/**
 * Fetch testimonials
 */
export function useTestimonials(fallback = []) {
    return usePortfolioData('testimonials.php', fallback);
}

/**
 * Fetch certificates
 */
export function useCertificates(fallback = []) {
    return usePortfolioData('certificates.php', fallback);
}

/**
 * Fetch working process
 */
export function useWorkingProcess(fallback = []) {
    return usePortfolioData('working-process.php', fallback);
}

export default usePortfolioData;
