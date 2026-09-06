import React, { useState } from 'react';
import { BED_STATUSES } from '../data/hospitalData';
import { Activity, ShieldAlert, Baby, Bed, CheckCircle, Ambulance, RefreshCw, Clock } from 'lucide-react';

interface BedAvailabilityTrackerProps {
  onOpenAmbulance: () => void;
  language: 'en' | 'hi';
}

export const BedAvailabilityTracker: React.FC<BedAvailabilityTrackerProps> = ({
  onOpenAmbulance,
  language,
}) => {
  const [lastUpdated, setLastUpdated] = useState('2 mins ago');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
    }, 600);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className="w-5 h-5 text-rose-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-blue-600" />;
      case 'Bed':
        return <Bed className="w-5 h-5 text-indigo-600" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="py-10 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>
                {language === 'en' ? 'Live Hospital Capacity Tracker' : 'लाइव बेड एवं आईसीयू उपलब्धता'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight">
              {language === 'en'
                ? 'Real-Time Bed & Emergency Facility Status'
                : 'नेक्सा हॉस्पिटल: बेड, आईसीयू एवं वेंटिलेटर स्थिति'}
            </h3>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Updated: <strong className="text-slate-700">{lastUpdated}</strong></span>
            </span>
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer"
              title="Refresh status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
            <button
              onClick={onOpenAmbulance}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Emergency Admission
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BED_STATUSES.map((bed, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {getIcon(bed.icon)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {bed.status}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {bed.available} <span className="text-xs text-slate-400 font-normal">/ {bed.total}</span>
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1 line-clamp-1">
                {language === 'en' ? bed.category : bed.categoryHi}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                Ready for intake
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
