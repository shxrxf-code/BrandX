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
    cover: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
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
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    challenge: 'The brand needed an online store that matched the quality of their physical products, with seamless browsing, easy navigation, and a checkout experience that reduced cart abandonment.',
    outcome: 'A streamlined e-commerce platform with intuitive product discovery, fast load times, and a mobile-first shopping experience optimized for conversion.',
  },
  {
    slug: 'mirra-montessori-school',
    client: 'Mirra Montessori School',
    title: 'Personal branding and digital presence for a modern Montessori educational institution.',
    type: 'Personal Branding in social media',
    tag: 'Personal Branding',
    description: 'Personal branding and digital presence website created for a modern Montessori educational institution, highlighting values, programs, and admissions.',
    cover: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80',
    challenge: 'The school needed a digital presence that reflected its educational philosophy, attracted prospective parents, and made the admissions process clear and inviting.',
    outcome: 'A warm, informative website that communicates the school\'s mission, showcases its programs, and provides a clear pathway for parent inquiries and admissions.',
  },
  {
    slug: 'ravelon',
    client: 'RAVELON',
    title: 'Premium automotive accessories platform designed for online growth and product visibility.',
    type: 'Car Accessories E-Commerce Website',
    tag: 'Automotive',
    description: 'Premium automotive accessories website designed for product showcasing, online sales, and brand growth.',
    cover: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=80',
    challenge: 'The automotive accessories brand required a visually compelling e-commerce platform that could showcase products effectively while providing a smooth purchasing experience.',
    outcome: 'A product-focused e-commerce site with rich media galleries, category-based browsing, and an optimized checkout flow that drives online sales.',
  },
]
