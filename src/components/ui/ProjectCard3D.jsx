import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import SlidingMask from '../animations/SlidingMask';
import ProjectPlaceholder from './ProjectPlaceholder';

/**
 * ProjectCard3D Component - Horizontal Scrolling Carousel
 * Inspired by modern glassmorphism with theme colors
 */
const ProjectCard3D = ({ projects = [], autoRotate = true, rotationSpeed = 3500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (autoRotate && !selectedProject && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Reset to 0 when reaching the end for infinite loop
          return nextIndex >= projects.length ? 0 : nextIndex;
        });
      }, rotationSpeed);
      return () => clearInterval(interval);
    }
  }, [autoRotate, selectedProject, projects.length, rotationSpeed]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative w-full py-12">
        {/* Main Carousel Container */}
        <div className="relative overflow-hidden px-4">
          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] mr-6"
              >
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden border-2 border-primary-500/40 dark:border-primary-400/40 backdrop-blur-md shadow-2xl cursor-pointer group transition-colors duration-300 hover:border-primary-500 dark:hover:border-primary-400"
                  onClick={() => handleCardClick(project)}
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-secondary-500/30 to-primary-600/40 dark:from-primary-400/40 dark:via-secondary-400/40 dark:to-primary-500/50 pointer-events-none" />
                  
                  {/* Image */}
                  {project.image ? (
                    <SlidingMask 
                      direction="right" 
                      delay={index * 0.1}
                      duration={1.2}
                      className="w-full h-full overflow-hidden"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                    </SlidingMask>
                  ) : (
                    <div className="w-full h-full">
                      <ProjectPlaceholder 
                        variant={project.placeholderVariant || 'code'}
                        size="full"
                      />
                    </div>
                  )}

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/70 to-transparent dark:from-dark-bg/98 dark:via-dark-bg/75 pointer-events-none" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-3 text-white/80 mb-4">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Pills */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/40 dark:bg-primary-400/40 backdrop-blur-sm border border-primary-500/60 dark:border-primary-400/60 text-white shadow-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-lg">👁️</span>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-xl rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-dark-bg/90 backdrop-blur-sm hover:bg-primary-500/90 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-xl border-2 border-primary-500/50"
            aria-label="Previous"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-dark-bg/90 backdrop-blur-sm hover:bg-primary-500/90 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-xl border-2 border-primary-500/50"
            aria-label="Next"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-light-border dark:bg-dark-border hover:bg-primary-500/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 pointer-events-none"
        >
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary bg-light-card/50 dark:bg-dark-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-light-border/30 dark:border-dark-border/30 inline-block">
            ↔️ Use arrows to navigate • Click card to view details
          </p>
        </motion.div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary-500/10 via-secondary-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            style={{ marginTop: 0, paddingTop: '80px' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.8, opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-light-card dark:bg-dark-card rounded-2xl shadow-2xl border-2 border-primary-500/30 dark:border-primary-400/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-full bg-dark-bg/80 backdrop-blur-sm hover:bg-dark-bg flex items-center justify-center text-white transition-all hover:scale-110 shadow-lg"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Project Image */}
              <div className="relative h-64 sm:h-96 overflow-hidden rounded-t-2xl">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                
                {/* Fallback Placeholder */}
                {!selectedProject.image && (
                  <div className="w-full h-full">
                    <ProjectPlaceholder 
                      variant={selectedProject.placeholderVariant || 'code'}
                      size="full"
                    />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg"
                  >
                    {selectedProject.title}
                  </motion.h2>
                  {selectedProject.tags && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm font-medium rounded-full bg-primary-500/40 backdrop-blur-md border border-primary-500/60 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                    About This Project
                  </h3>
                  <p className="text-base leading-relaxed text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>

                  {/* Technologies */}
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-3 text-light-text dark:text-dark-text">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-lg bg-primary-500/10 dark:bg-primary-400/10 border border-primary-500/20 dark:border-primary-400/20 text-light-text dark:text-dark-text font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-light-border dark:border-dark-border">
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-glow transition-all hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        View Live Demo
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-medium hover:border-primary-500 dark:hover:border-primary-400 transition-all hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub className="w-4 h-4" />
                        View Source Code
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

ProjectCard3D.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fullDescription: PropTypes.string,
      image: PropTypes.string,
      placeholderVariant: PropTypes.oneOf(['code', 'web', 'mobile', 'design']),
      tags: PropTypes.arrayOf(PropTypes.string),
      technologies: PropTypes.arrayOf(PropTypes.string),
      liveUrl: PropTypes.string,
      githubUrl: PropTypes.string,
    })
  ),
  autoRotate: PropTypes.bool,
  rotationSpeed: PropTypes.number,
};

export default ProjectCard3D;
