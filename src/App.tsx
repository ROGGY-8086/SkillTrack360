/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle, logoutUser } from './lib/firebase';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { TrustAndStatsBanner } from './components/TrustAndStatsBanner';
import { PayrollSpeedSection } from './components/PayrollSpeedSection';
import { CustomerStoriesSection } from './components/CustomerStoriesSection';
import { ProductSuiteSection } from './components/ProductSuiteSection';
import { BandAndMetricsSection } from './components/BandAndMetricsSection';
import { ReadyToWorkSection } from './components/ReadyToWorkSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { SiteFooter } from './components/SiteFooter';
import { DemoModal } from './components/DemoModal';
import { PricingModal } from './components/PricingModal';
import { CompareModal } from './components/CompareModal';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoInitialTab, setDemoInitialTab] = useState('payroll');
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [isPayrollSubmitted, setIsPayrollSubmitted] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenDemo = (tab: string = 'payroll') => {
    setDemoInitialTab(tab);
    setDemoModalOpen(true);
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      if (res?.user) {
        setNotification(`Welcome to Gusto, ${res.user.displayName || 'Admin'}!`);
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      // In case popup was closed by user
      if (err.code !== 'auth/popup-closed-by-user') {
        alert('Authentication failed: ' + (err.message || String(err)));
      }
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
    setNotification('You have been signed out.');
    setTimeout(() => setNotification(null), 3000);
  };

  // Quick payroll submission from Hero mockup
  const handleQuickPayrollSubmit = () => {
    setIsPayrollSubmitted(true);
    setNotification('✓ $28,684.58 direct deposit submitted! AutoPilot™ confirmed for payday on May 15.');
    setTimeout(() => setNotification(null), 5000);

    // Speak announcement via gemini-3.8-flash-tts
    fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Direct deposit confirmed. Your Spring 2027 bonus payroll of $28,684.58 has been submitted for withdrawal. Funds will hit team accounts on May 15.',
        voice: 'Kore',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.audioData) {
          try {
            const binary = atob(data.audioData);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/wav' });
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play().catch(() => {});
          } catch (e) {
            console.error('Audio playback error:', e);
          }
        }
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#1A1817] font-sans antialiased overflow-x-hidden selection:bg-[#F25238] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-[#0A3B34] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-emerald-500/30 animate-bounce">
          <span>✨</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Gusto Site Layout */}
      <SiteHeader
        user={user}
        onOpenDemo={handleOpenDemo}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <main>
        {/* Hero with floating widgets & interactive Spring Bonus mockup */}
        <HeroSection
          onOpenDemo={handleOpenDemo}
          onQuickPayrollSubmit={handleQuickPayrollSubmit}
          isPayrollSubmitted={isPayrollSubmitted}
        />

        {/* Press accolades & 500k businesses with floating photos */}
        <TrustAndStatsBanner onOpenDemo={handleOpenDemo} />

        {/* Feature speed showcase: Run payroll in 5 mins with iPhone simulation */}
        <PayrollSpeedSection onOpenDemo={handleOpenDemo} />

        {/* Customer Stories with horizontal continuous motion */}
        <CustomerStoriesSection onOpenDemo={handleOpenDemo} />

        {/* Comprehensive Product Suite with continuous horizontal marquee */}
        <ProductSuiteSection onOpenDemo={handleOpenDemo} />

        {/* Illustrated whimsical band and key metrics */}
        <BandAndMetricsSection />

        {/* Ready to work with Gusto dark teal container + 4 action boxes */}
        <ReadyToWorkSection
          onOpenPricing={() => setPricingModalOpen(true)}
          onOpenCompare={() => setCompareModalOpen(true)}
          onOpenDemo={handleOpenDemo}
          onTalkToSales={() => handleOpenDemo('ai')}
          onSignUp={user ? () => handleOpenDemo('payroll') : handleSignIn}
        />

        {/* Final two-tone CTA banner */}
        <FinalCtaSection onComparePlans={() => setPricingModalOpen(true)} />
      </main>

      {/* Global 6-column Footer */}
      <SiteFooter />

      {/* Interactive Platform Demo & Sandbox Console */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        initialTab={demoInitialTab}
        user={user}
        onSignIn={handleSignIn}
      />

      {/* Plans & Pricing Modal */}
      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSelectPlan={(plan) => {
          setPricingModalOpen(false);
          setNotification(`Selected ${plan} plan. Create an account to run your first payroll!`);
          setTimeout(() => setNotification(null), 4000);
        }}
      />

      {/* Comparison Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onOpenDemo={() => {
          setCompareModalOpen(false);
          handleOpenDemo('payroll');
        }}
      />

      {/* Floating Gusto Copilot & Team Quick Launchers */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => handleOpenDemo('team')}
          className="bg-white hover:bg-emerald-50 text-[#0A3B34] border border-emerald-200 px-3.5 py-2 rounded-full shadow-lg font-bold text-xs flex items-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
        >
          <span>👥</span>
          <span>Team Overview</span>
        </button>

        <button
          onClick={() => handleOpenDemo('chatbot')}
          className="bg-gradient-to-r from-[#F25238] to-[#FF6B4A] hover:from-[#DE452C] hover:to-[#F25238] text-white px-4 py-3 rounded-full shadow-xl font-bold text-xs flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Ask Gusto Copilot</span>
          <span className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">Gemini</span>
        </button>
      </div>
    </div>
  );
}
