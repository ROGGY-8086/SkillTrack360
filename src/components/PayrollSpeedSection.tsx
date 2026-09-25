import React, { useState } from 'react';

interface PayrollSpeedSectionProps {
  onOpenDemo: (tab?: string) => void;
}

export const PayrollSpeedSection: React.FC<PayrollSpeedSectionProps> = ({ onOpenDemo }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Run payroll in five minutes flat.',
      subtitle: 'Better yet, let AutoPilot™ run it for you.',
      description:
        "Even with a complex team, we'll get your people paid quickly—or even automatically. And we'll file taxes, help with compliance, and identify tax credits that save you money.",
      amount: '$32,566.60',
      total: '$39,098.87',
      month: 'April',
      day: '15',
    },
    {
      step: '02',
      title: 'Automatic tax filings and payments.',
      subtitle: 'Local, state, and federal taxes on lock.',
      description:
        "Never worry about tax deadlines or filing paperwork again. Gusto calculates, deducts, and submits all employee and employer payroll taxes automatically on your schedule.",
      amount: '$14,210.00',
      total: '$18,450.25',
      month: 'April',
      day: '30',
    },
    {
      step: '03',
      title: 'Flexible payment methods & direct deposit.',
      subtitle: 'Next-day direct deposit for your team.',
      description:
        "Keep employees thrilled with flexible pay, off-cycle spot bonus runs, reimbursements, and automated contractor 1099 disbursements with zero hassle.",
      amount: '$48,920.15',
      total: '$56,110.00',
      month: 'May',
      day: '15',
    },
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 bg-[#FCFAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Playful Header Badge */}
        <div className="text-center md:text-left mb-16 flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span className="inline-flex items-center gap-2 bg-[#D1F2E7] text-[#0A433D] px-6 py-2 rounded-2xl font-serif text-3xl sm:text-4xl md:text-5xl border border-[#B3E5D4]">
            Payroll
            <svg className="w-8 h-8 inline text-[#0A433D]" fill="currentColor" viewBox="0 0 24 24">
              <rect fill="none" height="14" rx="2" stroke="currentColor" strokeWidth="2" width="20" x="2" y="5"></rect>
              <circle cx="12" cy="12" fill="none" r="3" stroke="currentColor" strokeWidth="2"></circle>
              <path d="M6 9h.01M18 15h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
            </svg>
          </span>
          <h2 className="editorial-serif text-3xl sm:text-4xl md:text-5xl text-gray-900 font-normal">
            at the speed of... wait, that's it?
          </h2>
        </div>

        {/* Two Column Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-sm font-semibold tracking-wider text-gray-400">— {current.step}</span>
            <h3 className="editorial-serif text-4xl sm:text-5xl font-normal text-gray-900 leading-tight">
              {current.title}
            </h3>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed pt-2">
              <h4 className="font-bold text-gray-900 text-lg">{current.subtitle}</h4>
              <p>{current.description}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenDemo('payroll')}
                className="inline-flex items-center gap-2 text-[#0A3B34] font-semibold border-b-2 border-[#0A3B34] pb-1 hover:text-black hover:border-black transition cursor-pointer"
              >
                <span>Discover payroll</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
            </div>

            {/* Dots indicator and prev/next arrows */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex space-x-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeStep === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Step ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                  aria-label="Previous step"
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                  aria-label="Next step"
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Mobile Device Simulation */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            {/* Background petal */}
            <div className="w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 rounded-[80px] rotate-12 absolute -z-0 opacity-80 filter blur-sm"></div>

            {/* Phone Frame */}
            <div className="relative z-10 w-72 sm:w-80 bg-black rounded-[44px] p-3.5 shadow-2xl border-4 border-gray-800 rotate-[-3deg] hover:rotate-0 transition duration-500">
              {/* Top Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30"></div>

              {/* Screen */}
              <div className="bg-white rounded-[34px] overflow-hidden p-5 pt-8 text-center text-gray-800">
                <div className="flex justify-between items-center text-[10px] text-gray-400 mb-4 px-1">
                  <span>9:41</span>
                  <span>5G 100%</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Payroll Complete</p>
                <h3 className="editorial-serif text-3xl font-semibold text-gray-900 mb-3">All set!</h3>

                {/* Calendar Card */}
                <div className="bg-gradient-to-b from-rose-500 to-amber-500 text-white rounded-2xl p-4 shadow-md max-w-[200px] mx-auto mb-4">
                  <span className="text-xs font-medium uppercase tracking-widest block text-white/90">
                    {current.month}
                  </span>
                  <span className="text-5xl font-black block my-1">{current.day}</span>
                  <span className="text-[10px] text-white/80">Scheduled direct deposit</span>
                </div>

                <p className="text-[11px] text-gray-500 leading-snug px-2 mb-4">
                  Gusto will withdraw <strong>{current.amount}</strong> from Acme Company on {current.month} {current.day}, 2026.
                </p>

                <button
                  onClick={() => onOpenDemo('payroll')}
                  className="w-full bg-[#0A3B34] hover:bg-[#072A25] text-white py-2 rounded-xl text-xs font-semibold mb-2 transition cursor-pointer"
                >
                  Go to home
                </button>

                <button
                  onClick={() => onOpenDemo('ai')}
                  className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <span>📥</span> Payroll journal report
                </button>

                <button
                  onClick={() => onOpenDemo('payroll')}
                  className="text-[11px] text-rose-500 mt-2 hover:underline cursor-pointer"
                >
                  Cancel this payroll
                </button>

                {/* Mini summary drawer */}
                <div className="mt-4 pt-3 border-t border-gray-100 text-left text-[11px] space-y-1">
                  <div className="flex justify-between text-gray-500">
                    <span>Total payroll</span>
                    <span className="font-bold text-gray-800">{current.total}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Withdrawal amount</span>
                    <span className="font-bold text-gray-800">{current.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
