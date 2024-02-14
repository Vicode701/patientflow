// components/Footer.tsx
'use client';

// fontawesome.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// Import the styles
import './FontAwesome';

import '@fortawesome/fontawesome-svg-core/styles.css';

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

// components/Footer.tsx

const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle the subscription (send email, update state, etc.)
    console.log('Subscribe button clicked!');
  };

  return (
    <footer className="bg-black md:px-16 px-8 text-white ">
      <div className="container mx-auto pt-8 grid grid-cols-12 grid-rows-2 gap-8">
        {/* First Row */}
        <div className="col-span-7 grid grid-cols-2 gap-4">
          {/* Column 1 */}
          <div>
            <p className="text-sm xl:text-xl font-medium mb-2">
              H&P Admin Note
            </p>
            <p className="text-sm xl:text-xl font-medium mb-2">LOSHQ</p>
            <p className="text-sm xl:text-xl font-medium mb-2">
              Hospitalist Insights
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <p className="text-sm xl:text-xl font-medium mb-2">Carres</p>
            <p className="text-sm xl:text-xl font-medium mb-2">Contact</p>
            <p className="text-sm xl:text-xl font-medium mb-2">
              Enterprise offers
            </p>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="col-span-5">
          <h2 className="text-lg font-bold mb-4">Join our Newsletter</h2>
          <form onSubmit={handleSubscribe} className="hidden md:flex">
            <input
              type="email"
              placeholder="Your email"
              className="border p-2 mr-2 rounded-l focus:outline-none text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
          {/* Add your newsletter subscription form or any other content here */}
        </div>

        {/* Second Row */}
        <div className="col-span-7">
          <p className="text-xs xl:text-lg font-medium ">
            Disclaimer: The information provided on this website is for general
            informational purposes only.
          </p>
          {/* Your content for the entire second row */}
        </div>

        <div className="col-span-5">
          <div className="flex">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mr-4"
            >
              <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mr-4"
            >
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mr-4"
            >
              <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mr-4"
            >
              <FontAwesomeIcon icon={['fab', 'youtube']} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
