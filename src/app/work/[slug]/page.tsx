import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { caseStudies } from '@/data/case-studies'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = caseStudies.find((c) => c.slug === slug)
  if (!project) return {}
  return {
    title: `${project.client} — ${project.title}`,
    description: project.description,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = caseStudies.find((c) => c.slug === slug)
  if (!project) notFound()

  return (
    <>
      <Navbar />

      <main className="pt-40">
        <section className="px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <Link
              href="/work"
              className="text-sm text-muted hover:text-foreground transition-colors duration-400"
            >
              ← All work
            </Link>

            <p className="mt-12 text-eyebrow uppercase text-muted">
              {project.category} · {project.year}
            </p>

            <h1 className="mt-6 text-section font-semibold text-foreground max-w-text">
              {project.client}
            </h1>

            <p className="mt-6 text-lg text-muted max-w-text leading-relaxed">
              {project.title}
            </p>

            <p className="mt-12 text-sm text-foreground max-w-text">
              {project.result}
            </p>
          </div>
        </section>

        <section className="mt-24 px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <div className="relative aspect-[16/9] bg-subtle overflow-hidden">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 border-t border-border">
          <div className="max-w-text mx-auto">
            <p className="text-eyebrow uppercase text-muted mb-6">The project</p>
            <p className="text-lg text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  )
}
