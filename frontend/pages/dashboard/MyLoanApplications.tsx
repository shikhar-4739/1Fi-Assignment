"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserLoanApplications } from '@/lib/api';
import { getStatusColor } from '@/lib/constants';
import { loanApplicationData } from '@/types/interface';

const MyLoanApplications = () => {
  const [loanApplications, setLoanApplications] = useState<loanApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [hoveredCollateral, setHoveredCollateral] = useState<string | null>(null);

  useEffect(() => {
    fetchMyLoanApplications();
  }, []);

  const fetchMyLoanApplications = async () => {
    try {
      setLoading(true);
      const data = await getUserLoanApplications();
      setLoanApplications(data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your loan applications');
    } finally {
      setLoading(false);
    }
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

  const filteredApplications = loanApplications.filter((app) => {
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesStatus;
  });

  const statusCounts = {
    total: loanApplications.length,
    pending: loanApplications.filter(app => app.status.toLowerCase() === 'pending').length,
    approved: loanApplications.filter(app => app.status.toLowerCase() === 'approved').length,
    rejected: loanApplications.filter(app => app.status.toLowerCase() === 'rejected').length,
  };

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
          onClick={fetchMyLoanApplications}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredApplications.length} of {loanApplications.length} applications
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="disbursed">Disbursed</option>
          </select>
        </div>
      </motion.div>

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
                  Application ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Loan Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tenure
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Collateral
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Applied Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {app.id.substring(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {app.product.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      LTV: {app.product.ltv}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-blue-600">
                      {formatCurrency(app.loanAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {app.tenure} months
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-purple-600">
                      {app.product.interestRate}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap relative">
                    {app.collaterals && app.collaterals.length > 0 ? (
                      <div
                        onMouseEnter={() => setHoveredCollateral(app.id)}
                        onMouseLeave={() => setHoveredCollateral(null)}
                        className="relative cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          {app.collaterals.length} Item{app.collaterals.length > 1 ? 's' : ''}
                        </div>

                        {/* Collateral Popup */}
                        <AnimatePresence>
                          {hoveredCollateral === app.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 10 }}
                              className="absolute z-50 left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4"
                            >
                              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Collateral Details
                              </h4>
                              <div className="space-y-3 max-h-64 overflow-y-auto">
                                {app.collaterals.map((collateral, idx) => (
                                  <div key={collateral.id} className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-semibold text-indigo-600">#{idx + 1}</span>
                                      <span className="text-xs text-gray-500">{formatDate(collateral.createdAt)}</span>
                                    </div>
                                    <div className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-600">Fund Name</p>
                                        <p className="text-sm font-semibold text-gray-900">{collateral.fundName}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">ISIN</p>
                                        <p className="text-sm font-mono text-gray-900">{collateral.isin}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <p className="text-xs text-gray-600">Units</p>
                                          <p className="text-sm font-semibold text-gray-900">{collateral.units}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600">NAV</p>
                                          <p className="text-sm font-semibold text-green-600">{formatCurrency(collateral.nav)}</p>
                                        </div>
                                      </div>
                                      <div className="pt-2 border-t border-indigo-200">
                                        <p className="text-xs text-gray-600">Total Value</p>
                                        <p className="text-base font-bold text-indigo-600">
                                          {formatCurrency(collateral.units * collateral.nav)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No collateral</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(app.createdAt)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterStatus !== 'all' 
                ? 'Try adjusting your filter or create a new application.'
                : 'You haven\'t submitted any loan applications yet.'}
            </p>
            <button
              onClick={() => window.location.href = '/dashboard/new-application'}
              className="mt-4 px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Create New Application
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyLoanApplications;
