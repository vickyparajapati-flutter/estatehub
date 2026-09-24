import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  const bgColors = {
    success: 'bg-slate-900 border-emerald-500/40 text-white',
    error: 'bg-slate-900 border-rose-500/40 text-white',
    info: 'bg-slate-900 border-blue-500/40 text-white'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-md">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl ${bgColors[toast.type] || bgColors.success}`}>
        {icons[toast.type] || icons.success}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
      </div>
    </div>
  );
}
