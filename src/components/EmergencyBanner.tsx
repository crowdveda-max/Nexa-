import React from 'react';
import { Phone, Ambulance, AlertCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface EmergencyBannerProps {
  onOpenAmbulance: () => void;
  onOpenAppointment: () => void;
  language: 'en' | 'hi';
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  onOpenAmbulance,
  onOpenAppointment,
  language,
}) => {
  return (
    <section id="emergency" className="relative bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-blue-800/40 shadow-2xl relative overflow-hidden">
          {/* Subtle emergency ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                <span>24x7 Rapid Emergency & Trauma Response</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {language === 'en' ? (
                  <>Medical Emergency? Call Nexa Hospital Trauma Desk</>
                ) : (
                  <>आपातकालीन स्थिति में तुरंत नेक्सा ट्रॉमा डेस्क पर संपर्क करें</>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {language === 'en'
                  ? 'Our emergency trauma team is stationed 24 hours in Gomti Nagar, Lucknow with zero-waiting casualty triage, advanced life support (ALS) ambulances, on-duty surgeons, and critical care ICU beds.'
                  : 'हमारी इमरजेंसी टीम गोमती नगर, लखनऊ में 24 घंटे वेंटिलेटर, एम्बुलेंस, आईसीयू और विशेषज्ञ सर्जनों के साथ हर पल तैयार है। सड़क दुर्घटना, दिल का दौरा, तेज सांस फूलना या तीव्र दर्द में तुरंत कॉल करें।'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>24 Hours Open</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Equipped ICU & Modular OT</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Zero Delay Protocol</span>
                </span>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={`tel:${HOSPITAL_INFO.contact.phone}`}
                id="emergency-call-now-btn"
                className="w-full py-3.5 px-5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-center shadow-lg shadow-rose-900/40 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-rose-200">24/7 Trauma Helpline</div>
                  <div className="text-base font-extrabold">{HOSPITAL_INFO.contact.phoneDisplay}</div>
                </div>
              </a>

              <button
                onClick={onOpenAmbulance}
                id="emergency-dispatch-btn"
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Ambulance className="w-4 h-4 text-amber-400" />
                <span>{language === 'en' ? 'Dispatch Nexa Ambulance' : 'नेक्सा एम्बुलेंस भेजें'}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
