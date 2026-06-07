import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
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
      <Navbar />

      <main className="pt-40">
        <section className="px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <h1 className="text-hero font-semibold text-foreground max-w-text">
              Selected work.
            </h1>
            <p className="mt-8 text-lg text-muted max-w-text leading-relaxed">
              A small selection of recent projects across brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
          <div className="max-w-content mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {caseStudies.map((project) => (
                <li key={project.slug}>
                  <Link href={`/work/${project.slug}`} className="group block">
                    <div className="relative aspect-[4/3] bg-subtle overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-600"
                      />
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-6">
                      <div>
                        <h2 className="text-2xl font-medium text-foreground">
                          {project.client}
                        </h2>
                        <p className="mt-1 text-sm text-muted">
                          {project.title}
                        </p>
                      </div>
                      <span className="text-sm text-muted shrink-0">
                        {project.result}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  )
}
