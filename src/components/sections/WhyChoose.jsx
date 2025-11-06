import { motion } from 'framer-motion';
import { FaCheckCircle, FaLightbulb, FaRocket, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ScrollGradientText from '../ui/ScrollGradientText';

/**
 * Why Choose Me Section - Omio Inspired
 * Showcases unique value propositions
 */
const WhyChoose = () => {
  const reasons = [
    {
      icon: FaLightbulb,
      title: 'Creative Solutions',
      description: 'Innovative approaches to solve complex problems with elegant designs.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaRocket,
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising on quality or attention to detail.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaUsers,
      title: 'Client-Focused',
      description: 'Your satisfaction is my priority. I work closely with you every step of the way.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaClock,
      title: 'Always Available',
      description: 'Responsive communication and ongoing support even after project completion.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaAward,
      title: 'Quality Assurance',
      description: 'Rigorous testing and optimization to ensure flawless performance.',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: FaCheckCircle,
      title: 'Modern Tech Stack',
      description: 'Using cutting-edge technologies to build scalable, future-proof solutions.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { value: '100%', label: 'Client Satisfaction', color: 'from-green-500 to-emerald-500' },
    { value: '3+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
    { value: '15+', label: 'Projects Completed', color: 'from-purple-500 to-pink-500' },
    { value: '50+', label: 'Happy Clients', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section id="why-choose" className="section-padding bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6">
              WHY WORK WITH ME
            </span>
            <div className="mb-6">
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display text-light-text dark:text-dark-text"
                scrollColor="#06B6D4"
              >
                WHY CHOOSE
              </ScrollGradientText>
              <ScrollGradientText 
                as="span"
                className="text-4xl sm:text-5xl lg:text-6xl font-display ml-4 text-light-text dark:text-dark-text"
                scrollColor="#8B5CF6"
              >
                ARYA WINATA
              </ScrollGradientText>
            </div>
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              I bring a unique blend of creativity, strategic insight, and technical 
              expertise to deliver solutions that are not only visually compelling but also drive results.
            </p>
          </motion.div>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="text-center relative overflow-hidden group">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative p-6">
                    <div className={`text-4xl md:text-5xl font-bold font-display mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium">
                      {stat.label}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="h-full relative overflow-hidden group">
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${reason.color}`} />
                  
                  <div className="p-6 pl-8">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <reason.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-display text-light-text dark:text-dark-text mb-3">
                      {reason.title}
                    </h3>

                    {/* Description */}
                    <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Corner Glow */}
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-display mb-4 text-light-text dark:text-dark-text">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative solutions and exceptional results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default WhyChoose;
