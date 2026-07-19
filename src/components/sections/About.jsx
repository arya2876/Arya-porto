import { motion } from 'framer-motion';
import Card from '../ui/Card';
import SkillChips from '../ui/SkillChips';
import { skillGroups } from '../../data/personalInfo';
import SlideIn from '../animations/SlideIn';
import ScrollGradientText from '../ui/ScrollGradientText';
import SectionHeading from '../ui/SectionHeading';
import { navNum } from '../../data/navigation';
import StaggerText from '../animations/StaggerText';
import GlassmorphismSlide from '../animations/GlassmorphismSlide';

/**
 * About Section with journey, skills, and tech stack
 */
const About = () => {
  return (
    // Root <section id="about"> ada di App.jsx; komponen ini murni konten
    // dengan tinggi natural (tanpa h-screen/sticky).
    <div className="section-padding relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header - target timeline pin via data-reveal */}
        <div className="text-center mb-20">
          <div data-reveal="up" className="flex flex-col items-center">
            <SectionHeading num={navNum('about')} title="About" />
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
          </div>
          <div data-reveal="up">
            <p className="text-lg max-w-3xl mx-auto text-light-text-secondary dark:text-dark-text-secondary">
              A passionate digital creator combining creativity, strategic thinking,
              and technical excellence to bring visions into reality.
            </p>
          </div>
        </div>

        <div data-reveal="up" className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Journey & Bio */}
          <GlassmorphismSlide direction="left" delay={0.2}>
            <SlideIn direction="left">
              <Card className="h-full">
                <h3 className="text-2xl font-bold font-display mb-6 text-gradient">
                  My Journey
                </h3>
                <div className="space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                  <p>
                    Saya mahasiswa Sistem Informasi di UDINUS Semarang yang fokus pada
                    full-stack web development dan UI/UX. Saya belajar dengan cara
                    membangun produk nyata — dari sistem billing rental PlayStation
                    sampai platform rental antar-mahasiswa.
                  </p>
                  <p>
                    Berangkat dari Jepara, saya punya ketertarikan kuat pada transformasi
                    digital untuk UMKM daerah: membawa layanan web modern ke bisnis yang
                    belum tersentuh teknologi. Saya juga aktif sebagai Google Student
                    Ambassador di kampus.
                  </p>
                  <p>
                    Pendekatan saya sederhana: bangun bertahap dan iteratif, dengan
                    arsitektur yang benar sejak awal — supaya produk mudah tumbuh tanpa
                    harus ditulis ulang.
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
                {/* Chip per kategori, tanpa persentase (lebih jujur & terbaca) */}
                <SkillChips groups={skillGroups} />
              </Card>
            </SlideIn>
          </GlassmorphismSlide>
        </div>
      </div>
    </div>
  );
};

export default About;
