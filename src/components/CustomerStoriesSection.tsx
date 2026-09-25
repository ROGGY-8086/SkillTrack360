import React, { useRef, useEffect } from 'react';

interface CustomerStoriesSectionProps {
  onOpenDemo: (tab?: string) => void;
}

export const CustomerStoriesSection: React.FC<CustomerStoriesSectionProps> = ({ onOpenDemo }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollPosRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);

  const scrollLeft = () => {
    if (trackRef.current) {
      scrollPosRef.current = Math.max(0, scrollPosRef.current - 380);
      trackRef.current.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      scrollPosRef.current += 380;
      trackRef.current.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' });
    }
  };

  // Continuous auto-glide with drag support
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let scrollStart = 0;
    let animationFrameId: number;

    const handleMouseEnter = () => { isHoveredRef.current = true; };
    const handleMouseLeave = () => { isHoveredRef.current = false; };
    const handleTouchStart = () => {
      isDraggingRef.current = true;
      scrollPosRef.current = track.scrollLeft;
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      scrollPosRef.current = track.scrollLeft;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startX = e.pageX - track.offsetLeft;
      scrollStart = track.scrollLeft;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        scrollPosRef.current = track.scrollLeft;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
      scrollPosRef.current = track.scrollLeft;
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    track.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    track.addEventListener('mousemove', handleMouseMove);

    scrollPosRef.current = track.scrollLeft;

    const step = () => {
      if (!isDraggingRef.current && track) {
        const speed = isHoveredRef.current ? 0.35 : 0.9;
        scrollPosRef.current += speed;
        if (track.scrollWidth > 0 && scrollPosRef.current >= track.scrollWidth - track.clientWidth - 20) {
          scrollPosRef.current = 0;
        }
        track.scrollLeft = scrollPosRef.current;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      track.removeEventListener('touchstart', handleTouchStart);
      track.removeEventListener('touchend', handleTouchEnd);
      track.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      track.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-24 bg-white border-t border-[#E6E4E0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Story Navigator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="editorial-serif text-4xl sm:text-5xl md:text-6xl text-gray-900 font-normal">
              Small business success<br />is no small thing. 🌼
            </h2>
          </div>
          <div className="flex items-center space-x-6">
            <p className="text-sm text-gray-600 max-w-xs">
              Real customers. Real stories. Real small business successes.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={scrollLeft}
                aria-label="Previous Stories"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={scrollRight}
                aria-label="Next Stories"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition shadow-sm bg-white cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className="relative w-full">
        {/* Side Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar smooth-scroll-track px-4 sm:px-6 lg:px-8 py-4 cursor-grab active:cursor-grabbing"
        >
          {/* Card 1: New Brand Story Card */}
          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#F9F8F6] border border-[#E6E4E0] rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="rounded-2xl overflow-hidden mb-5 bg-gradient-to-tr from-pink-400 to-amber-300 p-3 h-48 flex items-center justify-center shadow-inner">
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md text-center w-full">
                  <div className="grid grid-cols-4 gap-2 text-xl mb-1">
                    <span>💌</span>
                    <span>🍎</span>
                    <span>⚙️</span>
                    <span>🎉</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Brand System</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-2">New brand. Same heart.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Gusto has a new look, a new voice, and a glowed-up Penny. How we evolved Gusto's brand, to match how far our product (and our customers' ambitions) have come.
              </p>
            </div>
            <div className="mt-6 pt-4">
              <button
                onClick={() => onOpenDemo('ai')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 border-b border-black pb-0.5 hover:text-[#F25238] hover:border-[#F25238] transition cursor-pointer"
              >
                See the news article →
              </button>
            </div>
          </div>

          {/* Card 2: Deep Teal Quote Card - Jesse Mason */}
          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#0B473F] text-white rounded-3xl p-7 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-3xl text-teal-300 font-serif leading-none block mb-4">“</span>
              <p className="text-lg font-serif italic text-white/95 leading-relaxed">
                The platform has made our small business lives so much easier. There really isn't a one-size-fits-all guide to starting and running a business, and things like payroll and benefits seem so daunting and big, but Gusto has made them approachable and surprisingly easy.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-gray-900 flex items-center justify-center text-xl shadow">
                ☝️
              </div>
              <div>
                <p className="font-bold text-sm text-white">Jesse Mason</p>
                <p className="text-xs text-teal-200">Co-Owner, Mason's Creamery</p>
              </div>
            </div>
          </div>

          {/* Card 3: Photo Story Card - Forge Fire */}
          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#F9F8F6] border border-[#E6E4E0] rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="rounded-2xl overflow-hidden mb-5 h-48 bg-slate-800">
                <img
                  alt="Forge Fire shipping container headquarters"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80"
                />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-2">Helping the helpers.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fire safety training company Forge Fire reduced platform costs by 40% by moving to Gusto Premium.
              </p>
            </div>
            <div className="mt-6 pt-4">
              <button
                onClick={() => onOpenDemo('payroll')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 border-b border-black pb-0.5 hover:text-[#F25238] hover:border-[#F25238] transition cursor-pointer"
              >
                See the news article →
              </button>
            </div>
          </div>

          {/* Card 4: Deep Teal Quote Card - Amy Hayes Stellhorn */}
          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#0A3B34] text-white rounded-3xl p-7 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-3xl text-teal-300 font-serif leading-none block mb-4">“</span>
              <p className="text-lg font-serif italic text-white/95 leading-relaxed">
                They do our medical, dental, vision, and life insurance. It's so painless, it's like going to the spa, and we have great options and rates even though we have a super small team.
              </p>
              <button
                onClick={() => onOpenDemo('products')}
                className="inline-block mt-4 text-xs font-semibold text-teal-200 hover:text-white underline cursor-pointer"
              >
                See more stories →
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-gray-900 flex items-center justify-center text-xl shadow">
                🎬
              </div>
              <div>
                <p className="font-bold text-sm text-white">Amy Hayes Stellhorn</p>
                <p className="text-xs text-teal-200">CEO, Big Monocle</p>
              </div>
            </div>
          </div>

          {/* Repeat set for continuous glide */}
          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#F9F8F6] border border-[#E6E4E0] rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="rounded-2xl overflow-hidden mb-5 bg-gradient-to-tr from-pink-400 to-amber-300 p-3 h-48 flex items-center justify-center shadow-inner">
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md text-center w-full">
                  <div className="grid grid-cols-4 gap-2 text-xl mb-1">
                    <span>💌</span>
                    <span>🍎</span>
                    <span>⚙️</span>
                    <span>🎉</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Brand System</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-2">New brand. Same heart.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Gusto has a new look, a new voice, and a glowed-up Penny. How we evolved Gusto's brand, to match how far our product (and our customers' ambitions) have come.
              </p>
            </div>
            <div className="mt-6 pt-4">
              <button
                onClick={() => onOpenDemo('ai')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 border-b border-black pb-0.5 hover:text-[#F25238] hover:border-[#F25238] transition cursor-pointer"
              >
                See the news article →
              </button>
            </div>
          </div>

          <div className="story-card-item flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] bg-[#0B473F] text-white rounded-3xl p-7 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-3xl text-teal-300 font-serif leading-none block mb-4">“</span>
              <p className="text-lg font-serif italic text-white/95 leading-relaxed">
                The platform has made our small business lives so much easier. There really isn't a one-size-fits-all guide to starting and running a business, and things like payroll and benefits seem so daunting and big, but Gusto has made them approachable and surprisingly easy.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-gray-900 flex items-center justify-center text-xl shadow">
                ☝️
              </div>
              <div>
                <p className="font-bold text-sm text-white">Jesse Mason</p>
                <p className="text-xs text-teal-200">Co-Owner, Mason's Creamery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
