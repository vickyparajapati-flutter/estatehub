import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, PieChart, ShieldCheck } from 'lucide-react';

export default function EmiCalculator({ defaultPrice = 8500000 }) {
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const downPaymentAmount = (propertyPrice * downPaymentPct) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;

  // Monthly EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  let monthlyEmi = 0;
  if (monthlyRate > 0 && totalMonths > 0 && loanPrincipal > 0) {
    monthlyEmi = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                 (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalAmountPayable = monthlyEmi * totalMonths;
  const totalInterestPayable = Math.max(0, totalAmountPayable - loanPrincipal);

  const principalPct = totalAmountPayable > 0 ? (loanPrincipal / totalAmountPayable) * 100 : 50;
  const interestPct = 100 - principalPct;

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakhs`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" /> Home Loan & EMI Calculator
          </h3>
          <p className="text-xs text-slate-500">Estimate your monthly mortgage payments with current bank rates.</p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Best Rates (8.40% - 8.75%)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Sliders Input Column */}
        <div className="space-y-5">
          
          {/* Property Price Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Property Price:</span>
              <span className="text-blue-600 text-sm font-extrabold">{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={2000000}
              max={50000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Down Payment ({downPaymentPct}%):</span>
              <span className="text-slate-900">{formatCurrency(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Interest Rate (% p.a.):</span>
              <span className="text-slate-900">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={6.5}
              max={14.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Loan Tenure:</span>
              <span className="text-slate-900">{tenureYears} Years ({totalMonths} Months)</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* EMI Result Summary Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-6 shadow-xl border border-slate-800">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Monthly EMI Payable</span>
            <div className="text-3xl sm:text-4xl font-black text-blue-400">
              ₹{Math.round(monthlyEmi).toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-400">/ mo</span>
            </div>
          </div>

          {/* Progress bar split */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>Principal: {formatCurrency(loanPrincipal)}</span>
              <span>Interest: {formatCurrency(totalInterestPayable)}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${principalPct}%` }} />
              <div className="h-full bg-indigo-400" style={{ width: `${interestPct}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Loan Amount</span>
              <span className="font-extrabold text-white">{formatCurrency(loanPrincipal)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Payable</span>
              <span className="font-extrabold text-white">{formatCurrency(totalAmountPayable)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
