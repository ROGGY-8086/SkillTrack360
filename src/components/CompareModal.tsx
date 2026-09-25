import React from 'react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, onOpenDemo }) => {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      feature: 'Transparent pricing with no quote required',
      gusto: '✓ Yes (Public)',
      adp: '✗ Hidden quote',
      paychex: '✗ Hidden quote',
      rippling: '✗ High base + add-ons',
    },
    {
      feature: 'AutoPilot™ automatic payroll runs',
      gusto: '✓ Included free',
      adp: '✗ Extra add-on fee',
      paychex: '✗ Extra fee',
      rippling: '✓ Supported',
    },
    {
      feature: 'Full 50-state tax filing included',
      gusto: '✓ Included free',
      adp: '✓ Extra per state',
      paychex: '✓ Extra per state',
      rippling: '✓ Included',
    },
    {
      feature: 'Google Workspace Contacts integration',
      gusto: '✓ 1-Click native sync',
      adp: '✗ Manual CSV only',
      paychex: '✗ Third-party bridge',
      rippling: '✓ Supported',
    },
    {
      feature: 'Next-day direct deposit',
      gusto: '✓ Included',
      adp: '✗ 2-4 business days',
      paychex: '✗ 2-3 business days',
      rippling: '✓ Included',
    },
    {
      feature: 'Contractor 1099 e-filing & delivery',
      gusto: '✓ Unlimited free',
      adp: '✗ $5-$10 per form',
      paychex: '✗ Extra fee',
      rippling: '✓ Included',
    },
    {
      feature: 'Built-in Gemini AI intelligence & voice briefings',
      gusto: '✓ Included',
      adp: '✗ None',
      paychex: '✗ None',
      rippling: '✗ Extra add-on',
    },
  ];

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
          <span className="text-xs uppercase font-bold tracking-wider text-[#0A3B34] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Side-By-Side Comparison
          </span>
          <h2 className="editorial-serif text-4xl sm:text-5xl font-normal text-gray-900 mt-2">
            See how Gusto stacks up.
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Why over 500,000 businesses made the switch from legacy payroll platforms.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F7] text-gray-700 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="p-4 font-bold text-gray-900">Feature</th>
                <th className="p-4 font-bold bg-[#E6F4EA] text-[#0A3B34] text-center rounded-t-xl">
                  Gusto
                </th>
                <th className="p-4 text-center">ADP Run</th>
                <th className="p-4 text-center">Paychex</th>
                <th className="p-4 text-center">Rippling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                  <td className="p-4 text-center bg-[#F3FAF5] font-bold text-[#0A3B34]">
                    {row.gusto}
                  </td>
                  <td className="p-4 text-center text-gray-600">{row.adp}</td>
                  <td className="p-4 text-center text-gray-600">{row.paychex}</td>
                  <td className="p-4 text-center text-gray-600">{row.rippling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="bg-[#0A3B34] hover:bg-[#072A25] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-sm cursor-pointer"
          >
            Try Gusto Interactive Demo
          </button>
        </div>
      </div>
    </div>
  );
};
