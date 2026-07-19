import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaCertificate, FaExternalLinkAlt, FaTimes, FaFilePdf,
    FaFileWord, FaImage, FaTrophy, FaMedal, FaBook
} from 'react-icons/fa';
import { usePortfolioContext } from '../../context/PortfolioDataContext';
import { achievementsFallback } from '../../data/achievements';
import { navNum } from '../../data/navigation';
import FadeIn from '../animations/FadeIn';
import ScrollGradientText from '../ui/ScrollGradientText';
import SectionHeading from '../ui/SectionHeading';

/**
 * Achievements Section (06)
 * Menampilkan sertifikat & penghargaan dari Supabase via admin panel.
 * Mendukung tampilan file gambar, PDF, dan Word dengan viewer modal.
 */

const CATEGORY_ICONS = {
    certification: FaCertificate,
    award: FaTrophy,
    achievement: FaMedal,
    course: FaBook,
    bootcamp: FaBook,
    workshop: FaBook,
};

const CATEGORY_COLORS = {
    certification: 'from-yellow-500/20 to-orange-500/20 text-yellow-400',
    award: 'from-purple-500/20 to-pink-500/20 text-purple-400',
    achievement: 'from-blue-500/20 to-cyan-500/20 text-blue-400',
    course: 'from-green-500/20 to-emerald-500/20 text-green-400',
    bootcamp: 'from-green-500/20 to-emerald-500/20 text-green-400',
    workshop: 'from-indigo-500/20 to-violet-500/20 text-indigo-400',
};

/** Deteksi tipe file dari URL */
function getFileType(url) {
    if (!url) return 'none';
    const lower = url.toLowerCase();
    if (lower.match(/\.(pdf)(\?|$)/)) return 'pdf';
    if (lower.match(/\.(doc|docx)(\?|$)/)) return 'word';
    if (lower.match(/\.(jpg|jpeg|png|webp|gif|svg|avif)(\?|$)/)) return 'image';
    // Supabase Storage URL for PDFs often has no extension — check content
    if (lower.includes('.pdf')) return 'pdf';
    if (lower.includes('.doc')) return 'word';
    return 'image'; // default: try to render as image
}

/** Ikon file sesuai tipe */
function FileTypeIcon({ url, className = 'w-5 h-5' }) {
    const type = getFileType(url);
    if (type === 'pdf') return <FaFilePdf className={className} />;
    if (type === 'word') return <FaFileWord className={className} />;
    return <FaImage className={className} />;
}

/** Badge tipe file */
function FileTypeBadge({ url }) {
    const type = getFileType(url);
    if (type === 'pdf') return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold uppercase tracking-wider">PDF</span>;
    if (type === 'word') return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold uppercase tracking-wider">DOC</span>;
    return null;
}

/** Preview thumbnail untuk card */
function CertThumbnail({ cert }) {
    const type = getFileType(cert.image);
    const CategoryIcon = CATEGORY_ICONS[cert.category] || FaCertificate;
    const colorClass = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS.certification;

    if (cert.image && type === 'image') {
        return (
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute top-2 right-2">
                    <FileTypeBadge url={cert.image} />
                </div>
            </div>
        );
    }

    if (cert.image && (type === 'pdf' || type === 'word')) {
        return (
            <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 relative">
                {type === 'pdf'
                    ? <FaFilePdf className="w-12 h-12 text-red-400 mb-2" />
                    : <FaFileWord className="w-12 h-12 text-blue-400 mb-2" />}
                <span className="text-xs text-slate-400">
                    {type === 'pdf' ? 'PDF Document' : 'Word Document'}
                </span>
                <div className="absolute top-2 right-2"><FileTypeBadge url={cert.image} /></div>
            </div>
        );
    }

    // No file — show category icon
    return (
        <div className={`aspect-video flex items-center justify-center bg-gradient-to-br ${colorClass}`}>
            <CategoryIcon className="w-14 h-14 opacity-40" />
        </div>
    );
}

