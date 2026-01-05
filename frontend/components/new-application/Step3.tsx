"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { getLoanProductData } from '@/types/interface';

interface Step3Props {
  fundName: string;
  setFundName: (name: string) => void;
  isin: string;
  setIsin: (isin: string) => void;
  units: string;
  setUnits: (units: string) => void;
  nav: string;
  setNav: (nav: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  selectedProduct: getLoanProductData | null;
  loanAmount: string;
  formatCurrency: (amount: number) => string;
}

const Step3: React.FC<Step3Props> = ({
  fundName,
  setFundName,
  isin,
  setIsin,
  units,
  setUnits,
  nav,
  setNav,
  isSubmitting,
  onSubmit,
  onBack,
  selectedProduct,
  loanAmount,
  formatCurrency
}) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Collateral Information</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Please provide details of the mutual fund units you want to pledge as collateral for this loan.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fund Name
            </label>
            <input
              type="text"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
              placeholder="e.g., HDFC Equity Fund"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ISIN Number
            </label>
            <input
              type="text"
              value={isin}
              onChange={(e) => setIsin(e.target.value)}
              placeholder="e.g., INF179KA1038"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
            />
            <p className="text-sm text-gray-500 mt-2">12-character alphanumeric code</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Units
              </label>
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="e.g., 100"
                step="0.001"
                min="0"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NAV (Net Asset Value)
              </label>
              <input
                type="number"
                value={nav}
                onChange={(e) => setNav(e.target.value)}
                placeholder="e.g., 150.50"
                step="0.01"
                min="0"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Collateral Value Display */}
          {units && nav && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Collateral Value</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatCurrency(parseFloat(units) * parseFloat(nav))}
                  </p>
                </div>
                {selectedProduct && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(parseFloat(loanAmount))}</p>
                    <p className="text-xs text-green-600 mt-1">
                      LTV: {((parseFloat(loanAmount) / (parseFloat(units) * parseFloat(nav))) * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Step3;
