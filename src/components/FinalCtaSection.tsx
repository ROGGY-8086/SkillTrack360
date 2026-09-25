import React from 'react';

interface FinalCtaSectionProps {
  onComparePlans: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onComparePlans }) => {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="tracking-tight mb-6">
          <span className="block font-black text-4xl sm:text-5xl md:text-6xl text-[#F25238] uppercase tracking-wide">
            DO WHAT YOU DO BEST.
          </span>
          <span className="editorial-serif text-5xl sm:text-6xl md:text-7xl font-normal text-gray-900 block mt-2">
            We'll handle the rest.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          We've got all kinds of plans for all sizes of business. Explore all the options. You'll pay nothing 'til you're ready to run payroll.
        </p>
        <div>
          <button
            onClick={onComparePlans}
            className="inline-block bg-[#0A3B34] text-white hover:bg-[#072A25] font-medium px-8 py-3.5 rounded-full transition shadow-md cursor-pointer hover:scale-105"
          >
            Compare plans
          </button>
        </div>
      </div>
    </section>
  );
};
