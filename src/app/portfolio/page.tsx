import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import PortfolioCTA from '@/components/portfolio/PortfolioCTA'

export const metadata: Metadata = {
  title: 'Work — Selected Case Studies',
  description: 'A selection of work we\'re proud of. Brand, web, growth, and product case studies from Brandex Digital.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PortfolioHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
      <Footer />
    </>
  )
}
