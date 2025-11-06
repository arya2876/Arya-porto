import { FaInstagram, FaLinkedin, FaGithub, FaTiktok } from 'react-icons/fa';
import { APP_CONFIG } from '../../utils/constants';
import './SocialMediaCard.css';

/**
 * Social Media Icons Component with Popup Effects
 */
const SocialMediaCard = () => {
  return (
    <div className="social-icons-container">
      <h4 className="social-title">Connect on Social Media</h4>
      <div className="social-icons-grid">
        <a 
          href={APP_CONFIG.social.instagram || "https://instagram.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-popup instagram"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        
        <a 
          href={APP_CONFIG.social.tiktok || "https://tiktok.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-popup tiktok"
          aria-label="TikTok"
        >
          <FaTiktok />
        </a>
        
        <a 
          href={APP_CONFIG.social.linkedin || "https://linkedin.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-popup linkedin"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        
        <a 
          href={APP_CONFIG.social.github || "https://github.com"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-icon-popup github"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaCard;
