export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Brandex rebuilt our digital presence from the ground up. Within 90 days we had a brand that investors respected and a site that converted at 3x our previous rate.',
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'SolarTech Energy',
  },
  {
    quote: 'They move faster than any agency we have worked with, and the work holds up to scrutiny. We re-engaged them for three more projects.',
    name: 'Marcus Webb',
    role: 'Founder',
    company: 'Drifto',
  },
  {
    quote: 'Working with Brandex felt like an extension of our team. They made the complex look simple and the simple look premium.',
    name: 'Priya Sharma',
    role: 'VP Product',
    company: 'FinFlow',
  },
]

export const trustedBy = [
  'SolarTech',
  'Drifto',
  'FinFlow',
  'Lumen',
  'Meridian',
  'Arc Studio',
]
