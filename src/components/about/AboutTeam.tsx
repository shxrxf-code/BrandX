'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const team = [
  {
    name: 'Aarav Mehta',
    role: 'Founder & Principal Designer',
    bio: 'Sets the bar. 12 years of brand & product design across 6 continents.',
    avatar: 'AM',
    color: 'from-accent to-accent-bright',
  },
  {
    name: 'Priya Sharma',
    role: 'Strategy Director',
    bio: 'Our strategist-in-chief. Ex-McKinsey, ex-Stripe. Finds the story that wins.',
    avatar: 'PS',
    color: 'from-accent to-purple-500',
  },
  {
    name: 'Karthik Iyer',
    role: 'Head of Growth',
    bio: 'Runs every performance and SEO engagement. Believes in attribution and tacos.',
    avatar: 'KI',
    color: 'from-blue-500 to-accent',
  },
  {
    name: 'Devansh Rao',
    role: 'Engineering Lead',
    bio: 'Sets the performance bar at 100 Lighthouse. Has strong opinions about caching.',
    avatar: 'DR',
    color: 'from-accent to-cyan-500',
  },
  {
    name: 'Anika Reddy',
    role: 'Senior Product Designer',
    bio: 'Design systems specialist. Has shipped more tokens than she can count.',
    avatar: 'AR',
    color: 'from-pink-500 to-accent',
  },
  {
    name: 'Rohan Joshi',
    role: 'Motion & Brand Designer',
    bio: 'Our motion designer. Has won three Awwwards and counting.',
    avatar: 'RJ',
    color: 'from-accent to-orange-500',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Senior Frontend Engineer',
    bio: 'TypeScript purist. GSAP and Framer Motion are her comfort zone.',
    avatar: 'SK',
    color: 'from-accent to-green-500',
  },
  {
    name: 'Vikram Singh',
    role: 'Client Partner',
    bio: 'The first voice you hear. Ex-founder, ex-PM. Translates ambition into scope.',
    avatar: 'VS',
    color: 'from-accent to-indigo-500',
  },
]

export default function AboutTeam() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <SectionLabel number="05" label="The Team" className="mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl">
              Senior, on purpose.{' '}
              <span className="text-gradient-shine">Small, by design</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg text-white/55 leading-relaxed">
              Eight people. No juniors in the room. Every engagement is staffed
              with the people who will be doing the work — every time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 rounded-3xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors duration-500"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-display font-semibold text-lg mb-4 group-hover:scale-105 transition-transform duration-500`}
              >
                {member.avatar}
              </div>
              <h3 className="font-display text-base font-semibold text-white mb-1">
                {member.name}
              </h3>
              <div className="text-xs text-accent font-mono uppercase tracking-wider mb-3">
                {member.role}
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
