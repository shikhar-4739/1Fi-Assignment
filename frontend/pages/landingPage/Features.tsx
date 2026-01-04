'use client';
import React, { useEffect, useRef, useState } from 'react';

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Automated Underwriting",
      description: "Real-time credit decisioning with configurable rules and AI-powered risk assessment",
      icon: "⚡",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      iconBg: "bg-yellow-100"
    },
    {
      title: "Dynamic LTV Calculation",
      description: "Live mutual fund valuation with automatic LTV adjustments based on market movements",
      icon: "📊",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100"
    },
    {
      title: "Secure API Integration",
      description: "RESTful APIs with OAuth 2.0, rate limiting, and comprehensive documentation",
      icon: "🔐",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconBg: "bg-green-100"
    },
    {
      title: "Real-time Webhooks",
      description: "Event-driven architecture for instant partner notifications and updates",
      icon: "🔔",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-purple-100"
    },
    {
      title: "Compliance Ready",
      description: "Built-in KYC, AML checks, and regulatory reporting for RBI compliance",
      icon: "✓",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      iconBg: "bg-teal-100"
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with portfolio insights and risk metrics",
      icon: "📈",
      color: "from-rose-400 to-red-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      iconBg: "bg-rose-100"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger animation for cards
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-20 bg-linear-to-b from-white via-blue-50/30 to-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-semibold mb-4 animate-fade-in">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Platform Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Powerful Features for{' '}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Lending
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Everything you need to launch and scale your LAMF business with enterprise-grade infrastructure
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-all duration-500 cursor-pointer
                ${visibleCards.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                hover:shadow-2xl hover:-translate-y-2`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.iconBg} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative corner gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Features;
