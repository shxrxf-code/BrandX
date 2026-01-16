import { Link } from 'react-router-dom';

export default function SEOServices() {
  return (
    <div className="page-enter min-h-screen bg-gray-950 pt-32">
      {/* Header Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="heading-h1 mb-6">SEO That Builds Sustainable Rankings</h1>
          <p className="text-xl text-gray-300">
            No tricks. No shortcuts. Just proven strategies that deliver long-term, measurable results from search engines.
          </p>
        </div>
      </section>

      {/* Why SEO Matters */}
      <section className="section-container border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-h2 mb-12">Why SEO Matters</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Top search rankings aren't luck—they're the result of strategic, technical, and content excellence. We build all three.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Organic Traffic</h3>
              <p className="text-gray-400">
                Consistent, qualified traffic from people actively searching for your solutions. No paid ads required.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Credibility & Authority</h3>
              <p className="text-gray-400">
                Top rankings signal trust and expertise. Your brand becomes the industry leader people want to work with.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Long-Term ROI</h3>
              <p className="text-gray-400">
                Unlike paid ads, organic rankings compound over time. Growth that accelerates and compounds year after year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Strategy */}
      <section className="section-container border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Our SEO Strategy</h2>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {/* Technical SEO */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Technical SEO Excellence</h3>
              <p className="text-gray-300 mb-6">
                Search engines must be able to crawl, index, and understand your site perfectly. We optimize every technical aspect.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Site speed optimization for Core Web Vitals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>XML sitemaps and robots.txt optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Mobile-first indexing compliance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Structured data markup and schema</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>URL structure optimization</span>
                </li>
              </ul>
            </div>

            {/* On-Page SEO */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">On-Page Content Optimization</h3>
              <p className="text-gray-300 mb-6">
                Every page is optimized for search intent and user engagement. Strategic keyword placement, compelling content, perfect execution.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Keyword research and semantic optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Title tags, meta descriptions, header optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Content depth and relevance enhancement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Internal linking architecture</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>User experience signals optimization</span>
                </li>
              </ul>
            </div>

            {/* Off-Page SEO */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Authority Building & Link Strategy</h3>
              <p className="text-gray-300 mb-6">
                Backlinks from authoritative sources signal trust. We build your authority through strategic, ethical link acquisition.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>High-quality backlink acquisition</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Competitor link analysis and replication</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Digital PR and outreach campaigns</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Brand mentions and citation building</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Toxic link detection and removal</span>
                </li>
              </ul>
            </div>

            {/* Content Strategy */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Content Strategy & Execution</h3>
              <p className="text-gray-300 mb-6">
                Content is the foundation of SEO. We create strategic, valuable content that ranks and converts.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Content strategy and editorial planning</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Topic clustering and pillar content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Professional content creation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Search intent alignment</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>Evergreen and seasonal content mix</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting & Analytics */}
      <section className="section-container border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Transparent Reporting & Analytics</h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            You see exactly what's working. Monthly reports with clear metrics, insights, and next steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h4 className="text-lg font-bold mb-3">Keyword Rankings</h4>
              <p className="text-gray-400">Track progress on every target keyword, monitor competitor movements, identify new opportunities</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-3">Organic Traffic</h4>
              <p className="text-gray-400">Detailed traffic analysis, user behavior, engagement metrics, and conversion tracking</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-3">Backlink Profile</h4>
              <p className="text-gray-400">Your growing authority, link quality metrics, domain authority trends, and competitor analysis</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-3">ROI & Conversions</h4>
              <p className="text-gray-400">Revenue from organic search, customer acquisition costs, lifetime value, and bottom-line impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Expectation */}
      <section className="section-container border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Realistic Timeline</h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-12">
            SEO is a long-term strategy. We're honest about timelines and focused on sustainable results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h4 className="text-lg font-bold mb-2">Months 1-3</h4>
              <p className="text-gray-400">Foundation building, technical optimization, initial content deployment, baseline establishment</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-2">Months 4-6</h4>
              <p className="text-gray-400">Visible improvements, growing traffic, first major keyword improvements, competitive positioning</p>
            </div>
            <div className="card">
              <h4 className="text-lg font-bold mb-2">Months 7-12+</h4>
              <p className="text-gray-400">Significant rankings, established authority, compounding growth, revenue generation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container border-t border-gray-800 text-center">
        <h2 className="heading-h2 mb-6">Ready to Dominate Your Search Results?</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Let's discuss your SEO strategy and build your path to top rankings.
        </p>
        <Link to="/contact" className="btn-primary inline-block">
          Schedule a Strategy Session
        </Link>
      </section>
    </div>
  );
}
