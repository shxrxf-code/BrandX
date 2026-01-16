import { Link } from 'react-router-dom';

export default function WebDevelopment() {
  return (
    <div className="page-enter bg-gray-950 pt-16">
      {/* Header Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="heading-h1 mb-4">Production-Ready Web Development</h1>
          <p className="text-xl text-gray-300 mb-4">
            Websites built for performance, security, and scale. Not templates. Not shortcuts. Complete solutions engineered for your success.
          </p>
        </div>
      </section>

      {/* Core Standards Section */}
      <section className="section-container-compact border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-h2 mb-12">Our Standards</h2>

          <div className="space-y-8">
            {/* Performance */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Lightning-Fast Performance</h3>
              <p className="text-gray-300 mb-4">
                Sub-second load times. Optimized images, lazy loading, and efficient code. Your site performs flawlessly across devices and connections.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Core Web Vitals optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>CDN implementation for global delivery</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Database optimization for speed</span>
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-gray-300 mb-4">
                Your data and your customers' data are protected with industry-leading security practices and compliance standards.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>SSL/TLS encryption</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>OWASP compliance and regular audits</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Automated backups and disaster recovery</span>
                </li>
              </ul>
            </div>

            {/* Scalability */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Built to Scale</h3>
              <p className="text-gray-300 mb-4">
                Your site grows with your business. No redesigns when traffic spikes. Infrastructure that handles everything.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Cloud-native architecture</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Auto-scaling infrastructure</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>99.99% uptime guarantee</span>
                </li>
              </ul>
            </div>

            {/* Maintenance */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-4">Ongoing Support & Maintenance</h3>
              <p className="text-gray-300 mb-4">
                We don't hand off and disappear. Continuous monitoring, updates, and optimization keep your site running perfectly.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>24/7 monitoring and alerts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Security patches and updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Performance optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section-container-compact border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Modern Technology Stack</h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'React/Next.js', desc: 'Modern, fast, scalable frontend' },
              { name: 'TypeScript', desc: 'Type-safe, maintainable code' },
              { name: 'Node.js', desc: 'Robust backend infrastructure' },
              { name: 'PostgreSQL', desc: 'Reliable data management' },
              { name: 'AWS/GCP', desc: 'Enterprise cloud hosting' },
              { name: 'Docker & K8s', desc: 'Container orchestration' },
            ].map((tech) => (
              <div key={tech.name} className="card">
                <h4 className="text-lg font-bold mb-2">{tech.name}</h4>
                <p className="text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-container-compact border-t border-gray-800">
        <h2 className="heading-h2 mb-12 text-center">Our Development Process</h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[
              { step: 'Discovery', desc: 'Understanding your requirements, users, and business goals in detail' },
              { step: 'Design & Architecture', desc: 'Creating scalable, secure architecture and compelling design' },
              { step: 'Development', desc: 'Building with best practices, clean code, and thorough testing' },
              { step: 'Testing & QA', desc: 'Rigorous testing across all devices, browsers, and scenarios' },
              { step: 'Deployment', desc: 'Seamless deployment with zero downtime' },
              { step: 'Monitoring & Optimization', desc: 'Continuous monitoring and performance optimization' },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.step}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container border-t border-gray-800 text-center">
        <h2 className="heading-h2 mb-6">Ready for Your Next Website?</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Let's build something that scales with your ambitions.
        </p>
        <Link to="/contact" className="btn-primary inline-block">
          Start Your Project
        </Link>
      </section>
    </div>
  );
}
