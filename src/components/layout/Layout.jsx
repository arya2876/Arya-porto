import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout Component - Wraps all pages with navbar and footer
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-20"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;
