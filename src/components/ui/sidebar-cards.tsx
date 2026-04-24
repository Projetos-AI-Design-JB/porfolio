'use client'

import { motion } from 'framer-motion'
import { SiUpwork } from 'react-icons/si'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const cardVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.5 + i * 0.15,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
}

export function SidebarCards() {
  return (
    <aside className="home-sidebar">
      {/* Status Card */}
      <motion.div
        className="home-card"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="home-card-label">Status</div>
        <div className="home-card-value">
          <span className="status-dot" />
          Open to Work
        </div>
      </motion.div>

      {/* Role Card */}
      <motion.div
        className="home-card"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="home-card-label">Current Role</div>
        <div className="home-card-value">Freelance Developer</div>
      </motion.div>

      {/* Social Card */}
      <motion.div
        className="home-card"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="home-card-label">Connect</div>
        <div className="home-card-socials">
          <motion.a
            href="https://www.upwork.com/freelancers/~01c619e33efa8638d3"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-icon"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Upwork"
          >
            <SiUpwork size={15} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/juliano-bianchesi"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-icon"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="LinkedIn"
          >
            <FaLinkedin size={15} />
          </motion.a>
          <motion.a
            href="#contact"
            className="home-social-icon"
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="WhatsApp"
          >
            <FaWhatsapp size={15} />
          </motion.a>
        </div>
      </motion.div>
    </aside>
  )
}
