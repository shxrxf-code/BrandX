import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
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
      <main className="pt-32">
        <section className="px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <Link
              href="/work"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              ← All work
            </Link>

            <p className="mt-10 text-xs text-muted font-semibold tracking-wider uppercase">
              {project.category} · {project.year}
            </p>

            <h1 className="mt-3 text-heading-1 font-bold tracking-tight max-w-text">
              {project.client}
            </h1>

            <p className="mt-4 text-base text-muted max-w-text leading-relaxed">
              {project.title}
            </p>

            <p className="mt-8 text-sm font-semibold text-accent">
              {project.result}
            </p>
          </div>
        </section>

        <section className="mt-16 px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-secondary border border-border">
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

        <section className="py-20 px-6 md:px-10 border-t border-border mt-16">
          <div className="max-w-text mx-auto">
            <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-4">The project</p>
            <p className="text-base text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 border-t border-border">
          <div className="max-w-text mx-auto">
            <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-4">The challenge</p>
            <p className="text-base text-foreground leading-relaxed mb-12">
              {project.challenge}
            </p>
            <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-4">The outcome</p>
            <p className="text-base text-foreground leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 border-t border-border">
          <div className="max-w-content mx-auto">
            <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-6 text-center">Key metrics</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <span className="text-2xl md:text-3xl font-display font-bold text-accent block">{m.value}</span>
                  <span className="text-xs text-muted mt-1 block">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-10 border-t border-border">
          <div className="max-w-content mx-auto text-center">
            <h2 className="text-heading-2 font-bold tracking-tight mb-4">Want similar results?</h2>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
