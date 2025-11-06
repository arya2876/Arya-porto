/**
 * Asset Helper - Load images with proper Vite handling
 */

// Profile Image
export const getProfileImage = () => {
  try {
    // Try to load from public folder
    return '/images/gambar1.png';
  } catch (error) {
    console.error('Error loading profile image:', error);
    return 'https://via.placeholder.com/150';
  }
};

// Project Images
export const getProjectImage = (imageName) => {
  try {
    return `/images/${imageName}`;
  } catch (error) {
    console.error(`Error loading project image: ${imageName}`, error);
    return null;
  }
};

// Lanyard Image
export const getLanyardImage = () => {
  try {
    // This is in src/assets, so we can import it
    return new URL('../assets/lanyard/lanyard.png', import.meta.url).href;
  } catch (error) {
    console.error('Error loading lanyard image:', error);
    return null;
  }
};

export default {
  getProfileImage,
  getProjectImage,
  getLanyardImage,
};
