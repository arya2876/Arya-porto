import { createContext, useContext, useState, useEffect } from 'react';

// Static fallback data (from original constants & data files)
import { personalInfo, statistics, socialLinks, skills, techStack, aboutJourney } from '../data/personalInfo';
import { experienceTimeline } from '../data/experience';
import { projects, portfolioCategories } from '../data/projects';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { workingProcess } from '../data/workingProcess';

const API_BASE = '/api';

const defaultData = {
    personalInfo,
    statistics,
    socialLinks,
    skills,
    techStack,
    aboutJourney,
    experience: experienceTimeline,
    projects,
    portfolioCategories,
    services,
    testimonials,
    workingProcess,
    certificates: [],
    loaded: false,
};

const PortfolioDataContext = createContext(defaultData);

/**
 * Transform API response to match the format expected by components
 */
function transformAllData(apiData, staticData) {
    // personal-info?type=all returns { personalInfo, statistics, socialLinks, skills, techStack }
    const info = apiData.personalInfo || {};

    // Convert social links from array to object format
    const socialObj = {};
    (apiData.socialLinks || []).forEach(link => {
        socialObj[link.platform] = link.url;
    });

    return {
        personalInfo: {
            ...staticData.personalInfo,
            name: info.name || staticData.personalInfo.name,
            roles: info.roles || staticData.personalInfo.roles,
            primaryRole: info.primary_role || staticData.personalInfo.primaryRole,
            tagline: info.tagline || staticData.personalInfo.tagline,
            description: info.description || staticData.personalInfo.description,
            profileImage: info.profile_image || staticData.personalInfo.profileImage,
            profileImageFallback: info.profile_image_fallback || staticData.personalInfo.profileImageFallback,
            status: info.status || staticData.personalInfo.status,
            email: info.email || staticData.personalInfo.email,
            phone: info.phone || staticData.personalInfo.phone,
            location: info.location || staticData.personalInfo.location,
        },
        statistics: (apiData.statistics || []).map(s => ({
            value: parseInt(s.value),
            suffix: s.suffix,
            label: s.label,
        })),
        socialLinks: socialObj,
        skills: (apiData.skills || []).map(s => ({
            name: s.name,
            level: parseInt(s.level),
            category: s.category,
        })),
        techStack: (apiData.techStack || []).map(t => t.name),
        aboutJourney: {
            paragraphs: info.about_paragraphs || staticData.aboutJourney?.paragraphs || [],
        },
    };
}

export function PortfolioDataProvider({ children }) {
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        async function fetchAll() {
            try {
                const results = await Promise.allSettled([
                    fetch(`${API_BASE}/personal-info?type=all`).then(r => r.json()),
                    fetch(`${API_BASE}/experience`).then(r => r.json()),
                    fetch(`${API_BASE}/projects`).then(r => r.json()),
                    fetch(`${API_BASE}/services`).then(r => r.json()),
                    fetch(`${API_BASE}/testimonials`).then(r => r.json()),
                    fetch(`${API_BASE}/working-process`).then(r => r.json()),
                    fetch(`${API_BASE}/certificates`).then(r => r.json()),
                    fetch(`${API_BASE}/projects?type=categories`).then(r => r.json()),
                ]);

                const [allPersonal, exp, proj, svc, testi, wp, cert, cats] = results.map(
                    r => r.status === 'fulfilled' ? r.value : null
                );

                const transformed = allPersonal ? transformAllData(allPersonal, defaultData) : {};

                setData({
                    personalInfo: transformed.personalInfo || defaultData.personalInfo,
                    statistics: transformed.statistics?.length ? transformed.statistics : defaultData.statistics,
                    socialLinks: Object.keys(transformed.socialLinks || {}).length ? transformed.socialLinks : defaultData.socialLinks,
                    skills: transformed.skills?.length ? transformed.skills : defaultData.skills,
                    techStack: transformed.techStack?.length ? transformed.techStack : defaultData.techStack,
                    aboutJourney: transformed.aboutJourney || defaultData.aboutJourney,
                    experience: exp?.length ? exp : defaultData.experience,
                    projects: proj?.length ? proj : defaultData.projects,
                    portfolioCategories: cats?.length ? cats : defaultData.portfolioCategories,
                    services: svc?.length ? svc : defaultData.services,
                    testimonials: testi?.length ? testi : defaultData.testimonials,
                    workingProcess: wp?.length ? wp : defaultData.workingProcess,
                    certificates: cert || [],
                    loaded: true,
                });
            } catch (err) {
                console.warn('[Portfolio] API unavailable, using static data:', err.message);
                setData({ ...defaultData, loaded: true });
            }
        }
        fetchAll();
    }, []);

    return (
        <PortfolioDataContext.Provider value={data}>
            {children}
        </PortfolioDataContext.Provider>
    );
}

/**
 * Hook to access portfolio data from the API (with static fallback)
 */
export function usePortfolioContext() {
    return useContext(PortfolioDataContext);
}

export default PortfolioDataContext;
