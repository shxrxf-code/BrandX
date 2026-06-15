export interface CaseStudy {
  slug: string
  client: string
  title: string
  type: string
  tag: string
  description: string
  cover: string
  challenge: string
  outcome: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sunsolar-power-system',
    client: 'SunSolar Power System',
    title: 'Professional solar energy company website designed to showcase renewable energy solutions and generate leads.',
    type: 'Website Development & Branding',
    tag: 'Solar Energy',
    description: 'Professional solar energy company website designed to showcase renewable energy solutions, services, installations, and lead generation.',
    cover: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85&auto=format',
    challenge: 'The client needed a professional digital presence that could effectively communicate their renewable energy expertise, showcase past installations, and generate qualified leads from both residential and commercial customers.',
    outcome: 'A comprehensive solar energy platform featuring service showcases, installation galleries, educational content, and optimized lead capture flows that establish authority in the renewable energy space.',
  },
  {
    slug: 'drifto',
    client: 'Drifto',
    title: 'Modern men\'s wear e-commerce website featuring premium shopping experiences and conversion-focused design.',
    type: 'E-Commerce Website',
    tag: "Men's Fashion",
    description: 'Modern men\'s wear e-commerce website featuring premium shopping experiences, product catalogs, and optimized conversion-focused design.',
    cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85&auto=format',
    challenge: 'The brand needed an online store that matched the quality of their physical products, with seamless browsing, easy navigation, and a checkout experience that reduced cart abandonment.',
    outcome: 'A streamlined e-commerce platform with intuitive product discovery, fast load times, and a mobile-first shopping experience optimized for conversion.',
  },
  {
    slug: 'mirra-montessori-school',
    client: 'Mirra Montessori',
    title: 'Instagram branding showcase and social media content system designed for a modern Montessori educational institution.',
    type: 'Personal Branding & Social Media Strategy',
    tag: 'Personal Branding',
    description: 'Instagram branding showcase and social media content system designed for a modern Montessori educational institution.',
    cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=85&auto=format',
    challenge: 'The school needed a digital presence that reflected its educational philosophy while also building a strong personal brand strategy across social media platforms.',
    outcome: 'A cohesive social media content system and brand identity presentation that communicates the school\'s mission while driving engagement and admissions inquiries.',
  },
  {
    slug: 'ravelon',
    client: 'RAVELON',
    title: 'Premium automotive landing page and brand storytelling experience designed for a luxury vehicle brand.',
    type: 'Luxury Automotive Brand Experience',
    tag: 'Automotive',
    description: 'Premium automotive landing page and brand storytelling experience designed for a luxury vehicle brand.',
    cover: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format',
    challenge: 'The luxury automotive brand needed a digital presence that conveyed premium quality and craftsmanship through immersive brand storytelling rather than a traditional product catalog.',
    outcome: 'A cinematic brand experience with high-end photography, immersive storytelling, and a refined aesthetic that positions RAVELON as a luxury automotive brand.',
  },
]
