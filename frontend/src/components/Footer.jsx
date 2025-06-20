import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-50 border-t mt-16">
      <div className="container mx-auto py-12 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">GrainTrade</h3>
            <p className="text-gray-600 mb-4">
              India's premier B2B grain trading platform connecting farmers, processors, and buyers in a transparent marketplace.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-amber-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/grains" className="text-gray-600 hover:text-amber-600 transition-colors">Grain Listings</Link>
              </li>
              <li>
                <Link to="/suppliers" className="text-gray-600 hover:text-amber-600 transition-colors">Supplier Directory</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-amber-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/market-prices" className="text-gray-600 hover:text-amber-600 transition-colors">Market Prices</Link>
              </li>
              <li>
                <Link to="/quality-standards" className="text-gray-600 hover:text-amber-600 transition-colors">Quality Standards</Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-gray-600 hover:text-amber-600 transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-amber-600 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-amber-600 transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Grain Market Road, Sector 18<br />
                  New Delhi, 110001
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-amber-600 mr-3 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-600 hover:text-amber-600">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-600 mr-3 flex-shrink-0" />
                <a href="mailto:info@graintrade.in" className="text-gray-600 hover:text-amber-600">
                  info@graintrade.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            <img src="/certifications/fssai.png" alt="FSSAI Certified" className="h-10" />
            <img src="/certifications/iso.png" alt="ISO 9001" className="h-10" />
            <img src="/certifications/agmark.png" alt="Agmark" className="h-10" />
            <img src="/certifications/apeda.png" alt="APEDA" className="h-10" />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} GrainTrade. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-amber-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-600 hover:text-amber-600 text-sm">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="text-gray-600 hover:text-amber-600 text-sm">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;