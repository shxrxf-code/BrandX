import { Link } from 'react-router-dom';

export default function SocialMediaMarketing() {
  return (
    <div className="page-enter min-h-screen bg-gray-950 pt-32">
      {/* Header Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="heading-h1 mb-6">Social Media Marketing That Builds Authority</h1>
          <p className="text-xl text-gray-300">
            Consistent strategy. Authentic engagement. Sustainable growth. We don't chase algorithms—we build lasting audiences.
          </p>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="section-container border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-h2 mb-12">Our Approach</h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-400">01</span>
                </div>
                <h3 className="heading-h3">Audit & Strategy</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed">
                  We start with a complete analysis of your current presence, audience, and competitive landscape. This foundation informs every decision we make. We identify gaps, opportunities, and the exact positioning that sets you apart.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-400">02</span>
                </div>
                <h3 className="heading-h3">Content Mastery</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Consistent, high-quality content across all platforms. We don't just post—we craft messages that resonate, educate, and drive engagement. Every piece is strategically planned, professionally executed, and aligned with your brand voice.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-400">03</span>
                </div>
                <h3 className="heading-h3">Community Building</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Authentic engagement with your audience. We respond, participate, and build relationships that translate to loyalty and advocacy. Your community becomes your strongest asset.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-400">04</span>
                </div>
                <h3 className="heading-h3">Analytics & Growth</h3>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Data-driven optimization at every step. We track engagement, conversions, audience growth, and ROI. Monthly reports show exactly what's working and where we're adjusting for even better results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-container border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">What We Deliver</h2>

        <div className="max-w-5xl mx-auto">
          <div className="section-grid">
            <div className="card">
              <div className="text-4xl font-bold text-blue-400 mb-3">↑</div>
              <h3 className="text-xl font-bold mb-2">Consistent Growth</h3>
              <p className="text-gray-400">
                Followers, engagement, and influence increase month over month. Growth that lasts.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-blue-400 mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Audience Authority</h3>
              <p className="text-gray-400">
                Your brand becomes the trusted voice in your industry. People listen because you deliver.
              </p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-blue-400 mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Measurable ROI</h3>
              <p className="text-gray-400">
                Every metric tracked and reported. You see the direct impact on your bottom line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="section-container border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Platforms We Master</h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Instagram', 'LinkedIn', 'TikTok', 'Twitter', 'Facebook', 'YouTube'].map((platform) => (
              <div key={platform} className="card text-center py-8">
                <h3 className="text-lg font-bold">{platform}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container border-t border-gray-800 text-center">
        <h2 className="heading-h2 mb-6">Ready to Build Your Authority?</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Let's discuss your social media strategy and how we can accelerate your growth.
        </p>
        <Link to="/contact" className="btn-primary inline-block">
          Schedule a Consultation
        </Link>
      </section>
    </div>
  );
}
