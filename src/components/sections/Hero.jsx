import { motion, useMotionValue, useSpring, useMotionTemplate, useTime, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef, useState } from 'react';
import {
  FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaDownload, FaArrowDown, FaCode,
  FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaLaravel, FaPhp, FaDatabase, FaGitAlt, FaFigma, FaBootstrap,
} from 'react-icons/fa';
import { APP_CONFIG } from '../../utils/constants';
import { scrollToId } from '../../utils/smoothScroll';
import { usePortfolioContext } from '../../context/PortfolioDataContext';
import { useSocialLinks } from '../../hooks/useSocialLinks';
import BackgroundText from '../ui/BackgroundText';

const SOCIAL_DEFS = [
  { key: 'instagram', icon: FaInstagram, label: 'Instagram', colors: 'from-pink-500 to-purple-600' },
  { key: 'tiktok',    icon: FaTiktok,    label: 'TikTok',    colors: 'from-black to-cyan-400' },
  { key: 'linkedin',  icon: FaLinkedin,  label: 'LinkedIn',  colors: 'from-blue-600 to-blue-400' },
  { key: 'github',    icon: FaGithub,    label: 'GitHub',    colors: 'from-gray-800 to-purple-600' },
];

// Tech icons that float in orbit around the portrait (replaces the old stat cards)
const ORBIT_RINGS = [
  {
    id: 'inner',
    duration: 26,
    dir: 1,
    radius: '[--r:110px] sm:[--r:160px] lg:[--r:240px]',
    icons: [
      { Icon: FaReact, color: '#61DAFB', label: 'React' },
      { Icon: FaJs, color: '#F7DF1E', label: 'JavaScript' },
      { Icon: FaNodeJs, color: '#83CD29', label: 'Node.js' },
      { Icon: FaHtml5, color: '#E34F26', label: 'HTML5' },
      { Icon: FaCss3Alt, color: '#1572B6', label: 'CSS3' },
    ],
  },
  {
    id: 'outer',
    duration: 40,
    dir: -1,
    radius: '[--r:175px] sm:[--r:245px] lg:[--r:350px]',
    icons: [
      { Icon: FaLaravel, color: '#FF2D20', label: 'Laravel' },
      { Icon: FaPhp, color: '#8892BF', label: 'PHP' },
      { Icon: FaDatabase, color: '#38BDF8', label: 'Database' },
      { Icon: FaGitAlt, color: '#F05032', label: 'Git' },
      { Icon: FaFigma, color: '#F24E1E', label: 'Figma' },
      { Icon: FaBootstrap, color: '#7952B3', label: 'Bootstrap' },
    ],
  },
];

