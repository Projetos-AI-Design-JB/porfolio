'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const links = [
  { label: 'Portfolio', href: '/nova-home' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

export function FloatingNav() {
  return (
    <motion.nav
      className="home-nav"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`home-nav-link ${link.label === 'Portfolio' ? 'active' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </motion.nav>
  )
}
