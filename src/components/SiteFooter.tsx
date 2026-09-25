import React, { useState } from 'react';

export const SiteFooter: React.FC = () => {
  const [cookieOpen, setCookieOpen] = useState(false);

  return (
    <>
      <footer className="bg-white border-t border-[#E6E4E0] pt-16 pb-20 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-16">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">Pricing</h4>
                <ul className="space-y-2.5">
                  <li><a className="hover:text-black transition" href="#pricing">View pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">Built for you</h4>
                <ul className="space-y-2.5">
                  <li><a className="hover:text-black transition" href="#">Starting a business</a></li>
                  <li><a className="hover:text-black transition" href="#">Switch to Gusto</a></li>
                  <li><a className="hover:text-black transition" href="#">Remote and Global</a></li>
                  <li><a className="hover:text-black transition" href="#">Why Gusto</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">For Accountants</h4>
                <ul className="space-y-2.5">
                  <li><a className="hover:text-black transition" href="#">Partner program</a></li>
                </ul>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">Get Started</h4>
                <ul className="space-y-2.5">
                  <li><a className="hover:text-black transition" href="#">Interactive Demo</a></li>
                  <li>
                    <span className="text-gray-600">Contact Sales - </span>
                    <strong className="text-gray-900 font-semibold">(800) 936-0383</strong>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3">Services</h4>
                <ul className="space-y-2.5">
                  <li><a className="hover:text-black transition" href="#">Small Business Platform</a></li>
                  <li><a className="hover:text-black transition" href="#">Full-service payroll</a></li>
                  <li><a className="hover:text-black transition" href="#">Employee Benefits</a></li>
                  <li><a className="hover:text-black transition" href="#">HR</a></li>
                  <li><a className="hover:text-black transition" href="#">Health Benefits</a></li>
                  <li><a className="hover:text-black transition" href="#">Financial Benefits</a></li>
                </ul>
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Company</h4>
              <ul className="space-y-2.5">
                <li><a className="hover:text-black transition" href="#">About</a></li>
                <li>
                  <a className="hover:text-black transition" href="#">
                    Careers - <span className="text-[#0A3B34] font-bold">We're hiring!</span>
                  </a>
                </li>
                <li><a className="hover:text-black transition" href="#">Awards</a></li>
                <li><a className="hover:text-black transition" href="#">Press</a></li>
                <li><a className="hover:text-black transition" href="#">News</a></li>
                <li><a className="hover:text-black transition" href="#">Investors</a></li>
                <li><a className="hover:text-black transition" href="#">Contact</a></li>
                <li><a className="hover:text-black transition" href="#">Affiliate program</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Resources</h4>
              <ul className="space-y-2.5">
                <li><a className="hover:text-black transition" href="#">Customer stories</a></li>
                <li><a className="hover:text-black transition" href="#">Customer reviews</a></li>
                <li><a className="hover:text-black transition" href="#">Compare</a></li>
                <li><a className="hover:text-black transition" href="#">Partner Directory</a></li>
                <li><a className="hover:text-black transition" href="#">Business Guides</a></li>
                <li><a className="hover:text-black transition" href="#">Buying Guides</a></li>
                <li><a className="hover:text-black transition" href="#">Glossary</a></li>
                <li><a className="hover:text-black transition" href="#">FAQs</a></li>
                <li><a className="hover:text-black transition" href="#">Security</a></li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Licenses</h4>
              <ul className="space-y-2.5">
                <li><a className="hover:text-black transition" href="#">Gusto Insurance Services</a></li>
                <li><a className="hover:text-black transition" href="#">Broker Licenses</a></li>
                <li><a className="hover:text-black transition" href="#">Privacy policy</a></li>
                <li><a className="hover:text-black transition" href="#">Terms of service</a></li>
                <li>
                  <button
                    onClick={() => setCookieOpen(true)}
                    className="hover:text-black transition cursor-pointer text-left"
                  >
                    Cookie preferences
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 6 */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Social</h4>
              <ul className="space-y-2.5">
                <li><a className="hover:text-black transition" href="#">Twitter / X</a></li>
                <li><a className="hover:text-black transition" href="#">LinkedIn</a></li>
                <li><a className="hover:text-black transition" href="#">Instagram</a></li>
                <li><a className="hover:text-black transition" href="#">Facebook</a></li>
                <li><a className="hover:text-black transition" href="#">YouTube</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-[11px] gap-4">
            <p>© 2026 Gusto, Inc. All rights reserved. Gusto is a registered trademark of Gusto, Inc.</p>
            <div className="flex space-x-6">
              <a className="hover:text-black transition" href="#">Site Map</a>
              <a className="hover:text-black transition" href="#">Accessibility</a>
              <a className="hover:text-black transition" href="#">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Cookie Preferences Button */}
      <button
        onClick={() => setCookieOpen(true)}
        aria-label="Cookie Preferences"
        className="fixed bottom-4 left-4 z-40 w-11 h-11 bg-[#0A3B34] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.598 11.064a1.006 1.006 0 0 0-.854-.172A3.993 3.993 0 0 1 17 7c0-1.68.998-3.125 2.45-3.784a1.004 1.004 0 0 0-.256-1.92A9.99 9.99 0 0 0 12 1C5.925 1 1 5.925 1 12s4.925 11 11 11c5.44 0 9.946-3.95 10.835-9.172a1.004 1.004 0 0 0-.237-.764ZM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path>
        </svg>
      </button>

      {/* Cookie Preferences Modal */}
      {cookieOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span>🍪</span> Privacy & Cookie Settings
              </h3>
              <button
                onClick={() => setCookieOpen(false)}
                className="text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gusto uses necessary cookies to securely maintain your session, protect against fraud, and power core payroll features. Optional analytics cookies help us improve product experiences.
            </p>
            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-xs font-medium text-gray-800">
                <span>Strictly Necessary (Auth & Security)</span>
                <span className="text-[#0A3B34] font-bold">Always Active</span>
              </label>
              <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-xs font-medium text-gray-800">
                <span>Performance & Experience Optimization</span>
                <input type="checkbox" defaultChecked className="rounded text-[#0A3B34]" />
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setCookieOpen(false)}
                className="flex-1 bg-[#0A3B34] text-white py-2.5 rounded-full text-xs font-bold hover:bg-[#072A25] transition cursor-pointer"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setCookieOpen(false)}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-full text-xs font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
