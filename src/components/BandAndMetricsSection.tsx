import React from 'react';

export const BandAndMetricsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-[#E6E4E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Illustrated Whimsical Band graphic */}
          <div className="lg:col-span-6">
            <div className="bg-[#F6E8FB] border border-purple-200 rounded-3xl p-6 sm:p-10 flex items-center justify-center min-h-[460px] shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-2xl"></div>

              <div className="relative z-10 w-full text-center">
                {/* Stylized SVG Band */}
                <svg className="w-full h-auto drop-shadow-sm max-w-[480px] mx-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 360 L480 360" opacity="0.3" stroke="#8E44AD" strokeDasharray="4 4" strokeWidth="2"></path>

                  {/* Character 1: Trumpet Player */}
                  <g transform="translate(60, 90)">
                    <rect fill="#E74C3C" height="22" rx="8" width="30" x="52" y="15"></rect>
                    <circle cx="67" cy="45" fill="#F0C2A2" r="18"></circle>
                    <polygon fill="#F1C40F" points="10,40 45,45 45,55 10,60"></polygon>
                    <rect fill="#F39C12" height="6" width="25" x="42" y="47"></rect>
                    <path d="M48 65 L88 65 L95 160 L38 160 Z" fill="#FFFFFF"></path>
                    <path d="M42 160 L62 260 L40 270" fill="none" stroke="#2C3E50" strokeLinecap="round" strokeWidth="14"></path>
                    <path d="M85 160 L75 250 L95 260" fill="none" stroke="#2C3E50" strokeLinecap="round" strokeWidth="14"></path>
                    <ellipse cx="38" cy="272" fill="#111" rx="14" ry="7"></ellipse>
                    <ellipse cx="98" cy="262" fill="#111" rx="14" ry="7"></ellipse>
                  </g>

                  {/* Character 2: Acoustic Guitarist */}
                  <g transform="translate(190, 70)">
                    <path d="M50 25 C50 15, 75 15, 85 25 L100 25" fill="none" stroke="#27AE60" strokeLinecap="round" strokeWidth="8"></path>
                    <circle cx="68" cy="40" fill="#F3D2B8" r="18"></circle>
                    <path d="M45 60 L92 60 L102 160 L38 160 Z" fill="#93C5FD"></path>
                    <g transform="translate(15, 60) rotate(-25)">
                      <ellipse cx="40" cy="80" fill="#D97706" rx="35" ry="42"></ellipse>
                      <circle cx="40" cy="75" fill="#78350F" r="12"></circle>
                      <rect fill="#92400E" height="70" width="10" x="35" y="-10"></rect>
                      <rect fill="#B45309" height="15" rx="3" width="20" x="30" y="-22"></rect>
                    </g>
                    <path d="M45 160 L40 270 L25 285" fill="none" stroke="#4B5563" strokeLinecap="round" strokeWidth="16"></path>
                    <path d="M88 160 L105 270 L125 285" fill="none" stroke="#4B5563" strokeLinecap="round" strokeWidth="16"></path>
                    <ellipse cx="20" cy="287" fill="#C084FC" rx="15" ry="8"></ellipse>
                    <ellipse cx="130" cy="287" fill="#C084FC" rx="15" ry="8"></ellipse>
                  </g>

                  {/* Character 3: Drummer */}
                  <g transform="translate(340, 95)">
                    <ellipse cx="65" cy="30" fill="#C026D3" rx="20" ry="16"></ellipse>
                    <circle cx="65" cy="48" fill="#8D5B4C" r="17"></circle>
                    <path d="M45 68 L85 68 L92 160 L40 160 Z" fill="#FFFFFF"></path>
                    <g transform="translate(20, 110)">
                      <rect fill="#EF4444" height="50" rx="5" width="60" x="10" y="20"></rect>
                      <polygon fill="none" points="10,20 25,70 40,20 55,70 70,20" stroke="#FDE047" strokeWidth="3"></polygon>
                      <line stroke="#FFFFFF" strokeWidth="4" x1="10" x2="70" y1="20" y2="20"></line>
                      <line stroke="#FFFFFF" strokeWidth="4" x1="10" x2="70" y1="70" y2="70"></line>
                    </g>
                    <line stroke="#A16207" strokeLinecap="round" strokeWidth="3" x1="30" x2="55" y1="90" y2="125"></line>
                    <line stroke="#A16207" strokeLinecap="round" strokeWidth="3" x1="90" x2="65" y1="95" y2="125"></line>
                    <path d="M45 160 L35 260 L20 275" fill="none" stroke="#047857" strokeLinecap="round" strokeWidth="14"></path>
                    <path d="M85 160 L100 260 L115 275" fill="none" stroke="#047857" strokeLinecap="round" strokeWidth="14"></path>
                    <ellipse cx="15" cy="275" fill="#1E293B" rx="14" ry="7"></ellipse>
                    <ellipse cx="120" cy="275" fill="#1E293B" rx="14" ry="7"></ellipse>
                  </g>
                </svg>
                <p className="text-xs text-purple-900 font-medium mt-4 tracking-wide">Growing together with harmony</p>
              </div>
            </div>
          </div>

          {/* Right: High-impact Metric Rows */}
          <div className="lg:col-span-6 space-y-9">
            <div className="w-full h-1 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 rounded-full"></div>

            {/* Metric 1 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-8 gap-4">
              <span className="editorial-serif text-5xl sm:text-6xl font-normal text-gray-900">
                9 out of 10
              </span>
              <p className="text-sm text-gray-600 sm:max-w-[210px] leading-snug">
                Customers would recommend Gusto
              </p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-8 gap-4">
              <span className="editorial-serif text-5xl sm:text-6xl font-normal text-gray-900">
                152 hrs/year
              </span>
              <p className="text-sm text-gray-600 sm:max-w-[210px] leading-snug">
                Average time saved on tax and compliance by switching to Gusto
              </p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-8 gap-4">
              <span className="editorial-serif text-5xl sm:text-6xl font-normal text-gray-900">
                4.5+ stars
              </span>
              <p className="text-sm text-gray-600 sm:max-w-[210px] leading-snug">
                Is our average rating from our loyal, happy customers
              </p>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 gap-4">
              <span className="editorial-serif text-5xl sm:text-6xl font-normal text-gray-900">
                500k+ businesses
              </span>
              <p className="text-sm text-gray-600 sm:max-w-[210px] leading-snug">
                Rely on Gusto to run their daily operations
              </p>
            </div>

            <p className="text-[11px] text-gray-400">
              Survey of 538 Gusto Customers, September 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
