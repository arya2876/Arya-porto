import { useState } from 'react';
import { motion } from 'framer-motion';
import services from '../../data/services';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import FadeIn from '../animations/FadeIn';
import StaggerText from '../animations/StaggerText';
import ElasticBounce from '../animations/ElasticBounce';

/**
 * Services Section with flip cards and modal details
 */
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="section-padding bg-light-card dark:bg-dark-card">
      <div className="container-custom">
        {/* Section Header - Omio Style */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6">
              WHAT I OFFER
            </span>
          </motion.div>
          
          <div className="mb-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text inline-block">
              <StaggerText type="chars" delay={0} duration={0.08}>
                MODERN SERVICES{' '}
              </StaggerText>
              <span className="text-primary-500">
                <StaggerText type="chars" delay={0} duration={0.08}>
                  TO GROW
                </StaggerText>
              </span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              I&apos;m passionate about crafting experiences that merge innovation, aesthetics, 
              and functionality. Delivering solutions that drive results.
            </p>
          </motion.div>
        </div>

        {/* Services Grid - Omio Numbered Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ElasticBounce 
              key={service.id} 
              direction="up" 
              delay={index * 0.15}
              intensity={1.2}
              className="pulse"
            >
              <FadeIn delay={index * 0.1}>
                <motion.div
                  className="group h-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                <Card className="h-full relative overflow-hidden bg-light-bg dark:bg-dark-bg border-2 border-transparent hover:border-primary-500/20 transition-all duration-300">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative p-8">
                    {/* Number Badge - Large Omio Style */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {service.number}
                      </motion.div>
                      
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-display text-light-text dark:text-dark-text mb-4 tracking-wide uppercase">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Preview */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mt-2`}></span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-3 rounded-lg bg-light-card dark:bg-dark-card hover:bg-primary-500 hover:text-white border-2 border-light-border dark:border-dark-border hover:border-primary-500 transition-all duration-300 font-semibold text-sm group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                </Card>
              </motion.div>
            </FadeIn>
            </ElasticBounce>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Have a custom project in mind?
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get a Free Quote
            </Button>
          </motion.div>
        </FadeIn>
      </div>

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        size="lg"
      >
        {selectedService && (
          <div className="space-y-6">
            {/* Icon & Description */}
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center flex-shrink-0`}>
                <selectedService.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary flex-1">
                {selectedService.description}
              </p>
            </div>

            {/* All Features */}
            <div>
              <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                What's Included:
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {selectedService.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    <span className="text-primary-500 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Timeline */}
            <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/10">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Pricing
                </p>
                <p className="text-2xl font-bold text-gradient">
                  {selectedService.pricing}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Delivery Time
                </p>
                <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                  {selectedService.deliveryTime}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <Button
                variant="gradient"
                fullWidth
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedService(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Services;
