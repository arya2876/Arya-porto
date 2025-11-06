import { motion } from 'framer-motion';
import { SKILLS } from '../../utils/constants';
import Card from '../ui/Card';
import FadeIn from '../animations/FadeIn';
import SlideIn from '../animations/SlideIn';
import ScrollGradientText from '../ui/ScrollGradientText';
import StaggerText from '../animations/StaggerText';
import GlassmorphismSlide from '../animations/GlassmorphismSlide';

/**
 * About Section with journey, skills, and tech stack
 */
const About = () => {
  return (
    <section id="about" className="section-padding bg-light-card dark:bg-dark-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Section Header - Omio Style */}
        <FadeIn className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.span 
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-sm font-medium text-primary-500 dark:text-primary-400 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              GET TO KNOW ME
            </motion.span>
            <ScrollGradientText 
              as="h2"
              className="text-4xl sm:text-5xl lg:text-6xl font-display mb-6 text-light-text dark:text-dark-text"
              scrollColor="#8B5CF6"
            >
              <StaggerText type="chars" delay={0.2} duration={0.05}>
                HELLO PEOPLE&apos;S
              </StaggerText>
            </ScrollGradientText>
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              A passionate digital creator combining creativity, strategic thinking, 
              and technical excellence to bring visions into reality.
            </p>
          </motion.div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Journey & Bio */}
          <GlassmorphismSlide direction="left" delay={0.2}>
            <SlideIn direction="left">
              <Card className="h-full">
                <h3 className="text-2xl font-bold font-display mb-6 text-gradient">
                  My Journey
                </h3>
              <div className="space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                <p>
                  With over 5 years of experience in web development, I&apos;ve had the 
                  privilege of working on diverse projects ranging from small business 
                  websites to large-scale enterprise applications.
                </p>
                <p>
                  My passion for clean code, user-centered design, and cutting-edge 
                  technologies drives me to create exceptional digital experiences that 
                  not only look great but also perform flawlessly.
                </p>
                <p>
                  I specialize in the MERN stack and have extensive experience with 
                  modern frontend frameworks, particularly React and Next.js. I&apos;m also 
                  proficient in UI/UX design, ensuring that every project I work on 
                  delivers both beauty and functionality.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or sharing my knowledge through 
                  technical writing and mentoring.
                </p>
              </div>
            </Card>
          </SlideIn>
          </GlassmorphismSlide>

          {/* Skills */}
          <GlassmorphismSlide direction="right" delay={0.4}>
          <SlideIn direction="right">
            <Card className="h-full">
              <h3 className="text-2xl font-bold font-display mb-6 text-gradient">
                Skills & Expertise
              </h3>
              <div className="space-y-4">
                {SKILLS.slice(0, 8).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-light-text dark:text-dark-text">
                        {skill.name}
                      </span>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </SlideIn>
          </GlassmorphismSlide>
        </div>
      </div>
    </section>
  );
};

export default About;
