import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { usePortfolioContext } from '../../context/PortfolioDataContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ScrollReveal from '../ui/ScrollReveal';
import ScrollRevealGroup from '../ui/ScrollRevealGroup';
import BackgroundText from '../ui/BackgroundText';
import ScrollGradientText from '../ui/ScrollGradientText';
import SectionHeading from '../ui/SectionHeading';
import { navNum } from '../../data/navigation';
import ProjectCard3D from '../ui/ProjectCard3D';
import StaggerText from '../animations/StaggerText';
import ProjectPlaceholder from '../ui/ProjectPlaceholder';

/**
 * Portfolio Section with filter and modal details
 */
const Portfolio = () => {
  const { projects, portfolioCategories: PORTFOLIO_CATEGORIES } = usePortfolioContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    // Root <section id="portfolio"> ada di App.jsx; tinggi natural.
    // Aksen konten pakai ScrollReveal (toggleActions sekali jalan, BUKAN scrub).
    <div className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - fade-up sekali saat masuk viewport */}
        <ScrollReveal className="text-center mb-20">
          <div>
            <SectionHeading num={navNum('portfolio')} title="Portfolio" />
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6">
              MY WORKS
            </span>
            <div className="mb-6">
              <ScrollGradientText
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text"
                scrollColor="#3B82F6"
              >
                <StaggerText type="chars" delay={0.2} duration={0.04}>
                  LET&apos;S EXPLORE
                </StaggerText>
              </ScrollGradientText>
              <ScrollGradientText
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display mx-4 text-light-text dark:text-dark-text"
                scrollColor="#EC4899"
              >
                <StaggerText type="chars" delay={0.9} duration={0.04}>
                  FEATURED
                </StaggerText>
              </ScrollGradientText>
              <ScrollGradientText
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text"
                scrollColor="#10B981"
              >
                <StaggerText type="chars" delay={1.4} duration={0.04}>
                  PROJECTS
                </StaggerText>
              </ScrollGradientText>
            </div>
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              Featured projects showcase the breadth and depth of expertise, highlighting
              innovative solutions and creative strategies brought to every endeavor.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Buttons - stagger berurutan, 1 trigger untuk semua tombol */}
        <ScrollRevealGroup stagger={0.08} className="flex flex-wrap justify-center gap-4 mb-12">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentImageIndex(0);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-primary-500/10'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </ScrollRevealGroup>

        {/* 3D Project Showcase Carousel - fade-up ringan */}
        <ScrollReveal delay={0.1} className="mb-20">
          {/* Heading ganda dihapus: cukup header section di atas + filter,
              langsung ke kartu proyek */}
          <div className="relative">
            <ProjectCard3D
              projects={filteredProjects.map(project => ({
                title: project.title,
                description: project.description,
                fullDescription: project.fullDescription,
                image: project.image,
                hoverImage: project.hoverImage || null,
                accentColor: project.accentColor || null,
                placeholderVariant: project.placeholderVariant || 'code',
                tags: project.tags,
                technologies: project.technologies,
                liveUrl: project.liveUrl,
                githubUrl: project.githubUrl,
                year: project.year,
                client: project.client,
                duration: project.duration,
                category: project.category,
              }))}
              autoRotate={false}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        size="xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Image Carousel */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="relative h-96 rounded-xl overflow-hidden bg-light-bg dark:bg-dark-bg">
                {selectedProject.images[currentImageIndex] ? (
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}

                {/* Placeholder jika image tidak tersedia */}
                <div className={selectedProject.images[currentImageIndex] ? 'hidden' : 'block h-full'}>
                  <ProjectPlaceholder
                    variant={selectedProject.placeholderVariant || 'code'}
                    size="full"
                  />
                </div>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <FaChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <FaChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50'
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Project Info */}
            <div>
              <h3 className="text-3xl font-bold font-display text-gradient mb-2">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                {selectedProject.client && <span>Client: {selectedProject.client}</span>}
                {selectedProject.year && <span>Year: {selectedProject.year}</span>}
                {selectedProject.duration && <span>Duration: {selectedProject.duration}</span>}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                About the Project
              </h4>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {selectedProject.liveUrl && (
                <Button
                  variant="gradient"
                  icon={FaExternalLinkAlt}
                  onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                >
                  View Live Site
                </Button>
              )}
              {selectedProject.githubUrl && (
                <Button
                  variant="outline"
                  icon={FaGithub}
                  onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                >
                  View Code
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Large Background Text - Omio Style */}
      <BackgroundText text="PORTFOLIO" size="lg" animate={true} />
    </div>
  );
};

export default Portfolio;
