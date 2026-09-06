import React from 'react';
import { IMMUNIZATION_SCHEDULE } from '../data/hospitalData';
import { Baby, ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';

interface ImmunizationGuideSectionProps {
  onOpenAppointment: (dept?: string) => void;
  language: 'en' | 'hi';
}

export const ImmunizationGuideSection: React.FC<ImmunizationGuideSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  return (
    <section id="immunization" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Baby className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Child Health & Preventive Care' : 'शिशु एवं बाल टीकाकरण चार्ट'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Complete Child Immunization Schedule' : 'जन्म से 5 वर्ष तक बच्चों का संपूर्ण टीकाकरण'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Supervised by Senior Pediatrician Dr. R. P. Yadav (MD Pediatrics). Cold-chain verified authentic vaccines administered with painless needles in child-friendly environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {IMMUNIZATION_SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-sm font-black text-blue-900">
                    {language === 'en' ? item.ageGroup : item.ageGroupHi}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Essential
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">Vaccines Administered:</div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {item.vaccines.map((v, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="font-semibold text-slate-800">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200">
                  <strong className="text-slate-700">Protects against:</strong> {item.prevents}
                </div>
              </div>

              <div className="pt-4 mt-2">
                <button
                  onClick={() => onOpenAppointment('Pediatrics & Neonatal Care (NICU)')}
                  className="w-full py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs rounded-xl border border-blue-300 transition-colors cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Vaccination Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
