import React from 'react';

interface TrustAndStatsBannerProps {
  onOpenDemo: (tab?: string) => void;
}

export const TrustAndStatsBanner: React.FC<TrustAndStatsBannerProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-20 bg-white border-b border-[#E6E4E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Press & Award Accreditations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center pb-16 border-b border-gray-100 text-center md:text-left">
          {/* CNBC */}
          <div className="flex items-center justify-center space-x-3">
            <span className="font-black tracking-tighter text-xl text-gray-800">CNBC</span>
            <div className="text-[11px] leading-tight text-gray-600">
              <strong className="block text-gray-900 font-semibold">Best SMB payroll service</strong>
              For user experience 2025
            </div>
          </div>

          {/* Forbes Advisor */}
          <div className="flex items-center justify-center space-x-3">
            <div className="text-right">
              <span className="font-serif italic font-bold text-lg text-gray-900 leading-none block">Forbes</span>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-gray-500">ADVISOR</span>
            </div>
            <div className="text-[11px] leading-tight text-gray-600">
              <strong className="block text-gray-900 font-semibold">4.5 ★★★★★</strong>
              Forbes Advisor 2025
            </div>
          </div>

          {/* G2 Badge */}
          <div className="flex items-center justify-center space-x-3">
            <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 rounded">G2</span>
            <div className="text-[11px] leading-tight text-gray-600">
              <strong className="block text-gray-900 font-semibold">#1 Highest Satisfaction Software</strong>
              G2 Review 2026
            </div>
          </div>

          {/* Newsweek */}
          <div className="flex items-center justify-center space-x-3">
            <span className="font-bold text-base uppercase text-red-600 tracking-wider">Newsweek</span>
            <div className="text-[11px] leading-tight text-gray-600">
              <strong className="block text-gray-900 font-semibold">America's Best Online Platform</strong>
              Newsweek and Statista 2025
            </div>
          </div>
        </div>

        {/* 500,000+ Headline & Floating Lifestyle Vignettes */}
        <div className="py-20 relative text-center">
          {/* Photo 1: Left Top */}
          <div
            style={{ ['--rot' as any]: '-6deg' }}
            className="hidden lg:block absolute left-8 top-6 w-32 h-24 rounded-2xl overflow-hidden shadow-md animate-photo-drift"
          >
            <img
              alt="Small business owner at desk"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
            />
          </div>

          {/* Photo 2: Left Middle Street View */}
          <div
            style={{ ['--rot' as any]: '3deg', animationDelay: '1.2s' }}
            className="hidden lg:block absolute -left-4 top-40 w-24 h-32 rounded-2xl overflow-hidden shadow-md animate-photo-drift"
          >
            <img
              alt="Coffee shop storefront"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
            />
          </div>

          {/* Photo 3: Top Center Tailor/Artisan */}
          <div
            style={{ ['--rot' as any]: '2deg', animationDelay: '0.5s' }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-6 w-28 h-28 rounded-2xl overflow-hidden shadow-md animate-photo-drift"
          >
            <img
              alt="Fashion maker sewing"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80"
            />
          </div>

          {/* Photo 4: Right Craft Worker */}
          <div
            style={{ ['--rot' as any]: '2deg', animationDelay: '2s' }}
            className="hidden lg:block absolute right-6 top-36 w-36 h-28 rounded-2xl overflow-hidden shadow-md animate-photo-drift"
          >
            <img
              alt="Woodworker in studio"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"
            />
          </div>

          {/* Photo 5: Bottom Left Team */}
          <div
            style={{ ['--rot' as any]: '-3deg', animationDelay: '1.7s' }}
            className="hidden lg:block absolute left-24 bottom-2 w-28 h-32 rounded-2xl overflow-hidden shadow-md animate-photo-drift"
          >
            <img
              alt="Creative team collaboration"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
            />
          </div>

          {/* Central Giant Headline */}
          <div className="relative z-10 max-w-3xl mx-auto py-8">
            <h2 className="editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-gray-900 tracking-tight leading-[1.05]">
              500,000+ businesses run on Gusto.
            </h2>
            <div className="mt-10">
              <button
                onClick={() => onOpenDemo('payroll')}
                className="inline-block bg-[#0A3B34] text-white hover:bg-[#072A25] font-medium px-8 py-3.5 rounded-full transition shadow-sm cursor-pointer hover:scale-105"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
