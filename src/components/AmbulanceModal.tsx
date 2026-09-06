import React, { useState } from 'react';
import { Ambulance, Phone, MapPin, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const AmbulanceModal: React.FC<AmbulanceModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [emergencyType, setEmergencyType] = useState('Accident / Trauma Injury');
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupAddress || !callerPhone) return;
    setDispatched(true);
  };

  const handleReset = () => {
    setDispatched(false);
    setPickupAddress('');
    setCallerPhone('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-rose-200 overflow-hidden">
        {/* Header */}
        <div className="bg-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-600 rounded-xl animate-pulse">
              <Ambulance className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                24x7 Ambulance Dispatch
              </h3>
              <p className="text-xs text-rose-200">
                Nexa Hospital, Gomti Nagar, Lucknow
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-rose-200 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Call Now Direct Button */}
        <div className="p-4 bg-rose-50 border-b border-rose-100 text-center space-y-2">
          <div className="text-xs font-bold text-rose-900">
            For critical, life-threatening crisis, call immediately:
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.contact.phone}`}
            id="ambulance-direct-call-btn"
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>Direct Dial: {HOSPITAL_INFO.contact.phoneDisplay}</span>
          </a>
        </div>

        {dispatched ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900">
                Ambulance Request Received!
              </h4>
              <p className="text-xs text-slate-600">
                Our emergency trauma dispatch coordinator is calling your number{' '}
                <span className="font-bold text-slate-900">{callerPhone}</span> to confirm live GPS location.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-1">
              <div><strong>Pickup Location:</strong> {pickupAddress}</div>
              <div><strong>Emergency Condition:</strong> {emergencyType}</div>
              <div><strong>Hospital Base:</strong> Awadh Vihar Colony, Gomti Nagar, Lucknow</div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="p-6 space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Exact Patient Location / Colony *</span>
              </label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="e.g. Near Manoj Pandey Chauraha, Gomti Nagar"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                <span>Contact Phone Number *</span>
              </label>
              <input
                type="tel"
                required
                value={callerPhone}
                onChange={(e) => setCallerPhone(e.target.value)}
                placeholder="e.g. 092649 71232"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Nature of Emergency
              </label>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              >
                <option value="Accident / Trauma Injury">Road Accident / Bone Fracture</option>
                <option value="Severe Chest Pain / Heart Attack">Severe Chest Pain / Heart Attack</option>
                <option value="Acute Breathlessness">Acute Breathlessness / Oxygen Drop</option>
                <option value="Maternity / Labor Pains">Maternity / Emergency Labor Pain</option>
                <option value="Stroke / Unconsciousness">Stroke / Paralysis / Unconscious</option>
                <option value="High Infant Fever / Seizures">High Infant Fever / Child Seizures</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer active:scale-95"
            >
              Request Ambulance Dispatch
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
