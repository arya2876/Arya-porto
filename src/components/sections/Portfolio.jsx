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

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
                featured: project.featured,
              }))}
              autoRotate={false}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Large Background Text - Omio Style */}
      <BackgroundText text="PORTFOLIO" size="lg" animate={true} />
    </div>
  );
};

export default Portfolio;
