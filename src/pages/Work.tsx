export default function Work() {
  const projects = [
    {
      id: 1,
      title: 'TechStartup Co. - Social Media Campaign',
      description: 'Grew their LinkedIn presence from 2K to 45K followers in 6 months through consistent, strategic content. Increased engagement rate by 320% and generated 150+ qualified leads.',
      service: 'Social Media Marketing',
      results: '45K followers | 320% engagement growth | 150+ leads',
    },
    {
      id: 2,
      title: 'E-Commerce Platform - Complete Rebuild',
      description: 'Built a production-ready e-commerce platform with React, Node.js, and PostgreSQL. Achieved 98% uptime, sub-second load times, and handled 50K+ daily transactions securely.',
      service: 'Web Development',
      results: '98% uptime | Sub-second performance | PCI-DSS compliant',
    },
    {
      id: 3,
      title: 'B2B Services - SEO Domination',
      description: 'Implemented comprehensive SEO strategy targeting 150+ keywords. Achieved #1 rankings for 35 primary keywords, resulting in 200% increase in organic traffic and 85 qualified sales per month.',
      service: 'SEO Services',
      results: '35 #1 rankings | 200% traffic growth | 85 monthly leads',
    },
    {
      id: 4,
      title: 'SaaS Company - Brand Authority',
      description: 'Built thought leadership presence across Twitter, LinkedIn, and industry publications. Generated 500K+ impressions monthly, established speaking opportunities at 3 major conferences.',
      service: 'Social Media Marketing',
      results: '500K+ monthly impressions | 3 conference talks | 200+ trials',
    },
  ];

  const serviceColors: { [key: string]: string } = {
    'Social Media Marketing': 'bg-blue-500/10 text-blue-400',
    'Web Development': 'bg-emerald-500/10 text-emerald-400',
    'SEO Services': 'bg-purple-500/10 text-purple-400',
  };

  return (
    <div className="page-enter min-h-screen bg-gray-950 pt-32">
      {/* Header Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="heading-h1 mb-6">Our Work Speaks for Itself</h1>
          <p className="text-xl text-gray-300">
            Portfolio of completed projects delivering measurable results across social media, web development, and SEO.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-container border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <div key={project.id} className="card flex flex-col">
                {/* Service Badge */}
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${serviceColors[project.service] || 'bg-blue-500/10 text-blue-400'}`}>
                    {project.service}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Results */}
                <div className="pt-6 border-t border-gray-800">
                  <p className="text-sm text-gray-400 mb-2 font-medium">Results:</p>
                  <p className="text-blue-400 font-medium">
                    {project.results}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container border-t border-gray-800 text-center">
        <h2 className="heading-h2 mb-6">Ready to Achieve Similar Results?</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          These results are just the beginning. Let's discuss your project and build something remarkable.
        </p>
        <a href="/contact" className="btn-primary inline-block">
          Start Your Project
        </a>
      </section>
    </div>
  );
}
