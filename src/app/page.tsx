import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import FeaturedCaseStudies from '@/components/FeaturedCaseStudies'
import FourPillars from '@/components/FourPillars'
import InteractiveServices from '@/components/InteractiveServices'
import ProcessTimeline from '@/components/ProcessTimeline'
import FounderVision from '@/components/FounderVision'
import Testimonials from '@/components/Testimonials'
import Insights from '@/components/Insights'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <FeaturedCaseStudies />
        <FourPillars />
        <InteractiveServices />
        <ProcessTimeline />
        <FounderVision />
        <Testimonials />
        <Insights />
        <FinalCTA />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
