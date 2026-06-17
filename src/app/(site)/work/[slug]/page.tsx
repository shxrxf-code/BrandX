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
    title: `${project.client}`,
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
      <main className="pt-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-magenta/5 blur-[100px] animate-aurora" style={{ animationDelay: '-3s' }} />
        </div>
        <section className="px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="w-full">
            <Link
              href="/work"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              ← All work
            </Link>

            <p className="mt-10 text-xs text-muted font-semibold tracking-wider uppercase">
              {project.type}
            </p>

            <h1 className="mt-3 text-heading-1 font-bold tracking-tight max-w-text">
              {project.client}
            </h1>

            <p className="mt-8 text-sm font-semibold text-accent">
              {project.tag}
            </p>
          </div>
        </section>

        <section className="mt-16 px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="w-full">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-secondary border border-border">
              <Image
                src={project.cover}
                alt={project.client}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-border mt-16">
          <div className="max-w-text mx-auto">
            <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-4">The project</p>
            <p className="text-base text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-border">
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

        <section className="py-20 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-border">
          <div className="w-full text-center">
            <h2 className="text-heading-2 font-bold tracking-tight mb-4">Want to work together?</h2>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 btn-gradient text-sm"
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
