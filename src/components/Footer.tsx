'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, InstagramIcon, DribbbleIcon } from '@/components/ui/SocialIcons'

const socialLinks = [
  { label: 'X / Twitter', href: '#', icon: TwitterIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Dribbble', href: '#', icon: DribbbleIcon },
]

const footerLinks = {
  services: [
    { label: 'Brand Identity', href: '#' },
    { label: 'Web Development', href: '#' },
    { label: 'Digital Marketing', href: '#' },
    { label: 'UI/UX Design', href: '#' },
    { label: 'Mobile Apps', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-24 pb-8 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Main footer grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="font-display text-2xl font-bold text-white mb-6 block"
              whileHover={{ opacity: 0.8 }}
            >
              BRANDEX
              <span className="ml-1 text-xs font-normal text-text-muted tracking-widest uppercase">
                Digital
              </span>
            </motion.a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-8">
              Crafting premium digital experiences that elevate brands and drive
              measurable growth for forward-thinking companies worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href="mailto:brandexdigital.in@gmail.com"
                className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-sm group"
              >
                <Mail size={16} className="group-hover:text-accent-blue transition-colors" />
                brandexdigital.in@gmail.com
              </a>
              <a
                href="tel:+9170100096308"
                className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-sm group"
              >
                <Phone size={16} className="group-hover:text-accent-blue transition-colors" />
                +91 70100 096308
              </a>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={16} />
                India &middot; Global Reach
              </div>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-display text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <ArrowUpRight size={12} className="text-accent-blue" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-display text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <ArrowUpRight size={12} className="text-accent-blue" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social column */}
          <div>
            <h4 className="font-display text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Follow Us
            </h4>
            <div className="space-y-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-sm group"
                    whileHover={{ x: 4 }}
                  >
                    <Icon width={16} height={16} className="group-hover:text-accent-blue transition-colors" />
                    {social.label}
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {currentYear} Brandex Digital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
