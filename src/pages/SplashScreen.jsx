import { motion } from "framer-motion";
import "../assets/styles/SplashScreen.css";

function SplashScreen() {
  return (
    <div className="splash">

      <motion.div
        className="logoSection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {/* Replace this with your logo later */}

        <motion.div
          className="logoBox"
          initial={{  opacity: 0 }}
          animate={{  opacity: 1 }}
          transition={{ duration: 1 }}
        >
          R
        </motion.div>

        <motion.div
          className="brand"
          initial={{  opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h1>
            Razz<span>Stock</span>
          </h1>

          <p>Smart Shopping Starts Here</p>
        </motion.div>

      </motion.div>

      <motion.div
        className="bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h5>Preparing your shopping experience...</h5>

        <div className="loadingBar">
          <div className="progress"></div>
        </div>

      </motion.div>

    </div>
  );
}

export default SplashScreen;