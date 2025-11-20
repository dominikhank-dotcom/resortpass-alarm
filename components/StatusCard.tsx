import React from 'react';
import { AvailabilityStatus } from '../types';
import { Loader2, CheckCircle, XCircle, Coins } from 'lucide-react';

interface StatusCardProps {
  status: AvailabilityStatus;
  lastChecked: Date;
  loading: boolean;
  productName: string;
  productUrl: string;
  variant: 'gold' | 'silver';
  onCheckNow: () => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({ 
  status, 
  lastChecked, 
  loading, 
  productName, 
  productUrl, 
  variant,
  onCheckNow 
}) => {
  // Styling based on variant
  // Hintergrund wieder weiß, aber Border Farbe bleibt zur Unterscheidung
  const bgClass = variant === 'gold' ? 'bg-white border-yellow-200' : 'bg-white border-slate-200';
  const titleColor = variant === 'gold' ? 'text-yellow-800' : 'text-slate-700';
  const iconColor = variant === 'gold' ? 'text-yellow-500' : 'text-slate-400';
  
  return (
    <div className={`${bgClass} overflow-hidden shadow rounded-lg border flex flex-col h-full transition-all duration-300`}>
      <div className="px-4 py-5 sm:p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className={`h-6 w-6 ${iconColor}`} />
            <h3 className={`text-lg leading-6 font-bold ${titleColor}`}>{productName}</h3>
          </div>
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            {lastChecked.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {loading ? (
            <Loader2 className={`h-16 w-16 animate-spin ${variant === 'gold' ? 'text-yellow-600' : 'text-slate-600'}`} />
          ) : status === AvailabilityStatus.AVAILABLE ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 drop-shadow-sm" />
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">VERFÜGBAR!</p>
                <p className="text-sm text-gray-600 mt-1">Schnell zugreifen im Ticket-Shop.</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-ep-red opacity-80" />
              <div className="text-center">
                <p className="text-2xl font-bold text-ep-red">AUSVERKAUFT</p>
                <p className="text-sm text-gray-600 mt-1">Momentan keine Kontingente.</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={onCheckNow}
            disabled={loading}
            className={`w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 shadow-sm ${
                variant === 'gold' 
                ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' 
                : 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500'
            }`}
          >
            {loading ? 'Prüfe...' : 'Manuell prüfen'}
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-100">
        <div className="text-sm text-gray-500 text-center">
          <a href={productUrl} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline flex items-center justify-center gap-1 ${titleColor}`}>
            Zum Europa-Park Shop <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};