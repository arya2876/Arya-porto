import { motion, useMotionValue, useSpring, useMotionTemplate, useTime, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef, useState } from 'react';
import {
  FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaDownload, FaArrowDown, FaCode,
} from 'react-icons/fa';
import {
  SiMongodb, SiSupabase, SiAmazonaws, SiGoogle, SiOpenai, SiNextdotjs, SiDocker, SiPython,
} from 'react-icons/si';
import { APP_CONFIG } from '../../utils/constants';
import { scrollToId } from '../../utils/smoothScroll';
import { usePortfolioContext } from '../../context/PortfolioDataContext';
import { useSocialLinks } from '../../hooks/useSocialLinks';
import { useLoading } from '../../context/LoadingContext';
import BackgroundText from '../ui/BackgroundText';
import CatPawButton from '../ui/CatPawButton';

/* Modern AI & Dev Tool Custom SVGs */
const ClaudeIcon = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
  </svg>
);

const GeminiIcon = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93-2.19-.96-3.81-2.58t-2.55-3.81Q12 2.49 12 0q0 2.49-.93 4.68-.96 2.19-2.58 3.81T4.68 11.04Q2.49 12 0 12q2.49 0 4.68.93 2.19.96 3.81 2.58t2.55 3.81Z" />
  </svg>
);

const CursorIcon = ({ className, style }) => (
  <svg viewBox="0 0 468 515" fill="currentColor" className={className} style={style}>
    <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
  </svg>
);

const AntigravityIcon = ({ className, style }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" stroke="currentColor" strokeWidth="1.6" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 2v2M12 20v2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SOCIAL_DEFS = [
  { key: 'instagram', icon: FaInstagram, label: 'Instagram', colors: 'from-pink-500 to-purple-600' },
  { key: 'tiktok', icon: FaTiktok, label: 'TikTok', colors: 'from-black to-cyan-400' },
  { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', colors: 'from-blue-600 to-blue-400' },
  { key: 'github', icon: FaGithub, label: 'GitHub', colors: 'from-gray-800 to-purple-600' },
];

// Tech icons that float in orbit around the portrait (Modern coder vibe, viral AI & cloud tools)
const ORBIT_RINGS = [
  {
    id: 'inner',
    duration: 26,
    dir: 1,
    radius: '[--r:110px] sm:[--r:160px] lg:[--r:240px]',
    icons: [
      { Icon: CursorIcon, color: '#38BDF8', label: 'Cursor AI' },
      { Icon: ClaudeIcon, color: '#D97757', label: 'Claude AI' },
      { Icon: SiOpenai, color: '#10A37F', label: 'ChatGPT' },
      { Icon: GeminiIcon, color: '#4E75FF', label: 'Google Gemini' },
      { Icon: AntigravityIcon, color: '#C084FC', label: 'Antigravity' },
      { Icon: SiNextdotjs, color: '#FFFFFF', label: 'Next.js' },
    ],
  },
  {
    id: 'outer',
    duration: 40,
    dir: -1,
    radius: '[--r:175px] sm:[--r:245px] lg:[--r:350px]',
    icons: [
      { Icon: SiMongodb, color: '#47A248', label: 'MongoDB' },
      { Icon: SiSupabase, color: '#3ECF8E', label: 'Supabase' },
      { Icon: SiAmazonaws, color: '#FF9900', label: 'AWS' },
      { Icon: SiGoogle, color: '#4285F4', label: 'Google Cloud' },
      { Icon: SiDocker, color: '#2496ED', label: 'Docker' },
      { Icon: SiPython, color: '#3776AB', label: 'Python' },
    ],
  },
];

/** A single ring of tech icons orbiting the portrait; icons stay upright via counter-rotation. */
const OrbitRing = ({ duration, dir, radius, icons, isLoaded, ringIndex = 0 }) => (
  <motion.div
    className={`absolute inset-0 ${radius}`}
    animate={isLoaded ? { rotate: dir * 360 } : {}}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {icons.map((item, i) => {
      const angle = (360 / icons.length) * i;
      // Stagger rhythm: inner ring gathers & blooms first, outer ring follows
      const delay = ringIndex * 0.16 + i * 0.045;
      return (
        <div
          key={item.label}
          className={`absolute left-1/2 top-1/2 ${
            isLoaded ? 'animate-orbit-gather-spread' : 'opacity-0'
          }`}
          style={{
            '--angle': `${angle}deg`,
            animationDelay: `${delay}s`,
            transform: isLoaded
              ? undefined
              : `rotate(${angle}deg) translateX(0px) rotate(${-angle}deg) scale(0)`,
          }}
        >
          {/* counter-rotate so the chip never spins */}
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: dir * -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            {/* subtle floating bob once settled */}
            <motion.div
              animate={isLoaded ? { y: [0, -7, 0] } : {}}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.8 + delay,
              }}
              className="grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white/10 dark:bg-white/[0.06] border border-white/25 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:scale-110 transition-transform cursor-pointer group"
              title={item.label}
            >
              <item.Icon
                className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:scale-110"
                style={{ color: item.color }}
              />
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
  const { isLoaded } = useLoading();
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
        <motion.div
          initial={{ opacity: 0, scale: 1.12 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.12 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <BackgroundText text="ARYA WINATA" size="xl" animate={true} />
        </motion.div>

        {/* Name - top left (Lando Norris logo style) */}
        <motion.div
          className="absolute top-24 left-6 lg:top-28 lg:left-12 z-20"
          initial={{ opacity: 0, x: -60, filter: 'blur(8px)' }}
          animate={isLoaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -60, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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
          initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
          animate={isLoaded ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: 60, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
        >
          <CatPawButton
            onClick={() => scrollToId('contact')}
            className="hidden sm:inline-flex min-w-[136px] px-6 py-3 rounded-2xl bg-slate-900/80 dark:bg-dark-card/90 border-2 border-slate-700/60 dark:border-white/25 text-light-text dark:text-dark-text font-bold text-sm tracking-wide backdrop-blur-md hover:border-lime-400 hover:text-white dark:hover:text-white hover:shadow-lg hover:shadow-lime-400/20 active:scale-95 transition-all duration-300"
          >
            CONTACT
          </CatPawButton>
          <motion.a
            href={personalInfo?.cv_url || '#'}
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
          initial={{ opacity: 0, y: 120, scale: 0.92 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 120, scale: 0.92 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
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
          {ORBIT_RINGS.map((ring, idx) => (
            <OrbitRing key={ring.id} {...ring} isLoaded={isLoaded} ringIndex={idx} />
          ))}
        </div>

        {/* Info card - bottom left (NEXT RACE card style) */}
        <motion.div
          className="absolute left-6 lg:left-12 bottom-10 z-20 hidden md:block"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
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
              initial={{ opacity: 0, x: 30, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 30, scale: 0.8 }}
              transition={{ delay: 0.4 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
