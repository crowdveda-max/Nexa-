import React from 'react';
import { INSURANCE_PARTNERS, HOSPITAL_INFO } from '../data/hospitalData';
import { ShieldCheck, Phone, CheckCircle, FileText, FileCheck } from 'lucide-react';

interface InsuranceSectionProps {
  onOpenAyushmanChecker?: () => void;
  language: 'en' | 'hi';
}

export const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  onOpenAyushmanChecker,
  language,
}) => {
  return (
    <section id="insurance" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Cashless & Empaneled Partners' : 'कैशलेस बीमा एवं आयुष्मान भारत केंद्र'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? '100% Cashless Hospitalization & Ayushman Desk' : 'कैशलेस इलाज एवं टीपीए बीमा सुविधाएं'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Focus on recovery while our dedicated 24x7 TPA desk coordinates pre-authorizations, insurance claims, and paperless cashless settlements with all major insurers.'
              : 'पैसे की चिंता किए बिना बेहतर इलाज पाएं। हमारा 24 घंटे कार्यरत टीपीए डेस्क आयुष्मान भारत और सभी प्रमुख निजी बीमा कंपनियों के साथ क्लेम की प्रक्रिया सरल बनाता है।'}
          </p>
        </div>

        {/* Highlight Card for Ayushman Bharat & Govt Schemes */}
        <div className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-blue-600 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full">
                Pradhan Mantri Jan Arogya Yojana (PM-JAY)
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Ayushman Bharat Golden Card Holders: Cashless Treatment up to ₹5,00,000
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Nexa Hospital Gomti Nagar provides seamless treatment under the Ayushman Bharat scheme for general surgeries, trauma emergencies, maternity care, and pediatric admissions. Bring your Ayushman Golden Card and Aadhaar Card.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-800 pt-1">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Zero Cash Outflow</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Medicine & Bed Included</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Fast Desk Verification</span>
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-blue-200 text-center space-y-3 shadow-xs">
              <div className="text-xs font-bold text-slate-700">
                Need Help with Ayushman Card?
              </div>
              <p className="text-[11px] text-slate-500">
                Check card eligibility online or contact our Hospital Ayushman Mitra directly.
              </p>
              {onOpenAyushmanChecker && (
                <button
                  onClick={onOpenAyushmanChecker}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Check Ayushman Card Online</span>
                </button>
              )}
              <a
                href={`tel:${HOSPITAL_INFO.contact.phone}`}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-200 block cursor-pointer active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call TPA Helpdesk: 092649 71232</span>
              </a>
            </div>
          </div>
        </div>

        {/* Private & Corporate Insurance Partners Grid */}
        <div className="space-y-4">
          <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Empaneled TPAs & Health Insurers:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INSURANCE_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all shadow-xs space-y-2"
              >
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  {partner.tag}
                </span>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {partner.name}
                </div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  {partner.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist for Cashless Admission */}
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-2 font-semibold text-slate-900">
            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Required for Admission: Health Insurance e-Card + Patient Aadhaar Card + PAN Card of Proposer.</span>
          </div>
          <span className="text-blue-700 font-bold shrink-0">
            24/7 Desk: 092649 71232
          </span>
        </div>
      </div>
    </section>
  );
};
