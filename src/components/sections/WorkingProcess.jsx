import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { workingProcess } from '../../data/workingProcess';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';
import ScrollGradientText from '../ui/ScrollGradientText';

/**
 * Working Process Section - Omio Inspired
 * Shows the step-by-step workflow
 */
const WorkingProcess = () => {
  return (
    <section id="process" className="section-padding bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6">
              HOW WE WORK
            </span>
            <div className="mb-6">
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text"
                scrollColor="#F59E0B"
              >
                OUR WORKING
              </ScrollGradientText>
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display ml-4 text-light-text dark:text-dark-text"
                scrollColor="#3B82F6"
              >
                PROCESS
              </ScrollGradientText>
            </div>
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              A structured approach to delivering exceptional results. From initial discovery 
              to final launch, every step is crafted for success.
            </p>
          </motion.div>
        </FadeIn>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {workingProcess.map((step, index) => (
            <FadeIn key={step.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="relative h-full overflow-hidden group">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative p-8">
                    {/* Number Badge - Omio Style */}
                    <div className="flex items-start gap-6 mb-6">
                      <motion.div
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {step.number}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold font-display text-light-text dark:text-dark-text mb-4 tracking-wide">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {step.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 text-light-text-secondary dark:text-dark-text-secondary"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                        >
                          <FaCheckCircle className={`flex-shrink-0 w-5 h-5 mt-0.5 text-gradient`} />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Connecting Line (for desktop) */}
                    {index < workingProcess.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent" />
                    )}
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.6} className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Ready to start your project with a proven process?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              Let's Work Together
            </motion.button>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default WorkingProcess;
