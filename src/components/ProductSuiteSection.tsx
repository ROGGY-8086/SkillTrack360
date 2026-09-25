import React, { useRef, useEffect, useState } from 'react';

interface ProductSuiteSectionProps {
  onOpenDemo: (tab?: string) => void;
}

export const ProductSuiteSection: React.FC<ProductSuiteSectionProps> = ({ onOpenDemo }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const scrollLeft = () => {
    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      scrollPosRef.current = Math.max(0, scrollPosRef.current - 340);
      if (scrollPosRef.current < singleSetWidth * 0.1) {
        scrollPosRef.current += singleSetWidth;
      }
      trackRef.current.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const singleSetWidth = trackRef.current.scrollWidth / 3;
      scrollPosRef.current += 340;
      if (scrollPosRef.current >= singleSetWidth * 2) {
        scrollPosRef.current -= singleSetWidth;
      }
      trackRef.current.scrollTo({ left: scrollPosRef.current, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let scrollStart = 0;
    let animationFrameId: number;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };
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

    // Initial position starts smoothly
    scrollPosRef.current = track.scrollLeft;

    const step = () => {
      if (track && isPlayingRef.current && !isDraggingRef.current) {
        // Continuous auto-scrolling speed
        // If hovered, slow down slightly to 0.4px/frame so it never looks frozen!
        const speed = isHoveredRef.current ? 0.45 : 1.15;
        scrollPosRef.current += speed;

        const singleSetWidth = track.scrollWidth / 3;
        if (singleSetWidth > 0 && scrollPosRef.current >= singleSetWidth * 2) {
          scrollPosRef.current -= singleSetWidth;
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

  const products = [
    {
      icon: '🏛️',
      title: 'Business insurance',
      desc: "Worker's comp, liability, property insurance—all designed to protect your business, and your bottom line.",
      tab: 'products',
    },
    {
      icon: '💰',
      title: 'Retirement benefits',
      desc: "Give your team a low-cost 401(k) they'll love. Automated, compliant, and payroll-synced for minimal effort from you.",
      tab: 'products',
    },
    {
      icon: '💵',
      title: 'Cash flow management',
      desc: 'Bring your expenses, income, and borrowing needs under one roof—the same one you use for payroll.',
      tab: 'payroll',
    },
    {
      icon: '💸',
      title: 'Payroll and AutoPilot™',
      desc: "Unlimited payroll runs and seamless tax filings at no extra cost. Plus, put it on autopilot and we'll take care of the rest.",
      tab: 'payroll',
    },
    {
      icon: '🤝',
      title: 'Hiring and HR',
      desc: "Hiring is hard. HR? Even harder. We'll take care of the details. You run the team.",
      tab: 'team',
    },
    {
      icon: '⏰',
      title: 'Time and scheduling',
      desc: "Manage your team's hours and schedules in one place. All linked to payroll.",
      tab: 'team',
    },
    {
      icon: '🏠',
      title: 'Extended workforce',
      desc: 'Pay and manage contractors wherever they work, right alongside payroll. No third party platforms involved.',
      tab: 'contacts',
    },
    {
      icon: '🛡️',
      title: 'Health insurance',
      desc: "Medical. Dental. Vision. We'll recommend plans and providers, and fully automate enrollment.",
      tab: 'products',
    },
  ];

  // Triplicate cards for truly infinite seamless horizontal looping
  const allCards = [...products, ...products, ...products];

  return (
    <section className="py-24 bg-[#FCFAF7] border-t border-[#E6E4E0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="editorial-serif text-5xl sm:text-6xl text-gray-900 font-normal leading-tight">
              Your business does a lot.<br />We do, too.
            </h2>
          </div>

          {/* Controls & Auto-scroll indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs font-semibold tracking-wider text-gray-600 uppercase">
                {isPlaying ? 'Auto-scrolling suite' : 'Suite paused'}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-1 text-[11px] font-bold text-gray-500 hover:text-black transition cursor-pointer"
                title={isPlaying ? 'Pause auto-scrolling' : 'Resume auto-scrolling'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            <button
              onClick={scrollLeft}
              aria-label="Previous Products"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition shadow-sm cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Products"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition shadow-sm cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Ribbon Track */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#FCFAF7] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#FCFAF7] to-transparent z-10"></div>

        <div
          ref={trackRef}
          style={{ scrollBehavior: 'auto' }}
          className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-3 cursor-grab active:cursor-grabbing select-none"
        >
          {allCards.map((item, index) => (
            <div
              key={index}
              onClick={() => onOpenDemo(item.tab)}
              className="product-marquee-card flex-shrink-0 w-[270px] sm:w-[310px] bg-white p-7 rounded-2xl border border-gray-200/80 hover:border-gray-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl product-icon">{item.icon}</span>
                  <span className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200">
                    ↗
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
