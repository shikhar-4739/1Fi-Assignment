"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLoanProducts, createLoanApplication, addCollateral, addLoanProduct } from '@/lib/api';
import { getLoanProductData } from '@/types/interface';
import { toast } from 'sonner';
import Step1 from '@/components/new-application/Step1';
import Step2 from '@/components/new-application/Step2';
import Step3 from '@/components/new-application/Step3';
import AdminProductModal from '@/components/new-application/AdminProductModal';
import ApplicationComplete from '@/components/new-application/ApplicationComplete';

const NewApplication = () => {
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<getLoanProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<getLoanProductData | null>(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loanApplicationId, setLoanApplicationId] = useState('');
  
  // Collateral form state
  const [fundName, setFundName] = useState('');
  const [isin, setIsin] = useState('');
  const [units, setUnits] = useState('');
  const [nav, setNav] = useState('');
  const [applicationComplete, setApplicationComplete] = useState(false);

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminProductForm, setShowAdminProductForm] = useState(false);
  
  // Loan Product form state
  const [productName, setProductName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [ltv, setLtv] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    fetchLoanProducts();
    const userRole = localStorage.getItem('role');
    setIsAdmin(userRole === 'ADMIN');
  }, []);

  const fetchLoanProducts = async () => {
    try {
      setLoading(true);
      const data = await getLoanProducts();
      setProducts(data.data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch loan products');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product: getLoanProductData) => {
    setSelectedProduct(product);
    setLoanAmount(product.minAmount.toString());
    setStep(2);
  };

  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedProduct.id) return;

    const amount = parseFloat(loanAmount);
    if (amount < selectedProduct.minAmount || amount > selectedProduct.maxAmount) {
      setError(`Loan amount must be between ₹${selectedProduct.minAmount.toLocaleString()} and ₹${selectedProduct.maxAmount.toLocaleString()}`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const response = await createLoanApplication({
        productId: selectedProduct.id,
        loanAmount: amount,
        tenure: parseInt(tenure)
      });
      setLoanApplicationId(response.data.id);
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Failed to create loan application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCollateralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');
      await addCollateral({
        loanApplicationId,
        fundName,
        isin,
        units: parseFloat(units),
        nav: parseFloat(nav)
      });
      setApplicationComplete(true);
    } catch (err: any) {
      setError(err.message || 'Failed to add collateral');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');
      
      await addLoanProduct({
        name: productName,
        interestRate: parseFloat(interestRate),
        ltv: parseFloat(ltv),
        minAmount: parseFloat(minAmount),
        maxAmount: parseFloat(maxAmount)
      });
            
      setShowAdminProductForm(false);
      setProductName('');
      setInterestRate('');
      setLtv('');
      setMinAmount('');
      setMaxAmount('');
      
      await fetchLoanProducts();
      toast.success('Loan product added successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to add loan product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const calculateEMI = () => {
    if (!selectedProduct || !loanAmount || !tenure) return 0;
    const principal = parseFloat(loanAmount);
    const rate = selectedProduct.interestRate / 100 / 12;
    const months = parseInt(tenure);
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return emi;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (applicationComplete) {
    return <ApplicationComplete loanApplicationId={loanApplicationId} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">New Loan Application</h1>
            <p className="text-blue-100">Complete the application process in simple steps</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowAdminProductForm(true)}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Loan Product
            </button>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-600 hover:text-red-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

      <AdminProductModal
        show={showAdminProductForm}
        onClose={() => setShowAdminProductForm(false)}
        productName={productName}
        setProductName={setProductName}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        ltv={ltv}
        setLtv={setLtv}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
        isSubmitting={isSubmitting}
        onSubmit={handleAdminProductSubmit}
        formatCurrency={formatCurrency}
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1
            products={products}
            onProductSelect={handleProductSelect}
            formatCurrency={formatCurrency}
          />
        )}

        {step === 2 && selectedProduct && (
          <Step2
            selectedProduct={selectedProduct}
            loanAmount={loanAmount}
            setLoanAmount={setLoanAmount}
            tenure={tenure}
            setTenure={setTenure}
            isSubmitting={isSubmitting}
            onSubmit={handleLoanSubmit}
            onBack={() => setStep(1)}
            formatCurrency={formatCurrency}
            calculateEMI={calculateEMI}
          />
        )}

        {step === 3 && (
          <Step3
            fundName={fundName}
            setFundName={setFundName}
            isin={isin}
            setIsin={setIsin}
            units={units}
            setUnits={setUnits}
            nav={nav}
            setNav={setNav}
            isSubmitting={isSubmitting}
            onSubmit={handleCollateralSubmit}
            onBack={() => setStep(2)}
            selectedProduct={selectedProduct}
            loanAmount={loanAmount}
            formatCurrency={formatCurrency}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewApplication;
