"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { getLoanProductData } from '@/types/interface';

interface Step1Props {
  products: getLoanProductData[];
  onProductSelect: (product: getLoanProductData) => void;
  formatCurrency: (amount: number) => string;
}

const Step1: React.FC<Step1Props> = ({ products, onProductSelect, formatCurrency }) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onClick={() => onProductSelect(product)}
          className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-linear-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              {product.interestRate}% Interest
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Min Amount</span>
              <span className="font-semibold text-gray-900">{formatCurrency(product.minAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Max Amount</span>
              <span className="font-semibold text-gray-900">{formatCurrency(product.maxAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">LTV Ratio</span>
              <span className="font-semibold text-purple-600">{product.ltv}%</span>
            </div>
          </div>
          <button className="w-full py-3 bg-linear-to-r hover:cursor-pointer from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Select Product
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Step1;
