'use client'

import MagneticButton from '@/components/ui/MagneticButton'

export default function AboutCTA() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(91,91,255,0.3) 0%, transparent 50%)',
          filter: 'blur(120px)',
        }}
      />
      <div className="section-container relative z-10 text-center">
        <h2 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-[-0.03em] leading-[0.95] max-w-4xl mx-auto mb-8">
          Like what you see?{' '}
          <span className="text-gradient-shine">Let&apos;s talk.</span>
        </h2>
        <p className="text-lg text-white/55 max-w-xl mx-auto mb-10">
          We take on a small number of engagements each quarter. If your project
          matters to you, it probably matters to us.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <MagneticButton variant="primary" size="lg" href="/contact" showArrow>
            Start a Conversation
          </MagneticButton>
          <MagneticButton variant="outline" size="lg" href="/portfolio">
            See Our Work
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
