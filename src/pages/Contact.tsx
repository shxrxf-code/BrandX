import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', service: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-enter bg-gray-950 pt-4">
      {/* Header */}
      <section className="section-container pb-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="heading-h1 mb-6">Let's Work Together</h1>
          <p className="text-xl text-gray-300">
            Tell us about your project. We'll respond quickly with a strategic plan and timeline.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-container pt-8 border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="card text-center py-16 bg-blue-500/10 border-blue-500/30">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-3">Thank you for reaching out</h3>
              <p className="text-gray-300">
                We've received your message and will be in touch within 24 hours with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card">
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="web">Web Development</option>
                    <option value="seo">SEO Services</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe your project, goals, and timeline..."
                  ></textarea>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 mt-6 text-center">
                We'll respond within 24 hours. Your information is confidential and secure.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="section-container py-16 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-h2 mb-8 text-center">Prefer to Connect Differently?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a 
              href="mailto:brandexdigital.in@gmail.com"
              className="card text-center block cursor-pointer hover:border-blue-500/50 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 pointer-events-none">
                <span className="text-xl">📧</span>
              </div>
              <h3 className="text-lg font-bold mb-2 pointer-events-none">Email</h3>
              <span className="text-blue-400 hover:text-blue-300 transition-colors pointer-events-none">
                brandexdigital.in@gmail.com
              </span>
            </a>

            <a 
              href="tel:7010096308"
              className="card text-center block cursor-pointer hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 pointer-events-none">
                <span className="text-xl">📱</span>
              </div>
              <h3 className="text-lg font-bold mb-2 pointer-events-none">Phone</h3>
              <span className="text-blue-400 hover:text-blue-300 transition-colors pointer-events-none">
                7010096308
              </span>
            </a>

            <a 
              href="https://wa.me/7010096308?text=Hello%20Brandex%20Team,%20I%20would%20like%20to%20discuss%20a%20project." 
              className="card text-center block cursor-pointer hover:border-green-500/50 transition-all duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 pointer-events-none">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-lg font-bold mb-2 pointer-events-none">WhatsApp</h3>
              <span className="text-green-400 hover:text-green-300 transition-colors pointer-events-none">
                Start Chat
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container py-16 border-t border-gray-800">
        <h2 className="heading-h2 mb-8 text-center">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: 'How long does a typical project take?',
              a: 'Timeline varies by scope. Social media strategies can launch in weeks. Web development typically takes 8-12 weeks. SEO is a long-term strategy with results visible in 3-6 months.',
            },
            {
              q: 'What\'s your pricing structure?',
              a: 'We provide custom quotes based on your project scope, complexity, and goals. We\'ll discuss budget upfront and ensure there are no surprises.',
            },
            {
              q: 'Do you offer ongoing support?',
              a: 'Absolutely. Most clients work with us on ongoing retainers. We maintain your website, optimize your campaigns, and ensure continuous improvement.',
            },
            {
              q: 'How do you measure success?',
              a: 'We define success metrics with you at the start. Whether it\'s revenue, rankings, traffic, or engagement—we track everything and report transparently.',
            },
          ].map((item, idx) => (
            <div key={idx} className="card">
              <h3 className="text-lg font-bold mb-3">{item.q}</h3>
              <p className="text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container py-12 border-t border-gray-800 text-center">
        <h2 className="heading-h3 mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-400 mb-6">
          Complete the form above and let's discuss your vision.
        </p>
        <div className="flex justify-center gap-8 text-sm">
          <a href="mailto:brandexdigital.in@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            brandexdigital.in@gmail.com
          </a>
          <span className="text-gray-600">|</span>
          <a href="tel:7010096308" className="text-blue-400 hover:text-blue-300 transition-colors">
            7010096308
          </a>
        </div>
      </section>
    </div>
  );
}
