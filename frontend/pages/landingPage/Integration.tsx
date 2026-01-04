'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Integration = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [copiedCode, setCopiedCode] = useState(false);

  const codeExample = `POST /api/v1/loans/application
Authorization: Bearer {token}

{
  "applicant_id": "USR123456",
  "loan_amount": 500000,
  "mutual_funds": [
    {
      "folio_number": "123456789",
      "scheme_code": "MF001",
      "units": 1000,
      "current_nav": 1250.50
    }
  ]
}

Response: 201 Created
{
  "loan_id": "LN789012",
  "status": "approved",
  "sanctioned_amount": 500000,
  "ltv_ratio": 0.5,
  "interest_rate": 9.5
}`;

  const integrationSteps = [
    {
      number: "1",
      title: "Authentication & Security",
      description: "OAuth 2.0, API keys, rate limiting, and end-to-end encryption",
      icon: "🔐",
      linear: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Real-time Webhooks",
      description: "Instant notifications for loan status, payments, and portfolio updates",
      icon: "🔔",
      linear: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      title: "Comprehensive Docs",
      description: "Interactive API explorer with code samples in multiple languages",
      icon: "📚",
      linear: "from-green-500 to-emerald-500"
    }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section 
      ref={sectionRef}
      id="integration" 
      className="relative py-20 bg-linear-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-linear-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-br from-green-100 to-cyan-100 rounded-full opacity-20 blur-3xl"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-full text-blue-600 text-sm font-semibold mb-4">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.span>
            Developer Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enterprise-Grade{' '}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              API Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate seamlessly with our RESTful APIs. Built for developers, trusted by enterprises.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              {integrationSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="group flex items-start bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                >
                  {/* Number Badge */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`shrink-0 w-12 h-12 bg-linear-to-br ${step.linear} rounded-xl flex items-center justify-center mr-4 shadow-lg text-white font-bold text-lg`}
                  >
                    {step.number}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h4>
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        className="text-2xl"
                      >
                        {step.icon}
                      </motion.span>
                    </div>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Code Editor Window */}
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-gray-400 text-sm font-medium">loan_application.json</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all"
                >
                  {copiedCode ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </motion.button>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
                  <motion.code
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    {codeExample}
                  </motion.code>
                </pre>
              </div>

              {/* Syntax Highlighting Indicator */}
              <div className="absolute top-20 right-6 flex flex-col gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 rounded-full bg-blue-400"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-2 h-2 rounded-full bg-purple-400"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-full shadow-xl flex items-center gap-2 border border-gray-200"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-gray-700">99.9% API Uptime</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
