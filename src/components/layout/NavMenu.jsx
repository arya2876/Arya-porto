import { APP_CONFIG } from '../../utils/constants';
import { NAV_ITEMS } from '../../data/navigation';
import { scrollToId } from '../../utils/smoothScroll';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../ui/ThemeToggle';
import StaggeredMenu from './StaggeredMenu';

/**
 * NavMenu - portfolio navigation using the StaggeredMenu (React Bits) component.
 * Items come from src/data/navigation.js (single source of truth) — the same
 * list drives the section order in App.jsx, and StaggeredMenu's CSS counter
 * renders the 01-07 numbering from array order automatically.
 */
const menuItems = NAV_ITEMS.map(item => ({
  label: item.label,
  ariaLabel: `Go to ${item.label} section`,
  link: `#${item.id}`,
}));

const socialItems = [
  { label: 'Instagram', link: APP_CONFIG.social.instagram },
  { label: 'TikTok', link: APP_CONFIG.social.tiktok },
  { label: 'LinkedIn', link: APP_CONFIG.social.linkedin },
  { label: 'GitHub', link: APP_CONFIG.social.github },
].filter(s => s.link && s.link !== '#');

const smoothScrollTo = (e, href) => {
  if (!href || !href.startsWith('#')) return;
  e.preventDefault();
  scrollToId(href.slice(1), { offset: -24 });
};

const NavMenu = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const buttonColor = isDark ? '#f8fafc' : '#0f172a';

  return (
    <StaggeredMenu
      isFixed
      position="right"
      brand="AW"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={socialItems.length > 0}
      displayItemNumbering
      colors={['#4a90e2', '#8b5cf6']}
      accentColor="#8b5cf6"
      menuButtonColor={buttonColor}
      openMenuButtonColor={buttonColor}
      changeMenuColorOnOpen={false}
      headerExtra={<ThemeToggle />}
      onItemClick={(e, item) => smoothScrollTo(e, item.link)}
      onBrandClick={e => smoothScrollTo(e, '#home')}
    />
  );
};

export default NavMenu;
