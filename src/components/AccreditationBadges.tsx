import React from 'react';
import { ACCREDITATIONS } from '../data/hospitalData';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface AccreditationBadgesProps {
  language: 'en' | 'hi';
}

export const AccreditationBadges: React.FC<AccreditationBadgesProps> = ({
  language,
}) => {
  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Trust & Clinical Accreditations
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Certified Quality Standards & Safety Accreditations
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {ACCREDITATIONS.map((acc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-2 hover:border-blue-300 hover:shadow-xs transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-slate-900 line-clamp-1">{acc.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{acc.title}</div>
              </div>
              <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {acc.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
