import React, { useState } from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  const [employeeCount, setEmployeeCount] = useState(5);

  if (!isOpen) return null;

  const simpleBase = 40;
  const simplePerPerson = 6;
  const simpleTotal = simpleBase + employeeCount * simplePerPerson;

  const plusBase = 80;
  const plusPerPerson = 12;
  const plusTotal = plusBase + employeeCount * plusPerPerson;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-4xl w-full shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-[#F25238] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Transparent Pricing
          </span>
          <h2 className="editorial-serif text-4xl sm:text-5xl font-normal text-gray-900 mt-2">
            Plans for businesses of all sizes.
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            No hidden setup fees. Change or cancel anytime. You only pay when you run payroll.
          </p>
        </div>

        {/* Interactive Employee Slider */}
        <div className="bg-[#FAF9F7] p-5 rounded-2xl border border-gray-200 max-w-md mx-auto mb-10 text-center">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Calculate for your team size:
            </label>
            <span className="text-lg font-black text-[#0A3B34] bg-white px-3 py-1 rounded-xl shadow-sm border border-gray-200">
              {employeeCount} {employeeCount === 1 ? 'person' : 'people'}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="w-full accent-[#0A3B34] cursor-pointer"
          />
        </div>

        {/* 3 Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Simple */}
          <div className="border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition bg-white">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Essential</span>
              <h3 className="editorial-serif text-3xl font-semibold text-gray-900 mt-1">Simple</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Core full-service payroll for small teams.
              </p>
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">${simpleTotal}</span>
                <span className="text-xs text-gray-500"> / month</span>
                <p className="text-[11px] text-gray-400 mt-0.5">${simpleBase}/mo base + ${simplePerPerson}/person</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 border-t border-gray-100 pt-4">
                <li>✓ Full-service payroll across 50 states</li>
                <li>✓ Automated tax filing and payments</li>
                <li>✓ Employee self-onboarding portal</li>
                <li>✓ Basic hiring tools and document storage</li>
                <li>✓ Google Contacts roster sync</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('Simple')}
              className="mt-6 w-full border-2 border-[#0A3B34] text-[#0A3B34] hover:bg-[#0A3B34] hover:text-white py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
            >
              Choose Simple
            </button>
          </div>

          {/* Plus */}
          <div className="border-2 border-[#F25238] rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition bg-white relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F25238] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold uppercase text-[#F25238]">Complete</span>
              <h3 className="editorial-serif text-3xl font-semibold text-gray-900 mt-1">Plus</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Automated HR, time tracking, and team tools.
              </p>
              <div className="mb-4">
                <span className="text-4xl font-black text-gray-900">${plusTotal}</span>
                <span className="text-xs text-gray-500"> / month</span>
                <p className="text-[11px] text-gray-400 mt-0.5">${plusBase}/mo base + ${plusPerPerson}/person</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 border-t border-gray-100 pt-4">
                <li>✓ Everything in Simple, plus:</li>
                <li>✓ Next-day direct deposit</li>
                <li>✓ Time tracking and PTO approval flows</li>
                <li>✓ Automated AutoPilot™ payroll</li>
                <li>✓ Advanced AI compliance analysis</li>
                <li>✓ Veo video team celebrations</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('Plus')}
              className="mt-6 w-full bg-[#F25238] hover:bg-[#DE452C] text-white py-2.5 rounded-full text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Choose Plus
            </button>
          </div>

          {/* Premium */}
          <div className="border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition bg-[#FAF9F7]">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400">Enterprise</span>
              <h3 className="editorial-serif text-3xl font-semibold text-gray-900 mt-1">Premium</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Dedicated HR experts and VIP priority support.
              </p>
              <div className="mb-4">
                <span className="text-3xl font-black text-gray-900">Custom</span>
                <span className="text-xs text-gray-500"> / tailored</span>
                <p className="text-[11px] text-gray-400 mt-0.5">Scale with dedicated HR resource partner</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 border-t border-gray-100 pt-4">
                <li>✓ Everything in Plus</li>
                <li>✓ Dedicated certified HR advisor</li>
                <li>✓ Custom performance reviews</li>
                <li>✓ Enterprise compliance audit engine</li>
                <li>✓ Waived fees on contractor 1099 runs</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectPlan('Premium')}
              className="mt-6 w-full bg-[#0A3B34] hover:bg-[#072A25] text-white py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
