import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward, FaChevronDown } from 'react-icons/fa';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import BackgroundText from '../ui/BackgroundText';
import ScrollGradientText from '../ui/ScrollGradientText';
import { experienceTimeline } from '../../data/experience';

/**
 * Experience Section with interactive timeline
 */
const Experience = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Map icon based on type
  const getIconComponent = (type) => {
    switch (type) {
      case 'education':
        return FaGraduationCap;
      case 'work':
        return FaBriefcase;
      case 'certification':
        return FaAward;
      default:
        return FaBriefcase;
    }
  };

  // Transform experienceTimeline data to match component format
  const experiences = experienceTimeline.map(exp => ({
    ...exp,
    icon: getIconComponent(exp.type),
    company: exp.title,
    period: exp.year,
    location: '', // Optional, can be added to data file if needed
  }));

  const getIconColor = (type) => {
    switch (type) {
      case 'work':
        return 'text-primary-500';
      case 'education':
        return 'text-secondary-500';
      case 'certification':
        return 'text-accent-start';
      default:
        return 'text-gray-500';
    }
  };

  const getGlowColor = (type, isCurrent) => {
    if (isCurrent) return 'shadow-glow-primary';
    switch (type) {
      case 'work':
        return 'shadow-lg';
      case 'education':
        return 'shadow-lg';
      case 'certification':
        return 'shadow-lg';
      default:
        return 'shadow-lg';
    }
  };

  return (
    <section id="experience" className="section-padding bg-light-card dark:bg-dark-card">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <ScrollGradientText 
            as="h2"
            className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4 text-light-text dark:text-dark-text"
            scrollColor="#06B6D4"
          >
            EXPERIENCE & EDUCATION
          </ScrollGradientText>
          <p className="section-subtitle">
            My professional journey and academic background
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <FadeIn key={exp.id} delay={index * 0.1}>
              <div className="relative pl-8 md:pl-32 pb-12 last:pb-0">
                {/* Timeline Line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-4 md:left-16 top-12 bottom-0 w-0.5 bg-light-border dark:bg-dark-border" />
                )}

                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-12 top-0 w-8 h-8 rounded-full border-4 border-light-card dark:border-dark-card flex items-center justify-center ${
                  exp.isCurrent ? 'bg-primary-500 shadow-glow-primary' : 'bg-light-bg dark:bg-dark-bg'
                }`}>
                  <exp.icon className={`w-4 h-4 ${getIconColor(exp.type)}`} />
                </div>

                {/* Content Card */}
                <Card
                  className={`${getGlowColor(exp.type, exp.isCurrent)} transition-all duration-300 ${
                    expandedItem === exp.id ? 'shadow-2xl' : ''
                  }`}
                  hover={true}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                          {exp.company}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-500 text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {exp.period}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => setExpandedItem(expandedItem === exp.id ? null : exp.id)}
                      className="p-2 hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        animate={{ rotate: expandedItem === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      </motion.div>
                    </motion.button>
                  </div>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    {exp.description}
                  </p>

                  <AnimatePresence>
                    {expandedItem === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-light-border dark:border-dark-border">
                          <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2 mb-4">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-light-text-secondary dark:text-dark-text-secondary"
                              >
                                <span className="text-primary-500 mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Large Background Text - Omio Style */}
      <BackgroundText text="EXPERIENCE" size="md" animate={true} />
    </section>
  );
};

export default Experience;
