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
    client: 'Mirra Montessori School',
    title: 'Modern Montessori school website designed to showcase admissions, programs, learning philosophy, events, and parent engagement.',
    type: 'Personal Branding',
    tag: 'Education & Branding',
    description: 'Modern Montessori school website designed to showcase admissions, programs, learning philosophy, events, and parent engagement.',
    cover: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=85&auto=format',
    challenge: 'The school needed a premium digital presence that reflected its educational philosophy, showcased its modern campus, and made the admissions process engaging for prospective parents.',
    outcome: 'A brand-forward school website with professional campus photography, an intuitive admissions dashboard, and a cohesive brand identity that sets the institution apart.',
  },
  {
    slug: 'ravelon',
    client: 'RAVELON',
    title: 'Premium automotive accessories brand website focused on showcasing products, brand identity, and customer experience.',
    type: 'Automotive Accessories Website',
    tag: 'Automotive Branding',
    description: 'Premium automotive accessories brand website focused on showcasing products, brand identity, and customer experience.',
    cover: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format',
    challenge: 'The brand needed a digital presence that elevated automotive accessories beyond a simple product catalog and into a premium lifestyle and brand experience.',
    outcome: 'A brand-focused website with luxury automotive photography, immersive product presentations, and a refined aesthetic that positions every accessory as a premium purchase.',
  },
]
