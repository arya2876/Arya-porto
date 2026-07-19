import { motion } from 'framer-motion';
import NavMenu from './NavMenu';
import Footer from './Footer';
import LineBackground from '../ui/LineBackground';

/**
 * Layout Component - Wraps all pages with navbar and footer
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <LineBackground />
      <NavMenu />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;
