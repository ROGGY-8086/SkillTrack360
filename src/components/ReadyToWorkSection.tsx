import React from 'react';

interface ReadyToWorkSectionProps {
  onOpenPricing: () => void;
  onOpenCompare: () => void;
  onOpenDemo: (tab?: string) => void;
  onTalkToSales: () => void;
  onSignUp: () => void;
}

export const ReadyToWorkSection: React.FC<ReadyToWorkSectionProps> = ({
  onOpenPricing,
  onOpenCompare,
  onOpenDemo,
  onTalkToSales,
  onSignUp,
}) => {
  return (
    <section className="bg-[#0A3B34] text-white pt-24 pb-20 rounded-t-[48px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="inline-block border border-white/30 text-xs px-4 py-1.5 rounded-full font-medium mb-6">
              Get started
            </span>
            <h2 className="editorial-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-white">
              Ready to work with<br />Gusto?
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 space-y-6">
            <ul className="space-y-2 text-sm sm:text-base text-teal-100/90 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="text-teal-300 font-bold">•</span> Create your free account.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-300 font-bold">•</span> Add your team (or let them self-onboard).
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal-300 font-bold">•</span> Run your first payroll.
              </li>
            </ul>
            <div>
              <button
                onClick={onSignUp}
                className="inline-block bg-white text-[#0A3B34] hover:bg-neutral-100 font-semibold px-8 py-3.5 rounded-full shadow transition cursor-pointer hover:scale-105"
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pastel Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {/* Card 1: Peach - Plans and Pricing */}
          <div
            onClick={onOpenPricing}
            className="action-box bg-[#FFE8DC] text-gray-900 rounded-3xl p-6 flex flex-col justify-between h-80 cursor-pointer"
          >
            <div className="flex items-center justify-center h-28">
              <span className="text-5xl action-icon">💰</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">See plans and pricing</h3>
                <span className="action-arrow w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs shadow-sm font-bold">
                  →
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                As in real numbers on the page. No proposal or quote needed, just clear and easy options.
              </p>
            </div>
          </div>

          {/* Card 2: Lavender - Compare Gusto */}
          <div
            onClick={onOpenCompare}
            className="action-box bg-[#EFE7F6] text-gray-900 rounded-3xl p-6 flex flex-col justify-between h-80 cursor-pointer"
          >
            <div className="flex items-center justify-center h-28">
              <span className="text-5xl action-icon">🔍</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">Compare Gusto</h3>
                <span className="action-arrow w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs shadow-sm font-bold">
                  →
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Find out how we stack up against ADP, Paychex, Rippling, and others.
              </p>
            </div>
          </div>

          {/* Card 3: Mint - Explore the Demo */}
          <div
            onClick={() => onOpenDemo('payroll')}
            className="action-box bg-[#D3F0E3] text-gray-900 rounded-3xl p-6 flex flex-col justify-between h-80 cursor-pointer"
          >
            <div className="flex items-center justify-center h-28">
              <span className="text-5xl action-icon">👀</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">Explore the demo</h3>
                <span className="action-arrow w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs shadow-sm font-bold">
                  →
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Take 5 minutes to check out how Gusto really works.
              </p>
            </div>
          </div>

          {/* Card 4: Soft Blue - Talk to Sales */}
          <div
            onClick={onTalkToSales}
            className="action-box bg-[#DCEBF6] text-gray-900 rounded-3xl p-6 flex flex-col justify-between h-80 cursor-pointer"
          >
            <div className="flex items-center justify-center h-28">
              <span className="text-5xl action-icon">🎧</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">Talk to sales</h3>
                <span className="action-arrow w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs shadow-sm font-bold">
                  →
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get info on capabilities, pricing, migration, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
