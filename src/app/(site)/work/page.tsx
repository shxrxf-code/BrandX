import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/data/case-studies'

export const metadata = {
  title: 'Work',
  description: 'Selected projects from Brandex Digital.',
}

export default function WorkPage() {
  return (
    <>
      <main className="pt-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
          <div className="absolute -bottom-40 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan/5 blur-[100px] animate-aurora" style={{ animationDelay: '-4s' }} />
        </div>
        <section className="px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="w-full">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">Work</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              Selected work.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              A selection of recent projects across brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 mt-16 border-t border-border">
          <div className="w-full grid md:grid-cols-2 xl:grid-cols-2 gap-8">
            {caseStudies.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block rounded-xl overflow-hidden glass-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={project.cover}
                    alt={project.client}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-200 mb-1">
                    {project.client}
                  </h2>
                  <p className="text-xs text-muted font-medium mb-2">
                    {project.type}
                  </p>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {project.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
