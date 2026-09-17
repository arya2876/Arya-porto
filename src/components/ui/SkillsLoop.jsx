import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVuedotjs,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiPython,
  SiAmazonaws,
  SiGit,
  SiOpenai,
  SiFigma,
} from 'react-icons/si';

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

// Helper to create a stylish badge node
const createSkillBadge = (Icon, title, color, href) => ({
  title,
  href,
  node: (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-light-border dark:border-white/10 shadow-sm backdrop-blur-md hover:border-primary-500/50 hover:bg-white/95 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer select-none">
      <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" style={{ color }} />
      <span className="text-xs font-semibold tracking-wide text-light-text dark:text-dark-text whitespace-nowrap">
        {title}
      </span>
    </div>
  ),
});

// Row 1: Frontend & UI Engineering
const frontendLogos = [
  createSkillBadge(SiReact, 'React', '#61DAFB', 'https://react.dev'),
  createSkillBadge(SiNextdotjs, 'Next.js', '#E2E8F0', 'https://nextjs.org'),
  createSkillBadge(SiTypescript, 'TypeScript', '#3178C6', 'https://www.typescriptlang.org'),
  createSkillBadge(SiJavascript, 'JavaScript', '#F7DF1E', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
  createSkillBadge(SiTailwindcss, 'Tailwind CSS', '#06B6D4', 'https://tailwindcss.com'),
  createSkillBadge(SiVuedotjs, 'Vue.js', '#4FC08D', 'https://vuejs.org'),
  createSkillBadge(SiHtml5, 'HTML5', '#E34F26', 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'),
  createSkillBadge(SiCss3, 'CSS3', '#1572B6', 'https://developer.mozilla.org/en-US/docs/Web/CSS'),
];

// Row 2: Backend, Cloud & Database
const backendLogos = [
  createSkillBadge(SiNodedotjs, 'Node.js', '#5FA04E', 'https://nodejs.org'),
  createSkillBadge(SiMongodb, 'MongoDB', '#47A248', 'https://www.mongodb.com'),
  createSkillBadge(SiSupabase, 'Supabase', '#3ECF8E', 'https://supabase.com'),
  createSkillBadge(SiPostgresql, 'PostgreSQL', '#4169E1', 'https://www.postgresql.org'),
  createSkillBadge(SiDocker, 'Docker', '#2496ED', 'https://www.docker.com'),
  createSkillBadge(SiPython, 'Python', '#3776AB', 'https://www.python.org'),
  createSkillBadge(SiAmazonaws, 'AWS', '#FF9900', 'https://aws.amazon.com'),
  createSkillBadge(SiGit, 'Git', '#F05032', 'https://git-scm.com'),
];

// Row 3: Modern AI & Engineering Tools
const modernAiTools = [
  createSkillBadge(CursorIcon, 'Cursor AI', '#38BDF8', 'https://cursor.com'),
  createSkillBadge(ClaudeIcon, 'Claude AI', '#D97757', 'https://claude.ai'),
  createSkillBadge(SiOpenai, 'ChatGPT', '#10A37F', 'https://openai.com'),
  createSkillBadge(GeminiIcon, 'Google Gemini', '#4E75FF', 'https://gemini.google.com'),
  createSkillBadge(AntigravityIcon, 'Antigravity', '#C084FC', 'https://deepmind.google'),
  createSkillBadge(SiFigma, 'Figma', '#F24E1E', 'https://figma.com'),
];

/**
 * SkillsLoop Component
 * Dynamic, infinite logo ticker for Skills & Expertise using React Bits LogoLoop.
 */
const SkillsLoop = () => {
  return (
    <div className="space-y-4 w-full overflow-hidden py-1">
      {/* Category 1: Frontend & UI */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-light-text-secondary dark:text-dark-text-secondary">
            Frontend &amp; Frameworks
          </span>
          <span className="text-[10px] font-mono text-primary-500 font-medium">8 Technologies</span>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <LogoLoop
            logos={frontendLogos}
            speed={45}
            direction="left"
            logoHeight={36}
            gap={18}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Frontend technologies"
          />
        </div>
      </div>

      {/* Category 2: Backend, Database & Cloud */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-light-text-secondary dark:text-dark-text-secondary">
            Backend, Cloud &amp; DB
          </span>
          <span className="text-[10px] font-mono text-primary-500 font-medium">8 Technologies</span>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <LogoLoop
            logos={backendLogos}
            speed={40}
            direction="right"
            logoHeight={36}
            gap={18}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Backend and cloud technologies"
          />
        </div>
      </div>

      {/* Category 3: Modern AI & Viral Tools */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-light-text-secondary dark:text-dark-text-secondary">
            AI &amp; Modern Tools
          </span>
          <span className="text-[10px] font-mono text-secondary-500 font-medium">6 Tools</span>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <LogoLoop
            logos={modernAiTools}
            speed={48}
            direction="left"
            logoHeight={36}
            gap={18}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="AI and creative tools"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsLoop;
