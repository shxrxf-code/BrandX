import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CaseStudyView from '@/components/portfolio/CaseStudyView'
import { caseStudies } from '@/data/case-studies'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) return {}
  return {
    title: study.client,
    description: study.description,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = caseStudies.find((c) => c.slug === slug)
  if (!study) notFound()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <CaseStudyView study={study} />
      </main>
      <Footer />
    </>
  )
}
