import React, { useState } from 'react';

interface HeroSectionProps {
  onOpenDemo: (tab?: string) => void;
  onQuickPayrollSubmit: () => void;
  isPayrollSubmitted: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemo,
  onQuickPayrollSubmit,
  isPayrollSubmitted,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClick = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onQuickPayrollSubmit();
    }, 600);
  };

  return (
    <section className="hero-coral-mesh relative text-white pt-20 pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background subtle lighting swirls */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="gusto-heading-hero font-normal tracking-tight max-w-4xl mx-auto mb-6 text-white drop-shadow-sm">
          Hire, pay, and grow<br />like a pro.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl font-normal text-white/95 max-w-2xl mx-auto mb-9 leading-relaxed">
          Gusto handles payroll, HR, and more in a snap. That helps you expand your reach and keep betting big on yourself.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <button
            onClick={() => onOpenDemo('payroll')}
            className="bg-white text-[#1A1817] hover:bg-neutral-100 font-semibold px-8 py-3.5 rounded-full shadow-lg transition duration-200 cursor-pointer"
          >
            Create free account
          </button>
          <button
            onClick={() => onOpenDemo('ai')}
            className="border border-white/80 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full transition duration-200 cursor-pointer"
          >
            How Gusto works
          </button>
        </div>
      </div>

      {/* Floating Badges and Central App Showcase */}
      <div className="max-w-6xl mx-auto relative px-2 sm:px-4 mt-6">
        {/* Left Floating Badge: Review Requests */}
        <div
          style={{ ['--rot' as any]: '-1deg' }}
          className="hidden lg:block absolute -left-12 top-20 z-20 bg-[#0A3B34] text-white p-5 rounded-2xl shadow-2xl w-60 animate-float-1"
        >
          <p className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300/90 mb-1">Time Off</p>
          <h4 className="editorial-serif text-2xl font-normal mb-4">Review Requests</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl text-xs hover:bg-white/20 transition cursor-pointer">
              <span className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold">👩</span>
              <span className="font-medium text-white/90">Feb 27</span>
              <span className="ml-auto text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded">Paid</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl text-xs hover:bg-white/20 transition cursor-pointer">
              <span className="w-7 h-7 rounded-full bg-teal-200 flex items-center justify-center text-teal-900 font-bold">👨‍🦱</span>
              <span className="font-medium text-white/90">Mar 3</span>
              <span className="ml-auto text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded">Paid</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl text-xs hover:bg-white/20 transition cursor-pointer">
              <span className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-900 font-bold">👩‍🦰</span>
              <span className="font-medium text-white/90">Mar 18</span>
              <span className="ml-auto text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded">Pending</span>
            </div>
          </div>
        </div>

        {/* Right Floating Badge: Manage Team Shifts */}
        <div
          style={{ ['--rot' as any]: '1deg' }}
          className="hidden lg:block absolute -right-6 top-8 z-20 w-72 rounded-2xl overflow-hidden shadow-2xl bg-white text-gray-900 animate-float-2"
        >
          <div className="h-16 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 p-3 flex justify-center items-end">
            <div className="flex -space-x-2 border-2 border-white rounded-full bg-white px-2 py-0.5 shadow-sm translate-y-3">
              <span className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-sm border-2 border-white">👩🏽</span>
              <span className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-sm border-2 border-white">👨🏾</span>
              <span className="w-8 h-8 rounded-full bg-emerald-300 flex items-center justify-center text-sm border-2 border-white">🧑🏻</span>
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border-2 border-white">+2</span>
            </div>
          </div>
          <div className="p-5 pt-6 bg-white">
            <span className="text-[10px] tracking-wider uppercase text-gray-400 font-bold">Time Tracking</span>
            <h4 className="editorial-serif text-xl font-semibold text-gray-900 mt-0.5">Manage Team Shifts</h4>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>5 team members<br />June 15–June 30</span>
              <button
                onClick={() => onOpenDemo('team')}
                className="text-[#0A3B34] font-semibold hover:underline cursor-pointer"
              >
                Create schedule
              </button>
            </div>
          </div>
        </div>

        {/* Bottom-Right Floating Badge: Hiring Tools */}
        <div
          style={{ ['--rot' as any]: '-0.5deg' }}
          onClick={() => onOpenDemo('contacts')}
          className="hidden md:flex absolute -right-2 bottom-8 z-20 items-center gap-3 bg-[#C8F0E2] text-teal-950 px-4 py-2.5 rounded-2xl shadow-xl border border-teal-200 animate-float-3 cursor-pointer hover:scale-105 transition"
        >
          <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center text-sm">
            ✨
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-teal-700 font-bold">Hiring Tools</p>
            <p className="font-semibold text-xs text-teal-950">Gusto Recruiting & Contacts</p>
          </div>
          <button className="ml-2 text-teal-800 font-bold text-sm">⋮</button>
        </div>

        {/* Central Gusto Application Payroll Window Mockup */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 text-left text-gray-800 max-w-4xl mx-auto gusto-elevated-shadow">
          {/* Top App Bar */}
          <div className="bg-[#FAF9F7] border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-[#F25238] text-lg tracking-tight">gusto</span>
              <div className="relative w-64 hidden sm:block">
                <input
                  className="w-full text-xs bg-white border border-gray-200 rounded-full py-1.5 px-3 pl-8 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="Search team, paystubs, apps..."
                  type="text"
                />
                <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-gray-800 leading-tight">Jessica Miller</p>
                <p className="text-[10px] text-gray-400">Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-xs border">JM</div>
            </div>
          </div>

          {/* App Body with Sidebar & Content Panel */}
          <div className="grid grid-cols-12 min-h-[380px]">
            {/* Mini Sidebar */}
            <div className="col-span-3 sm:col-span-3 border-r border-gray-100 bg-[#FAFAFA] p-3 text-xs space-y-1.5 hidden md:block">
              <button
                onClick={() => onOpenDemo('contacts')}
                className="w-full text-left text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>👥</span> People
              </button>
              <button
                onClick={() => onOpenDemo('payroll')}
                className="w-full text-left bg-[#0A3B34] text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <span>💳</span> Pay
              </button>
              <div className="pl-7 space-y-1 text-[11px] text-gray-500 pt-1">
                <p className="font-bold text-[#0A3B34] cursor-pointer" onClick={() => onOpenDemo('payroll')}>Run Payroll</p>
                <p className="hover:text-black cursor-pointer" onClick={() => onOpenDemo('team')}>Pay Contractors</p>
                <p className="hover:text-black cursor-pointer" onClick={() => onOpenDemo('payroll')}>Pay Bills</p>
              </div>
              <button
                onClick={() => onOpenDemo('ai')}
                className="w-full text-left text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>📊</span> AI Reports
              </button>
              <button
                onClick={() => onOpenDemo('ai')}
                className="w-full text-left text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>🏛️</span> Taxes
              </button>
              <button
                onClick={() => onOpenDemo('team')}
                className="w-full text-left text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>⏱️</span> Time
              </button>
              <button
                onClick={() => onOpenDemo('products')}
                className="w-full text-left text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>🛡️</span> Benefits
              </button>
            </div>

            {/* Main Content: Review & Submit Payroll */}
            <div className="col-span-12 md:col-span-9 p-6 lg:p-8">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>Pay / Spring bonus 2027</span>
                <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Step 4 of 4 ★ Ready
                </span>
              </div>
              <h3 className="editorial-serif text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
                Spring bonus 2027
              </h3>
              <p className="text-xs text-gray-500 mb-6">Check date: May 15, 2027</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 h-full w-full"></div>
              </div>

              {/* Main Submission Notice */}
              <div className={`rounded-xl p-5 border transition-all ${
                isPayrollSubmitted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-[#F8F9FA] border-gray-200 text-gray-900'
              } mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                <div>
                  <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
                    {isPayrollSubmitted ? (
                      <>
                        <span className="text-emerald-600 font-bold">✓ Direct Deposit Scheduled</span>
                      </>
                    ) : (
                      'Confirm $28,684.58 withdrawal and submit payroll'
                    )}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {isPayrollSubmitted
                      ? 'Funds queued for debit. Direct deposit hits employee accounts on May 15.'
                      : "We'll debit funds after you submit payroll."}
                  </p>
                </div>
                <button
                  onClick={handleSubmitClick}
                  disabled={isSubmitting || isPayrollSubmitted}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap ${
                    isPayrollSubmitted
                      ? 'bg-emerald-600 text-white cursor-default'
                      : isSubmitting
                      ? 'bg-gray-400 text-white animate-pulse'
                      : 'bg-[#0A3B34] hover:bg-[#072A25] text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  {isPayrollSubmitted
                    ? '✓ Submitted'
                    : isSubmitting
                    ? 'Submitting...'
                    : 'Submit Payroll Now'}
                </button>
              </div>

              {/* Summary Data Grid */}
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">Payroll Summary</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-gray-100 pt-3">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Submit by</span>
                    <strong className="font-semibold text-gray-800">Jul 15, 2027</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Payday on</span>
                    <strong className="font-semibold text-gray-800">Jul 16, 2027</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Total time off</span>
                    <strong className="font-semibold text-gray-800">0.00 hrs</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Total earnings</span>
                    <strong className="font-semibold text-[#0A3B34] text-sm">$28,684.58</strong>
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
