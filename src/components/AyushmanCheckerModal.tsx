import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, MessageCircle, Phone, FileCheck } from 'lucide-react';
import { INSURANCE_PARTNERS, HOSPITAL_INFO } from '../data/hospitalData';

interface AyushmanCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const AyushmanCheckerModal: React.FC<AyushmanCheckerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [selectedScheme, setSelectedScheme] = useState<string>(INSURANCE_PARTNERS[0].name);
  const [patientName, setPatientName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [procedure, setProcedure] = useState('Gallbladder / Surgery / Maternity');
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    setVerified(true);
  };

  const handleReset = () => {
    setVerified(false);
    setPatientName('');
    setCardNumber('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-800 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {language === 'en' ? 'Ayushman & Cashless TPA Checker' : 'आयुष्मान भारत एवं कैशलेस बीमा जांच'}
              </h3>
              <p className="text-xs text-blue-200">
                24x7 Dedicated TPA Pre-Authorization Desk • Nexa Hospital
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {verified ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                Scheme Empaneled & Eligible!
              </h4>
              <p className="text-xs text-slate-600">
                <strong>{selectedScheme}</strong> is officially empaneled at Nexa Hospital Gomti Nagar Lucknow for 100% cashless hospitalization under standard guidelines.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
                <div className="font-bold text-slate-900">Required Documents Checklist:</div>
                <ul className="space-y-1 text-slate-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ayushman Golden Card (PM-JAY) or TPA Health Insurance e-Card</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Patient Original Aadhaar Card & 2 photocopies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Previous doctor prescription, ultrasound or MRI reports</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.contact.whatsapp}?text=${encodeURIComponent(
                    `Namaste Nexa TPA Desk, I want to verify cashless pre-authorization for patient ${patientName} under ${selectedScheme} for ${procedure}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with TPA Officer on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 border border-slate-300 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Insurance Scheme or Card *
                </label>
                <select
                  value={selectedScheme}
                  onChange={(e) => setSelectedScheme(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                >
                  {INSURANCE_PARTNERS.map((ins, i) => (
                    <option key={i} value={ins.name}>
                      {ins.name} ({ins.tag})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Card / Policy No. (Optional)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="PM-JAY ID or Policy number"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Planned Treatment
                  </label>
                  <select
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                  >
                    <option value="Gallbladder / Hernia Laparoscopy">Gallbladder / Hernia Laparoscopy</option>
                    <option value="Maternity / C-Section / Normal Delivery">Maternity Delivery (C-Section/Normal)</option>
                    <option value="Orthopedic Fracture / Joint Replacement">Orthopedic / Knee Replacement</option>
                    <option value="ICU / Dengue / Critical Care">ICU / Dengue / General Medicine</option>
                    <option value="Appendix / General Surgery">Appendix / General Surgery</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start space-x-2">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Our TPA desk processes cashless pre-authorizations within 30 minutes of emergency admission.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Check Cashless Eligibility & Process
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
