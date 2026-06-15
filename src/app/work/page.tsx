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
      <main className="pt-32">
        <section className="px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">Work</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              Selected work.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              A selection of recent projects across brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-10 mt-16 border-t border-border">
          <div className="max-w-content mx-auto grid md:grid-cols-2 gap-8">
            {caseStudies.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group block rounded-xl overflow-hidden border border-border bg-white hover:shadow-sm transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-display font-bold tracking-tight group-hover:text-accent transition-colors duration-200">
                        {project.client}
                      </h2>
                      <p className="text-sm text-muted mt-0.5">{project.title}</p>
                    </div>
                    <span className="text-xs text-muted font-medium shrink-0">{project.result}</span>
                  </div>
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
