import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageTransition = ({ location }) => {
  return (
    <motion.div
      key={location.pathname} 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen"
    >
      <Outlet />
    </motion.div>
  );
};

export default PageTransition;