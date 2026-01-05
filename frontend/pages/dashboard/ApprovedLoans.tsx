"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getApprovedLoans } from '@/lib/api';
import { approvedLoansData } from '@/types/interface'

const ApprovedLoans = () => {
  const [approvedLoans, setApprovedLoans] = useState<approvedLoansData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredLoanId, setHoveredLoanId] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  const fetchApprovedLoans = async () => {
    try {
      setLoading(true);
      const data = await getApprovedLoans();
      setApprovedLoans(data.data);
      console.log(data.data, 'Approved Loans Data');    
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch approved loans');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      active: 'bg-green-100 text-green-800 border-green-200',
      disbursed: 'bg-blue-100 text-blue-800 border-blue-200',
      closed: 'bg-gray-100 text-gray-800 border-gray-200',
      defaulted: 'bg-red-100 text-red-800 border-red-200',
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateRepaidAmount = (loanAmount: number, outstanding: number) => {
    return loanAmount - outstanding;
  };

  const calculateProgress = (loanAmount: number, outstanding: number) => {
    const repaid = calculateRepaidAmount(loanAmount, outstanding);
    return ((repaid / loanAmount) * 100).toFixed(1);
  };

  const filteredLoans = approvedLoans.filter((loan) => {
    const matchesSearch = 
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanApplication.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || loan.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchApprovedLoans}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Approved Loans</h1>
            <p className="text-green-100">Track and manage all approved loan accounts</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-sm text-green-100">Total Approved</p>
              <p className="text-2xl font-bold">{approvedLoans.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Disbursed</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(approvedLoans.reduce((sum, loan) => sum + loan.loanApplication.loanAmount, 0))}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Outstanding</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(approvedLoans.reduce((sum, loan) => sum + loan.outstandingAmount, 0))}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Active Loans</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {approvedLoans.filter(loan => loan.status.toLowerCase() === 'active').length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Avg Interest Rate</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(approvedLoans.reduce((sum, loan) => sum + loan.interestRate, 0) / approvedLoans.length || 0).toFixed(2)}%
          </p>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Loan ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Loan Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Outstanding
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Repayment Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Collateral
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tenure
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Disbursed Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLoans.map((loan, index) => {
                const progress = calculateProgress(loan.loanApplication.loanAmount, loan.outstandingAmount);
                const repaidAmount = calculateRepaidAmount(loan.loanApplication.loanAmount, loan.outstandingAmount);
                const collaterals = loan.loanApplication.collaterals || [];
                const totalCollateralValue = collaterals.reduce((sum, col) => sum + (col.units * col.nav), 0);

                return (
                  <motion.tr
                    key={loan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {loan.id.substring(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500">
                        App: {loan.loanApplicationId.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{loan.user.name}</div>
                        <div className="text-gray-500">{loan.user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {loan.loanApplication.product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        LTV: {loan.loanApplication.product.ltv}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600">
                        {formatCurrency(loan.loanApplication.loanAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-orange-600">
                        {formatCurrency(loan.outstandingAmount)}
                      </div>
                      <div className="text-xs text-green-600">
                        Paid: {formatCurrency(repaidAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap relative"
                      onMouseEnter={() => setHoveredLoanId(loan.id)}
                      onMouseLeave={() => setHoveredLoanId(null)}
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-indigo-600">
                            {collaterals.length} {collaterals.length === 1 ? 'Fund' : 'Funds'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatCurrency(totalCollateralValue)}
                          </div>
                        </div>
                      </div>

                      {/* Hover Popup */}
                      {hoveredLoanId === loan.id && collaterals.length > 0 && (
                        <div className="absolute z-50 left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-3">
                          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                            <h3 className="text-xs font-bold text-gray-900">Collateral Details</h3>
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                              {collaterals.length} {collaterals.length === 1 ? 'Fund' : 'Funds'}
                            </span>
                          </div>
                          <div className="space-y-2 max-h-52 overflow-y-auto">
                            {collaterals.map((collateral, idx) => (
                              <div 
                                key={collateral.id} 
                                className="bg-gray-50 rounded-lg p-2 border border-gray-200 hover:border-indigo-300 transition-colors"
                              >
                                <div className="flex items-start justify-between mb-1.5">
                                  <div className="flex-1">
                                    <div className="text-xs font-semibold text-gray-900 mb-1">
                                      {collateral.fundName}
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded inline-block">
                                      ISIN: {collateral.isin}
                                    </div>
                                  </div>
                                  <div className="text-xs bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-semibold">
                                    #{idx + 1}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                                  <div className="bg-white rounded p-1.5">
                                    <div className="text-xs text-gray-500 mb-0.5">Units</div>
                                    <div className="text-xs font-semibold text-gray-900">
                                      {collateral.units.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="bg-white rounded p-1.5">
                                    <div className="text-xs text-gray-500 mb-0.5">NAV</div>
                                    <div className="text-xs font-semibold text-gray-900">
                                      {formatCurrency(collateral.nav)}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-1.5 pt-1.5 border-t border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 font-medium">Total Value:</span>
                                    <span className="text-xs font-bold text-indigo-600">
                                      {formatCurrency(collateral.units * collateral.nav)}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                  Added: {formatDate(collateral.createdAt)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {hoveredLoanId === loan.id && collaterals.length === 0 && (
                        <div className="absolute z-50 left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 p-3">
                          <div className="text-center">
                            <svg className="mx-auto h-6 w-6 text-gray-400 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-xs text-gray-600 font-medium">No collateral added</p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-purple-600">
                        {loan.interestRate}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{loan.tenure} months</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(loan.createdAt)}</div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No approved loans found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ApprovedLoans;
