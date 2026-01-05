"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { getLoanProductData } from '@/types/interface';

interface Step2Props {
  selectedProduct: getLoanProductData;
  loanAmount: string;
  setLoanAmount: (amount: string) => void;
  tenure: string;
  setTenure: (tenure: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  formatCurrency: (amount: number) => string;
  calculateEMI: () => number;
}

const Step2: React.FC<Step2Props> = ({
  selectedProduct,
  loanAmount,
  setLoanAmount,
  tenure,
  setTenure,
  isSubmitting,
  onSubmit,
  onBack,
  formatCurrency,
  calculateEMI
}) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
        </div>

        {/* Selected Product Summary */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Selected Product</p>
              <p className="font-bold text-gray-900">{selectedProduct.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
              <p className="font-bold text-purple-600">{selectedProduct.interestRate}%</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              min={selectedProduct.minAmount}
              max={selectedProduct.maxAmount}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
            />
            <p className="text-sm text-gray-500 mt-2">
              Range: {formatCurrency(selectedProduct.minAmount)} - {formatCurrency(selectedProduct.maxAmount)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min={1}
              max={360}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
            />
            <p className="text-sm text-gray-500 mt-2">Choose tenure between 1-360 months</p>
          </div>

          {/* EMI Calculator */}
          {loanAmount && tenure && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estimated EMI Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(calculateEMI())}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Payable</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(calculateEMI() * parseInt(tenure || '0'))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(parseFloat(loanAmount || '0'))}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-lg font-semibold text-orange-600">
                    {formatCurrency((calculateEMI() * parseInt(tenure || '0')) - parseFloat(loanAmount || '0'))}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Collateral
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Step2;
