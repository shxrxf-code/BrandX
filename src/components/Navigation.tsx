import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import brandLogo from '../assets/logo.png';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'Social Media', path: '/social-media' },
    { label: 'Web Development', path: '/web-development' },
    { label: 'SEO', path: '/seo' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950/95 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-7xl mr-auto pr-6 lg:pr-12 py-3 flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center transition-smooth flex-shrink-0 hover:opacity-90 ml-5">
          <img 
            src={brandLogo} 
            alt="BrandX Logo" 
            className="h-14 w-auto object-contain flex-shrink-0"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12 flex-1 justify-end">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-smooth font-medium ${
                isActive(item.path)
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-900 rounded-lg transition-smooth hover:opacity-75 active:scale-95"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`transition-smooth font-medium py-2 ${
                  isActive(item.path) ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
