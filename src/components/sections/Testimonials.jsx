import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import testimonials from '../../data/testimonials';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import BackgroundText from '../ui/BackgroundText';
import ScrollGradientText from '../ui/ScrollGradientText';
import StaggerText from '../animations/StaggerText';
import ElasticBounce from '../animations/ElasticBounce';

/**
 * Testimonials Section with carousel
 */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="section-padding bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <ScrollGradientText 
            as="h2"
            className="text-4xl sm:text-5xl lg:text-6xl font-display mb-4 text-light-text dark:text-dark-text"
            scrollColor="#EC4899"
          >
            <StaggerText type="chars" delay={0.2} duration={0.05}>
              TESTIMONIALS
            </StaggerText>
          </ScrollGradientText>
          <p className="section-subtitle">
            What clients say about working with me
          </p>
        </FadeIn>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentTestimonials.map((testimonial, index) => (
                <ElasticBounce 
                  key={testimonial.id}
                  direction="up"
                  delay={index * 0.1}
                  intensity={1.3}
                  className="floating"
                >
                  <Card
                    className="relative h-full"
                    hover
                  >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-primary-500/20">
                    <FaQuoteLeft className="w-12 h-12" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Project Tag */}
                  {testimonial.project && (
                    <p className="text-sm text-primary-500 mb-4">
                      Project: {testimonial.project}
                    </p>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-light-border dark:border-dark-border">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-light-text dark:text-dark-text">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
                </ElasticBounce>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 rounded-full bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl transition-all hover:scale-110"
                aria-label="Previous testimonials"
              >
                <FaChevronLeft className="w-5 h-5 text-light-text dark:text-dark-text" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 rounded-full bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl transition-all hover:scale-110"
                aria-label="Next testimonials"
              >
                <FaChevronRight className="w-5 h-5 text-light-text dark:text-dark-text" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-light-border dark:bg-dark-border w-2 hover:bg-primary-500/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Total Testimonials Count */}
        <div className="text-center mt-8">
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Showing {currentIndex * itemsPerPage + 1} - {Math.min((currentIndex + 1) * itemsPerPage, testimonials.length)} of {testimonials.length} testimonials
          </p>
        </div>
      </div>

      {/* Large Background Text - Omio Style */}
      <BackgroundText text="TESTIMONIALS" size="md" animate={true} />
    </section>
  );
};

export default Testimonials;