/** A single ring of tech icons orbiting the portrait; icons stay upright via counter-rotation. */
const OrbitRing = ({ duration, dir, radius, icons }) => (
  <motion.div
    className={`absolute inset-0 ${radius}`}
    animate={{ rotate: dir * 360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {icons.map((item, i) => {
      const angle = (360 / icons.length) * i;
      return (
        <div
          key={item.label}
          className="absolute left-1/2 top-1/2"
          style={{ transform: `rotate(${angle}deg) translateX(var(--r)) rotate(${-angle}deg)` }}
        >
          {/* counter-rotate so the chip never spins */}
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: dir * -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            {/* subtle floating bob */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
              className="grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/10 dark:bg-white/[0.06] border border-white/25 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
              title={item.label}
            >
              <item.Icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: item.color }} />
            </motion.div>
          </motion.div>
        </div>
      );
    })}
  </motion.div>
);

/**
 * Hero Section - landonorris.com style
 * Full-viewport portrait with a cursor-following circular reveal
 * that swaps the photo to the helmet version, plus a custom cursor.
 */
const Hero = () => {
  const { personalInfo } = usePortfolioContext();
  const socialLinks = useSocialLinks();
  const SOCIALS = SOCIAL_DEFS
    .map(s => ({ ...s, href: socialLinks[s.key] || '#' }))
    .filter(s => s.href !== '#');
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [overImage, setOverImage] = useState(false);
  const [helmetLocked, setHelmetLocked] = useState(false);

  // Helmet reveal spotlight (coordinates relative to the image box)
  const revealRawX = useMotionValue(0);
  const revealRawY = useMotionValue(0);
  const revealRawR = useMotionValue(0);
  const revealX = useSpring(revealRawX, { stiffness: 220, damping: 25 });
  const revealY = useSpring(revealRawY, { stiffness: 220, damping: 25 });
  const revealR = useSpring(revealRawR, { stiffness: 160, damping: 22 });
  // Oval reveal that keeps morphing subtly (but always stays close to an oval).
  const time = useTime();
  const morph = useTransform(time, (t) => Math.sin(t / 640));
  const morphB = useTransform(time, (t) => Math.sin(t / 900 + 1.2));
  const revealRX = useTransform([revealR, morph], ([r, m]) => r * (1.26 + m * 0.16));
  const revealRY = useTransform([revealR, morphB], ([r, m]) => r * (0.88 - m * 0.14));
  const clipPath = useMotionTemplate`ellipse(${revealRX}px ${revealRY}px at ${revealX}px ${revealY}px)`;

  // 3D tilt of the portrait, follows the cursor across the whole section
  const tiltRawX = useMotionValue(0);
  const tiltRawY = useMotionValue(0);
  const tiltX = useSpring(tiltRawX, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(tiltRawY, { stiffness: 120, damping: 18 });

  const clamp = (v) => Math.max(-1, Math.min(1, v));

  const handleMouseMove = (e) => {
    const imgRect = imageRef.current?.getBoundingClientRect();
    if (imgRect) {
      revealRawX.set(e.clientX - imgRect.left);
      revealRawY.set(e.clientY - imgRect.top);
      const nx = (e.clientX - (imgRect.left + imgRect.width / 2)) / (imgRect.width / 2);
      const ny = (e.clientY - (imgRect.top + imgRect.height / 2)) / (imgRect.height / 2);
      tiltRawY.set(clamp(nx) * 10);
      tiltRawX.set(clamp(-ny) * 6);
    }
  };

  const handleSectionLeave = () => {
    tiltRawX.set(0);
    tiltRawY.set(0);
  };

  const handleImageEnter = () => {
    setOverImage(true);
    if (!helmetLocked) revealRawR.set(150);
  };

  const handleImageLeave = () => {
    setOverImage(false);
    if (!helmetLocked) revealRawR.set(0);
  };

  // Click/tap toggles the full helmet (also makes the effect usable on touch)
  const toggleHelmet = (e) => {
    const imgRect = imageRef.current?.getBoundingClientRect();
    if (imgRect) {
      revealRawX.set(e.clientX - imgRect.left);
      revealRawY.set(e.clientY - imgRect.top);
    }
    if (helmetLocked) {
      revealRawR.set(overImage ? 150 : 0);
      setHelmetLocked(false);
    } else {
      revealRawR.set(1500);
      setHelmetLocked(true);
    }
  };

  const scrollToAbout = () => {
    scrollToId('about');
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleSectionLeave}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ===== Full-viewport stage ===== */}
      <div className="relative h-screen">
        {/* Huge decorative text behind the portrait */}
        <BackgroundText text="ARYA WINATA" size="xl" animate={true} />

        {/* Name - top left (Lando Norris logo style) */}
        <motion.div
          className="absolute top-24 left-6 lg:top-28 lg:left-12 z-20"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-display leading-[0.9] tracking-tight text-4xl sm:text-5xl lg:text-7xl text-light-text dark:text-dark-text">
            <span className="block font-light">ARYA</span>
            <span className="block font-black">WINATA</span>
          </h1>
          <div className="mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-light-text-secondary dark:text-dark-text-secondary">
            <TypeAnimation
              sequence={[
                'Full Stack Developer', 2500,
                'UI/UX Designer', 2500,
                'Problem Solver', 2500,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
            />
          </div>
        </motion.div>

        {/* CTA - top right (STORE button style) */}
        <motion.div
          className="absolute top-24 right-6 lg:top-28 lg:right-12 z-20 flex items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.button
            onClick={() => scrollToId('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block px-5 py-3 rounded-2xl border-2 border-light-text/20 dark:border-white/20 font-bold text-sm text-light-text dark:text-dark-text backdrop-blur"
          >
            CONTACT
          </motion.button>
          <motion.a
            href={APP_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-lime-400 text-black font-bold text-sm shadow-lg shadow-lime-400/30"
          >
            <FaDownload className="w-4 h-4" />
            <span className="hidden sm:inline">DOWNLOAD CV</span>
            <span className="sm:hidden">CV</span>
          </motion.a>
        </motion.div>

        {/* Portrait (transparent cutout) with 3D tilt + cursor-spotlight helmet reveal */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div
            ref={imageRef}
            onMouseEnter={handleImageEnter}
            onMouseLeave={handleImageLeave}
            onClick={toggleHelmet}
            className="relative h-[64vh] sm:h-[74vh] lg:h-[90vh] aspect-[1284/2046]"
          >
            <motion.div
              className="absolute inset-0"
              style={{ rotateX: tiltX, rotateY: tiltY, transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
              animate={{ scale: overImage ? 1.03 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Base: no helmet */}
              <img
                src="/images/hero-normal-cut.webp"
                alt={personalInfo?.name || 'Arya Winata'}
                className="absolute inset-0 w-full h-full object-contain [filter:drop-shadow(0_30px_45px_rgba(0,0,0,0.30))]"
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  if (personalInfo?.profileImageFallback) e.target.src = personalInfo.profileImageFallback;
                }}
              />
              {/* Overlay: helmet, revealed inside the cursor spotlight */}
              <motion.img
                src="/images/hero-helmet-cut.webp"
                alt=""
                aria-hidden="true"
                style={{ clipPath }}
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Floating tech icons orbiting the portrait */}
        <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-[15] hidden sm:block">
          {ORBIT_RINGS.map((ring) => (
            <OrbitRing key={ring.id} {...ring} />
          ))}
        </div>

        {/* Info card - bottom left (NEXT RACE card style) */}
        <motion.div
          className="absolute left-6 lg:left-12 bottom-10 z-20 hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-[11px] font-bold tracking-[0.25em] mb-2 text-light-text-secondary dark:text-dark-text-secondary">
            OPEN TO WORK
          </p>
          <div className="w-40 rounded-2xl border border-light-text/15 dark:border-white/15 bg-white/60 dark:bg-dark-card/60 backdrop-blur p-4 text-center">
            <FaCode className="mx-auto w-7 h-7 mb-2 text-primary-500" />
            <div className="text-sm font-bold tracking-wide text-light-text dark:text-dark-text">FULL STACK</div>
            <div className="my-3 h-px bg-light-text/10 dark:bg-white/10" />
            <div className="text-[11px] leading-relaxed tracking-wider text-light-text-secondary dark:text-dark-text-secondary">
              INFORMATION SYSTEMS
              <br />
              UDINUS SEMARANG
            </div>
          </div>
        </motion.div>

        {/* Social links - bottom right, vertical */}
        <div className="absolute right-6 lg:right-12 bottom-10 z-20 hidden md:flex flex-col gap-3">
          {SOCIALS.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="relative p-3 rounded-full border-2 border-light-text/20 dark:border-white/20 text-light-text-secondary dark:text-dark-text-secondary hover:border-transparent transition-all duration-300 group overflow-hidden backdrop-blur"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`absolute inset-0 bg-gradient-to-br ${social.colors} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />
              <social.icon className="w-4 h-4 relative z-10 group-hover:text-white transition-all" />
            </motion.a>
          ))}
        </div>

        {/* Social links - mobile, horizontal */}
        <div className="absolute bottom-5 inset-x-0 z-20 flex md:hidden justify-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 rounded-full bg-white/70 dark:bg-dark-card/70 backdrop-blur text-light-text dark:text-dark-text shadow-lg"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToAbout}
        >
          <FaArrowDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
