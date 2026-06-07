'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const offices = [
  {
    city: 'Bangalore',
    country: 'India',
    address: 'Indiranagar, Bangalore 560038',
    timezone: 'IST · UTC+5:30',
  },
  {
    city: 'Remote',
    country: 'Global',
    address: 'Working with clients across 6 continents',
    timezone: 'Async-first · 24h SLA',
  },
]

export default function ContactInfo() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="03" label="Get In Touch" className="mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.05] max-w-md mb-6">
              Or skip the form.{' '}
              <span className="text-gradient-shine">Reach out directly.</span>
            </h2>
            <p className="text-white/55 leading-relaxed max-w-md">
              For press, partnerships, or anything that doesn&apos;t fit the form —
              drop us a line directly. We read every email.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <ContactRow
              icon={<Mail size={18} />}
              label="Email"
              value="brandexdigital.in@gmail.com"
              href="mailto:brandexdigital.in@gmail.com"
            />
            <ContactRow
              icon={<Phone size={18} />}
              label="Phone / WhatsApp"
              value="+91 70100 096308"
              href="tel:+9170100096308"
            />
            <ContactRow
              icon={<MapPin size={18} />}
              label="Studio"
              value="Bangalore · India · Global"
              href="#"
            />
            <ContactRow
              icon={<Clock size={18} />}
              label="Hours"
              value="Mon–Fri · 10:00–19:00 IST"
              href="#"
            />
          </div>
        </div>

        {/* Offices */}
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {offices.map((o, i) => (
            <motion.div
              key={o.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-8 rounded-3xl glass-elevated border border-white/[0.06]"
            >
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-3">
                {o.country}
              </div>
              <h3 className="font-display text-3xl font-semibold text-white mb-2">
                {o.city}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">{o.address}</p>
              <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
                {o.timezone}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}) {
  const Wrapper: any = href === '#' ? 'div' : 'a'
  return (
    <Wrapper
      href={href}
      className="group flex items-center gap-4 p-5 rounded-2xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors duration-500"
      data-cursor-hover
    >
      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
          {label}
        </div>
        <div className="text-white font-medium group-hover:text-accent transition-colors duration-300 truncate">
          {value}
        </div>
      </div>
    </Wrapper>
  )
}
