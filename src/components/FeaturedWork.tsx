import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/data/case-studies'

export default function FeaturedWork() {
  return (
    <section id="work" className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-content mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="text-eyebrow uppercase text-muted mb-6">Selected work</p>
            <h2 className="text-section font-semibold text-foreground max-w-text">
              Recent projects.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-block text-sm text-muted hover:text-foreground transition-colors duration-400"
          >
            View all →
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((project) => (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative aspect-[4/5] bg-subtle overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-600"
                  />
                </div>

                <div className="mt-6">
                  <p className="text-eyebrow uppercase text-muted mb-2">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="text-lg font-medium text-foreground">
                    {project.client}
                  </h3>
                  <p className="text-sm text-muted mt-1">{project.result}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
