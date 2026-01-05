"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ApplicationCompleteProps {
  loanApplicationId: string;
}

const ApplicationComplete: React.FC<ApplicationCompleteProps> = ({ loanApplicationId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className="text-gray-600 mb-2">Your loan application has been successfully submitted.</p>
        <p className="text-sm text-gray-500 mb-6">Application ID: <span className="font-mono font-semibold">{loanApplicationId}</span></p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            Our team will review your application and collateral details. You'll receive an update within 24-48 hours.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = '/dashboard/all-application'}
            className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            View Applications
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            New Application
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationComplete;
