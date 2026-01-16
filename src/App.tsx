import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import MouseFollowBackground from './components/MouseFollowBackground';
import Home from './pages/Home';
import Work from './pages/Work';
import SocialMediaMarketing from './pages/SocialMediaMarketing';
import WebDevelopment from './pages/WebDevelopment';
import SEOServices from './pages/SEO';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <MouseFollowBackground />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/social-media" element={<SocialMediaMarketing />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/seo" element={<SEOServices />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
