'use client';
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [loanAmount, setLoanAmount] = useState(500000);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const stats = [
    { value: "₹500Cr+", label: "Loans Disbursed", delay: "delay-300" },
    { value: "50K+", label: "Active Users", delay: "delay-500" },
    { value: "99.9%", label: "Uptime SLA", delay: "delay-700" },
  ];

  const features = [
    { title: "Instant Approval", desc: "Get approved in 5 minutes" },
    { title: "Zero Paperwork", desc: "100% digital process" },
    { title: "No Liquidation", desc: "Keep your investments growing" },
  ];

  useEffect(() => {
    setMounted(true);

    // Count-up animation
    let start = 0;
    const end = loanAmount;
    const duration = 1200;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayAmount(end);
        clearInterval(timer);
      } else {
        setDisplayAmount(Math.floor(start));
      }
    }, stepTime);

    // Feature carousel
    const featureTimer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(featureTimer);
    };
  }, [loanAmount]);

  const handleLoanIncrease = () => {
    const newAmount = Math.min(loanAmount + 50000, 2000000);
    setLoanAmount(newAmount);
  };

  const handleLoanDecrease = () => {
    const newAmount = Math.max(loanAmount - 50000, 100000);
    setLoanAmount(newAmount);
  };

  return (
    <section className="relative h-screen min-h-150 max-h-225 px-4 py-8 bg-linear-to-br from-blue-50 via-white to-indigo-50 overflow-hidden flex items-center">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div
          className={`transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Badge with hover effect */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
            </span>
            <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
              Trusted by 50+ Leading NBFCs
            </span>
            <svg className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Heading with linear animation */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3">
            Loan Against <br />
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-linear-shift bg-size-[200%_auto]">
                Mutual Funds
              </span>
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8C50 3 100 1 150 4C200 7 250 9 298 6" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            <span className="text-gray-700 animate-fade-in-up animation-delay-300">
              Simplified
            </span>
          </h1>

          {/* Subtext with stagger animation */}
          <p className="text-base text-gray-600 max-w-xl mb-4 leading-relaxed animate-fade-in-up animation-delay-500">
            End-to-end loan origination with{' '}
            <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-default">
              automated underwriting
            </span>
            , real-time LTV checks, and instant approvals.
          </p>

          {/* Rotating features */}
          <div className="mb-4 h-14">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  activeFeature === i
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute'
                }`}
              >
                <div className="flex items-center gap-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="group px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
              <span>Schedule Demo</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="group px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Learn More</span>
            </button>
          </div>

          {/* STATS - Simplified */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                ${stat.delay}`}
              >
                <div className="text-2xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD - Enhanced Interactive */}
        <div
          className={`transition-all duration-1000 delay-300
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-600">Loan Calculator</span>
                </div>
                <span className="px-3 py-1 bg-linear-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg animate-pulse-glow">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pre-Approved
                </span>
              </div>

              {/* Loan Amount with Controls */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={handleLoanDecrease}
                    className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    aria-label="Decrease loan amount"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-0.5 transition-all duration-300">
                      ₹{displayAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-gray-500">Requested Amount</div>
                  </div>

                  <button
                    onClick={handleLoanIncrease}
                    className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    aria-label="Increase loan amount"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Portfolio Value */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-blue-50 rounded-lg py-2 px-3">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Against Portfolio: <span className="font-semibold text-blue-600">₹{(displayAmount * 2).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-4">
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹1L</span>
                  <span>₹20L</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600 font-medium">Processing Status</span>
                  <span className="text-blue-600 font-bold">85%</span>
                </div>
                <div className="h-2 bg-linear-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-progress-slide relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast" />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Interest Rate
                  </div>
                  <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">9.5%</div>
                  <div className="text-xs text-gray-500">per annum</div>
                </div>
                
                <div className="bg-linear-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                    <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    LTV Ratio
                  </div>
                  <div className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">50%</div>
                  <div className="text-xs text-gray-500">of portfolio</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => alert(`Applying for ₹${loanAmount.toLocaleString('en-IN')}`)}
                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden text-sm"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10">Apply Now - Instant Approval</span>
              </button>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-xl flex items-center gap-2 animate-float">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-bold text-gray-700">
                🚀 No liquidation required
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations & Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-8px) translateX(-50%); }
        }
        @keyframes linear-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes draw-line {
          0% { stroke-dasharray: 0 1000; }
          100% { stroke-dasharray: 1000 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes progress-slide {
          0% { width: 0%; }
          100% { width: 85%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-linear-shift { animation: linear-shift 3s ease infinite; }
        .animate-draw-line { animation: draw-line 2s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-shimmer-fast { animation: shimmer-fast 1.5s infinite; }
        .animate-progress-slide { animation: progress-slide 2s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-500 { transition-delay: 500ms; }
        .delay-700 { transition-delay: 700ms; }

        /* Custom Range Slider */
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-linear(135deg, #2563eb, #7c3aed);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
          transition: all 0.3s;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
        }
        .slider-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-linear(135deg, #2563eb, #7c3aed);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Hero;
