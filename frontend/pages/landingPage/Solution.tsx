'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Solution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const solutions = [
    {
      title: "For Borrowers",
      icon: "👤",
      emoji: "💰",
      linear: "from-blue-500 to-indigo-600",
      bglinear: "from-blue-50 to-indigo-50",
      features: [
        { text: "Instant loan approval in minutes", icon: "⚡" },
        { text: "No mutual fund liquidation required", icon: "🚫" },
        { text: "Competitive interest rates", icon: "💵" },
        { text: "100% digital journey", icon: "📱" }
      ]
    },
    {
      title: "For NBFCs",
      icon: "🏢",
      emoji: "🎯",
      linear: "from-purple-500 to-pink-600",
      bglinear: "from-purple-50 to-pink-50",
      featured: true,
      features: [
        { text: "Complete loan lifecycle management", icon: "🔄" },
        { text: "Automated compliance and reporting", icon: "📋" },
        { text: "Portfolio risk management", icon: "📊" },
        { text: "White-label solutions", icon: "🎨" }
      ]
    },
    {
      title: "For Partners",
      icon: "🤝",
      emoji: "🔗",
      linear: "from-green-500 to-emerald-600",
      bglinear: "from-green-50 to-emerald-50",
      features: [
        { text: "Easy API integration", icon: "⚙️" },
        { text: "Real-time webhook notifications", icon: "🔔" },
        { text: "Comprehensive documentation", icon: "📚" },
        { text: "Dedicated technical support", icon: "💬" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100
      }
    })
  };


  return (
    <section 
      ref={sectionRef}
      id="solutions" 
      className="relative py-20 bg-linear-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-full text-blue-600 text-sm font-semibold mb-4"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl"
            >
              🎯
            </motion.span>
            Tailored Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Built for Every{' '}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stakeholder
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive solutions designed to meet the unique needs of all participants in the LAMF ecosystem
          </motion.p>
        </motion.div>

        {/* Solution Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500
                ${solution.featured ? 'border-2 border-blue-500 lg:-mt-4 lg:mb-4' : 'border border-gray-100'}`}
            >
              {/* Featured Badge */}
              {solution.featured && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg group-hover:opacity-0 transition-opacity duration-300"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⭐ MOST POPULAR
                  </motion.span>
                </motion.div>
              )}

              {/* linear Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 bg-linear-to-br ${solution.bglinear} rounded-3xl`}
              />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 3,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${solution.linear} rounded-2xl mb-6 shadow-lg`}
                >
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    {solution.icon}
                  </motion.span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors"
                >
                  {solution.title}
                </motion.h3>

                {/* Features List */}
                <ul className="space-y-4">
                  {solution.features.map((feature, featureIdx) => (
                    <motion.li
                      key={featureIdx}
                      custom={featureIdx}
                      variants={featureVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover={{ x: 5 }}
                      className="flex items-start group/item"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`shrink-0 w-6 h-6 bg-linear-to-br ${solution.linear} rounded-full flex items-center justify-center mr-3`}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors leading-relaxed">
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover CTA */}
                <motion.div
                  initial={{ opacity: 1, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl bg-linear-to-r ${solution.linear} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <span>Get Started</span>
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative corner */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${solution.linear} rounded-bl-full`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
