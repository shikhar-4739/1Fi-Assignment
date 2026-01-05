"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { endpoints, codeExamples} from '@/lib/constants';

const DeveloperInformation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    const colors: { [key: string]: string } = {
      GET: 'bg-blue-100 text-blue-800 border-blue-200',
      POST: 'bg-green-100 text-green-800 border-green-200',
      PUT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      DELETE: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
            <p className="text-purple-100">Complete guide for integrating with LoanFi API</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-purple-100 mb-1">Base URL</p>
            <code className="text-sm font-mono">https://api.loanfi.com</code>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-purple-100 mb-1">API Version</p>
            <code className="text-sm font-mono">v1.0.0</code>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-purple-100 mb-1">Rate Limit</p>
            <code className="text-sm font-mono">60 req/min</code>
          </div>
        </div>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Start
        </h2>
        <div className="space-y-4">
          <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
            <p className="text-sm text-gray-600 mb-3">
              All authenticated endpoints require a JWT token in the Authorization header:
            </p>
            <code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">
              Authorization: Bearer YOUR_JWT_TOKEN
            </code>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Partner API Key Authentication</h3>
            <p className="text-sm text-gray-600 mb-3">
              For partner endpoints, use the X-API-Key header:
            </p>
            <code className="block bg-gray-900 text-green-400 p-3 rounded-lg text-sm font-mono">
              X-API-Key: YOUR_PARTNER_API_KEY
            </code>
          </div>
        </div>
      </motion.div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-linear-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Examples
          </h2>
          <div className="flex gap-2">
            {Object.keys(codeExamples).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedLanguage === lang
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-6 overflow-x-auto">
            <code className="text-sm font-mono">
              {codeExamples[selectedLanguage as keyof typeof codeExamples]}
            </code>
          </pre>
          <button
            onClick={() => copyToClipboard(codeExamples[selectedLanguage as keyof typeof codeExamples], 'code-example')}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            {copiedCode === 'code-example' ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* API Endpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          API Endpoints
        </h2>

        {endpoints.map((endpoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">
                    {endpoint.path}
                  </code>
                </div>
                {endpoint.auth && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold border border-orange-200">
                    {typeof endpoint.auth === 'string' ? endpoint.auth : 'Auth Required'}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{endpoint.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{endpoint.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {endpoint.request && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Request Body</h4>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{JSON.stringify(endpoint.request, null, 2)}</code>
                    </pre>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Response</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Error Codes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          HTTP Status Codes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { code: 200, message: 'OK - Request successful', color: 'green' },
            { code: 201, message: 'Created - Resource created successfully', color: 'green' },
            { code: 400, message: 'Bad Request - Invalid request parameters', color: 'yellow' },
            { code: 401, message: 'Unauthorized - Invalid or missing authentication', color: 'orange' },
            { code: 403, message: 'Forbidden - Insufficient permissions', color: 'orange' },
            { code: 404, message: 'Not Found - Resource not found', color: 'red' },
            { code: 429, message: 'Too Many Requests - Rate limit exceeded', color: 'red' },
            { code: 500, message: 'Internal Server Error - Server error', color: 'red' },
          ].map((status) => (
            <div key={status.code} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className={`px-2 py-1 rounded font-bold text-xs bg-${status.color}-100 text-${status.color}-800 border border-${status.color}-200`}>
                {status.code}
              </span>
              <p className="text-sm text-gray-700">{status.message}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
        <p className="text-purple-100 mb-6">
          Our support team is here to help you with API integration
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@loanfi.com
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2 border border-white/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeveloperInformation;
