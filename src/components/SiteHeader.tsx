import React from 'react';
import { User } from 'firebase/auth';

interface SiteHeaderProps {
  user: User | null;
  onOpenDemo: (tab?: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  user,
  onOpenDemo,
  onSignIn,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center space-x-10">
          {/* Gusto Logo */}
          <a
            aria-label="Gusto Home"
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
            href="#"
          >
            <svg
              className="h-8 w-auto fill-[#F25238]"
              viewBox="0 0 120 34"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4 20.3c-2.3 0-3.9-1.7-3.9-4.2 0-2.5 1.6-4.2 3.9-4.2 1.3 0 2.3.5 2.9 1.3l2.8-2.6C16.8 9.1 14.8 8 12.3 8 7 8 2.8 12.3 2.8 17.7c0 5.4 4.3 9.6 9.6 9.6 3.1 0 5.5-1.4 6.8-3.4l-2.9-2.2c-.8.9-2 1.6-3.9 1.6v-3h7.2v-1.6h-7.2v1.6zm23.6-7.9v14.4h4.4V14.1c0-1.8.9-2.9 2.5-2.9 1.5 0 2.3.9 2.3 2.6v13h4.4V13.3c0-3.6-2.1-5.7-5.5-5.7-2.6 0-4.6 1.4-5.5 3.3l-.2-2.9h-4.3v4.4h1.4zm-14.7 0c0-1.9.9-2.8 2.3-2.8 1.4 0 2.2.9 2.2 2.8v14.4h4.4V12.1c0-3.5-2-5.4-5.3-5.4-2.5 0-4.5 1.3-5.4 3.1l-.2-2.7h-4.3v20.4h4.4l.1-14.7.9.3zm31.7 5.7c-2.7-.8-3.9-1.3-3.9-2.4 0-1.1 1-1.7 2.3-1.7 1.4 0 2.6.6 3.4 1.7l3-2.3C39.4 9 37 8.1 34.6 8.1c-3.7 0-6.4 2.2-6.4 5.7 0 3.2 2.2 4.4 5.3 5.3 2.7.8 3.7 1.4 3.7 2.5 0 1.2-1.1 1.9-2.5 1.9-1.6 0-3-.7-3.9-2.1l-3 2.3c1.4 2.1 3.9 3.3 6.9 3.3 4 0 6.8-2.3 6.8-6 0-3.3-2.1-4.4-5.5-5.3zm19.9-5.7h-3.6v-5h-4.4v5h-2.5v3.6h2.5v8.5c0 3.3 1.8 4.9 5.3 4.9 1.1 0 2.3-.2 3.1-.6l-.8-3.4c-.6.2-1.2.3-1.8.3-1.3 0-1.8-.7-1.8-2.1V16h4.1l-.4-3.6zm13.1-4.3c-5.5 0-9.7 4.3-9.7 9.7 0 5.4 4.2 9.7 9.7 9.7 5.5 0 9.7-4.3 9.7-9.7 0-5.4-4.2-9.7-9.7-9.7zm0 15.5c-3 0-5.2-2.4-5.2-5.7 0-3.3 2.2-5.7 5.2-5.7s5.2 2.4 5.2 5.7c0 3.3-2.2 5.7-5.2 5.7z"></path>
            </svg>
          </a>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-gray-700">
            <button
              onClick={() => onOpenDemo('team')}
              className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition font-semibold text-[#0A3B34]"
            >
              <span>Team Overview</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Updated</span>
            </button>
            <button
              onClick={() => onOpenDemo('chatbot')}
              className="relative group cursor-pointer flex items-center gap-1 hover:text-[#F25238] transition font-semibold"
            >
              <span>✨ AI Copilot</span>
              <span className="bg-orange-100 text-[#F25238] text-[10px] px-1.5 py-0.5 rounded-full font-bold">Gemini</span>
            </button>
            <button
              onClick={() => onOpenDemo('payroll')}
              className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition"
            >
              <span>Payroll & HR</span>
            </button>
            <button
              onClick={() => onOpenDemo('contacts')}
              className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition"
            >
              <span>Contacts Roster</span>
            </button>
            <button
              onClick={() => onOpenDemo('ai')}
              className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition"
            >
              <span>AI & Maps</span>
            </button>
            <a className="hover:text-black transition" href="#pricing">
              Pricing
            </a>
          </nav>
        </div>

        {/* Header Action Utility Buttons */}
        <div className="flex items-center space-x-4 text-[15px] font-medium">
          <button
            onClick={() => onOpenDemo('payroll')}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-100"
          >
            <svg className="w-4 h-4 text-[#0A3B34]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <span>See demo</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onOpenDemo('payroll')}
                className="bg-[#0A3B34] text-white hover:bg-[#072A25] px-4 py-2 rounded-full font-medium shadow-sm transition flex items-center gap-2 text-sm"
              >
                <span>Dashboard</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
              <div className="flex items-center gap-2 pl-1 border-l border-gray-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F25238] font-bold flex items-center justify-center text-xs border border-orange-200">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <button
                  onClick={onSignOut}
                  className="text-xs text-gray-500 hover:text-rose-600 font-medium transition"
                  title="Sign out"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={onSignIn}
                className="bg-[#0A3B34] text-white hover:bg-[#072A25] px-5 py-2.5 rounded-full font-medium shadow-sm transition cursor-pointer text-sm"
              >
                Create free account
              </button>
              <button
                onClick={onSignIn}
                className="hidden sm:inline-block text-gray-700 hover:text-black font-medium transition cursor-pointer text-sm"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
