"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AllLoanApplication from './AllLoanApplication';
import MyLoanApplications from './MyLoanApplications';

const LoanApplications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-4">Loan Applications</h1>
        
        {/* Tab Switcher */}
        <div className="flex gap-2 bg-white/20 backdrop-blur-sm p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            All Applications
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'my'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            My Applications
          </button>
        </div>
      </motion.div>

      {/* Render Component Based on Active Tab */}
      {activeTab === 'my' ? <MyLoanApplications /> : <AllLoanApplication />}
    </div>
  );
};

export default LoanApplications;
