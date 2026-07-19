import { NAV_ITEMS } from '../../data/navigation';
import { scrollToId } from '../../utils/smoothScroll';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../ui/ThemeToggle';
import StaggeredMenu from './StaggeredMenu';
import { useSocialLinks } from '../../hooks/useSocialLinks';

/**
 * NavMenu - portfolio navigation using the StaggeredMenu (React Bits) component.
 * Social links sekarang datang dari Supabase via useSocialLinks().
 */
const menuItems = NAV_ITEMS.map(item => ({
  label: item.label,
  ariaLabel: `Go to ${item.label} section`,
  link: `#${item.id}`,
}));

const smoothScrollTo = (e, href) => {
  if (!href || !href.startsWith('#')) return;
  e.preventDefault();
  scrollToId(href.slice(1), { offset: -24 });
};

const SOCIAL_LABELS = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'Twitter',
  youtube: 'YouTube',
  dribbble: 'Dribbble',
  behance: 'Behance',
};

const NavMenu = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const buttonColor = isDark ? '#f8fafc' : '#0f172a';
  const socialLinks = useSocialLinks();

  // Build social items dynamically from Supabase data
  const socialItems = Object.entries(socialLinks).map(([platform, url]) => ({
    label: SOCIAL_LABELS[platform] || platform.charAt(0).toUpperCase() + platform.slice(1),
    link: url,
  }));

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
