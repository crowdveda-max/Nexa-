import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, Calendar, User, Phone, MapPin, Printer } from 'lucide-react';
import { Appointment } from '../types';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AppointmentTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const AppointmentTrackerModal: React.FC<AppointmentTrackerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await fetch(`/api/appointment-status/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();

      if (data.success && data.appointment) {
        setResult(data.appointment);
      } else {
        setErrorMsg(data.message || 'No appointment found with this Token ID or Phone.');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setErrorMsg('Failed to fetch appointment status. Please check your internet or call 092649 71232.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-800 rounded-xl">
              <Search className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {language === 'en' ? 'Track Appointment Status' : 'अपॉइंटमेंट स्टेटस एवं टोकन पर्ची'}
              </h3>
              <p className="text-xs text-blue-200">
                Nexa Hospital, Gomti Nagar • Helpline: 092649 71232
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Enter your Token ID (e.g. NXA-884219) or Registered Mobile Number:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Token ID or 10-digit Phone..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {loading ? 'Searching...' : 'Check Status'}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {result && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {result.status}
                  </span>
                </div>
                <div className="text-sm font-black text-blue-900">
                  Token: {result.id}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-bold text-slate-900">{result.patientName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-bold text-blue-700">{result.department}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Doctor on Duty:</span>
                  <span className="font-bold text-slate-900">{result.doctor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Appointment Date:</span>
                  <span className="font-bold text-slate-900">{result.preferredDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Time Slot:</span>
                  <span className="font-bold text-slate-900">{result.preferredTime}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Registered Phone:</span>
                  <span className="font-bold text-slate-900">{result.phone}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <div className="font-bold">Reporting Instructions:</div>
                <p>• Awadh Vihar Colony, Gomti Nagar, Lucknow (Near Malhaur Station)</p>
                <p>• Please carry previous medical records & reach 15 minutes before slot.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print OPD Slip</span>
                </button>
                <a
                  href={`tel:${HOSPITAL_INFO.contact.phone}`}
                  className="py-2.5 px-4 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Reception</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