const Achievements = () => {
    const { certificates } = usePortfolioContext();
    const [selectedCert, setSelectedCert] = useState(null);
    const [filter, setFilter] = useState('all');

    const items = certificates?.length ? certificates : achievementsFallback;

    // Unique categories for filter tabs
    const categories = ['all', ...new Set(items.map(c => c.category).filter(Boolean))];

    const filtered = filter === 'all' ? items : items.filter(c => c.category === filter);

    const fileType = selectedCert ? getFileType(selectedCert.image) : null;

    return (
        <div className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <FadeIn className="text-center mb-12">
                    <SectionHeading num={navNum('achievements')} title="Achievements" />
                    <ScrollGradientText
                        as="h2"
                        className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4 text-light-text dark:text-dark-text"
                        scrollColor="#F59E0B"
                    >
                        ACHIEVEMENTS
                    </ScrollGradientText>
                    <p className="section-subtitle">
                        Professional certifications, awards and recognitions
                    </p>
                </FadeIn>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <FadeIn className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                                    filter === cat
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-primary-500/50'
                                }`}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </button>
                        ))}
                    </FadeIn>
                )}

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-light-text-secondary dark:text-dark-text-secondary">
                        <FaTrophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>No achievements in this category yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((cert, index) => {
                            const CategoryIcon = CATEGORY_ICONS[cert.category] || FaCertificate;
                            const colorClass = CATEGORY_COLORS[cert.category] || CATEGORY_COLORS.certification;
                            return (
                                <FadeIn key={cert.id || index} delay={index * 0.08}>
                                    <motion.div
                                        className="group relative bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden cursor-pointer h-full flex flex-col"
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        transition={{ duration: 0.25 }}
                                        onClick={() => setSelectedCert(cert)}
                                    >
                                        {/* Thumbnail */}
                                        <CertThumbnail cert={cert} />

                                        {/* Info */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass} flex-shrink-0`}>
                                                    <CategoryIcon className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-light-text dark:text-dark-text text-sm leading-tight group-hover:text-primary-500 transition-colors line-clamp-2">
                                                        {cert.title}
                                                    </h3>
                                                    {cert.issuer && (
                                                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                                                            {cert.issuer}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-light-border/50 dark:border-dark-border/50">
                                                {cert.date && (
                                                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-500 font-medium">
                                                        {cert.date}
                                                    </span>
                                                )}
                                                {cert.category && (
                                                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-secondary-500/10 text-secondary-500 font-medium capitalize">
                                                        {cert.category}
                                                    </span>
                                                )}
                                                {cert.image && (
                                                    <FileTypeBadge url={cert.image} />
                                                )}
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                                            <span className="text-white text-xs font-medium">Click to view →</span>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            className="bg-light-card dark:bg-dark-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-light-border dark:border-dark-border">
                                <h3 className="text-lg font-bold text-light-text dark:text-dark-text pr-4 line-clamp-2">
                                    {selectedCert.title}
                                </h3>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="flex-shrink-0 p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Preview Area */}
                            {selectedCert.image && (
                                <div className="border-b border-light-border dark:border-dark-border">
                                    {fileType === 'image' ? (
                                        <img
                                            src={selectedCert.image}
                                            alt={selectedCert.title}
                                            className="w-full max-h-64 object-contain bg-black/10"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 gap-3 bg-slate-50 dark:bg-slate-900">
                                            {fileType === 'pdf'
                                                ? <FaFilePdf className="w-16 h-16 text-red-400" />
                                                : <FaFileWord className="w-16 h-16 text-blue-400" />}
                                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                {fileType === 'pdf' ? 'PDF Document' : 'Word Document'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Info */}
                            <div className="p-5 space-y-3">
                                {selectedCert.issuer && (
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        Issued by: <strong className="text-light-text dark:text-dark-text">{selectedCert.issuer}</strong>
                                    </p>
                                )}
                                {selectedCert.date && (
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        Date: <strong className="text-light-text dark:text-dark-text">{selectedCert.date}</strong>
                                    </p>
                                )}
                                {selectedCert.category && (
                                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 font-medium capitalize">
                                        {selectedCert.category}
                                    </span>
                                )}

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {selectedCert.credential_url && (
                                        <a
                                            href={selectedCert.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm hover:bg-primary-600 transition-colors"
                                        >
                                            <FaExternalLinkAlt className="w-3 h-3" /> Verify Credential
                                        </a>
                                    )}
                                    {selectedCert.image && (
                                        <a
                                            href={selectedCert.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-light-border dark:border-dark-border text-sm hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                                        >
                                            <FileTypeIcon url={selectedCert.image} className="w-3 h-3" />
                                            {fileType === 'pdf' ? 'Open PDF' : fileType === 'word' ? 'Open Document' : 'View Image'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Achievements;
