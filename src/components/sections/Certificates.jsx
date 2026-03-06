import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { usePortfolioContext } from '../../context/PortfolioDataContext';
import FadeIn from '../animations/FadeIn';
import ScrollGradientText from '../ui/ScrollGradientText';

/**
 * Certificates & Awards Section
 */
const Certificates = () => {
    const { certificates } = usePortfolioContext();
    const [selectedCert, setSelectedCert] = useState(null);

    if (!certificates || certificates.length === 0) return null;

    return (
        <section id="certificates" className="section-padding bg-light-bg dark:bg-dark-bg relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <FadeIn className="text-center mb-16">
                    <ScrollGradientText
                        as="h2"
                        className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4 text-light-text dark:text-dark-text"
                        scrollColor="#F59E0B"
                    >
                        CERTIFICATES & AWARDS
                    </ScrollGradientText>
                    <p className="section-subtitle">
                        Professional certifications and achievements
                    </p>
                </FadeIn>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <FadeIn key={cert.id || index} delay={index * 0.1}>
                            <motion.div
                                className="group relative bg-light-card dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden cursor-pointer"
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedCert(cert)}
                            >
                                {/* Certificate Image */}
                                {cert.image && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                {/* Certificate Info */}
                                <div className="p-6">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-500">
                                            <FaCertificate className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-light-text dark:text-dark-text text-lg leading-tight group-hover:text-primary-500 transition-colors">
                                                {cert.title}
                                            </h3>
                                            {cert.issuer && (
                                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                                                    {cert.issuer}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {cert.date && (
                                            <span className="text-xs px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 font-medium">
                                                {cert.date}
                                            </span>
                                        )}
                                        {cert.category && (
                                            <span className="text-xs px-3 py-1 rounded-full bg-secondary-500/10 text-secondary-500 font-medium capitalize">
                                                {cert.category}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white text-sm font-medium">Click to view details →</span>
                                </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* Certificate Detail Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            className="bg-light-card dark:bg-dark-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {selectedCert.image && (
                                <img src={selectedCert.image} alt={selectedCert.title} className="w-full aspect-video object-cover" />
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">{selectedCert.title}</h3>
                                    <button onClick={() => setSelectedCert(null)} className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                                        <FaTimes />
                                    </button>
                                </div>
                                {selectedCert.issuer && <p className="text-light-text-secondary dark:text-dark-text-secondary mb-2">Issued by: <strong>{selectedCert.issuer}</strong></p>}
                                {selectedCert.date && <p className="text-light-text-secondary dark:text-dark-text-secondary mb-2">Date: {selectedCert.date}</p>}
                                {selectedCert.credential_id && <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">Credential ID: {selectedCert.credential_id}</p>}
                                {selectedCert.credential_url && (
                                    <a
                                        href={selectedCert.credential_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                                    >
                                        <FaExternalLinkAlt /> View Credential
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
