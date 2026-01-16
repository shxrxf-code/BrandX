import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-enter min-h-screen bg-gray-950 pt-32">
      {/* Hero Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="heading-h1 text-white leading-tight">
              Technical Execution <span className="text-blue-500">That Delivers</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              We don't compromise on quality or completeness. Every project is executed with precision, delivered on schedule, and built to scale.
            </p>

            <p className="text-lg text-gray-400">
              From strategic planning to full implementation—we handle it all, completely and professionally.
            </p>

            <div className="flex gap-4 pt-4">
              <Link to="/contact" className="btn-primary">
                Start Your Project
              </Link>
              <Link to="/work" className="btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex items-center justify-center">
            <div className="w-full h-80 bg-linear-to-br from-blue-500/10 to-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-gray-400 font-medium">Complete Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-container border-t border-gray-800">
        <div className="mb-16">
          <h2 className="heading-h2">Our Services</h2>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl">
            Specialized expertise across digital strategy, development, and growth
          </p>
        </div>

        <div className="section-grid">
          {/* Social Media Marketing */}
          <Link 
            to="/social-media"
            className="card group cursor-pointer"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                <span className="text-xl">📱</span>
              </div>
            </div>
            <h3 className="heading-h3 mb-3">Social Media Marketing</h3>
            <p className="text-gray-400 leading-relaxed">
              Strategic, consistent, and measurable growth across all platforms. We build authority and drive engagement.
            </p>
            <div className="mt-6 text-blue-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn more →
            </div>
          </Link>

          {/* Web Development */}
          <Link 
            to="/web-development"
            className="card group cursor-pointer"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                <span className="text-xl">💻</span>
              </div>
            </div>
            <h3 className="heading-h3 mb-3">Web Development</h3>
            <p className="text-gray-400 leading-relaxed">
              Production-ready websites built for performance, security, and scale. No shortcuts, full professionalism.
            </p>
            <div className="mt-6 text-blue-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn more →
            </div>
          </Link>

          {/* SEO Services */}
          <Link 
            to="/seo"
            className="card group cursor-pointer"
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                <span className="text-xl">🎯</span>
              </div>
            </div>
            <h3 className="heading-h3 mb-3">SEO Services</h3>
            <p className="text-gray-400 leading-relaxed">
              Sustainable, data-driven SEO that builds long-term rankings. Measurable results, no black hat tactics.
            </p>
            <div className="mt-6 text-blue-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn more →
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-container border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="heading-h2">Why Choose Us</h2>
          <p className="text-xl text-gray-400 mt-4">
            Because your project demands excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <h4 className="text-xl font-bold mb-3">Complete Delivery</h4>
            <p className="text-gray-400">
              We take ownership of every aspect. No hand-offs to third parties, no incomplete work. You get the full package.
            </p>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-3">Professional Excellence</h4>
            <p className="text-gray-400">
              Enterprise-grade standards applied to every project. Meticulous attention to detail, every single time.
            </p>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-3">On-Time, Always</h4>
            <p className="text-gray-400">
              Deadlines are commitments we keep. Transparent timelines, realistic delivery, zero surprises.
            </p>
          </div>
          <div className="card">
            <h4 className="text-xl font-bold mb-3">Measurable Results</h4>
            <p className="text-gray-400">
              Every strategy backed by data. We track, analyze, and optimize continuously for your success.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
