import React from 'react';
import { HEALTH_PACKAGES } from '../data/hospitalData';
import { ShieldCheck, Check, Sparkles, Calendar, ArrowRight, Tag } from 'lucide-react';

interface HealthPackagesSectionProps {
  onOpenAppointment: (department?: string, doctor?: string) => void;
  language: 'en' | 'hi';
}

export const HealthPackagesSection: React.FC<HealthPackagesSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  return (
    <section id="packages" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Preventive Health Packages' : 'किफायती संपूर्ण स्वास्थ्य जांच'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Affordable Preventive Health Checkups' : 'नेक्सा संपूर्ण स्वास्थ्य सुरक्षा पैकेज'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Early diagnosis saves lives and prevents heavy hospital bills. Avail up to 55% discount on comprehensive preventive diagnostic profiles with doctor consultation.'
              : 'समय पर जांच से गंभीर बीमारियों से बचाव संभव है। 55% तक की विशेष छूट के साथ विशेषज्ञ डॉक्टर के परामर्श सहित संपूर्ण चेकअप।'}
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl bg-white border flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                pkg.popular
                  ? 'border-blue-600 shadow-xl shadow-blue-100 ring-2 ring-blue-500/20'
                  : 'border-slate-200 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Popular Flag */}
              {pkg.popular && (
                <div className="bg-blue-600 text-white text-[11px] font-bold uppercase text-center py-1 tracking-wider">
                  ★ Most Recommended in Lucknow
                </div>
              )}

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {pkg.idealFor}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2.5">
                    {language === 'en' ? pkg.title : pkg.titleHi}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-blue-700">
                      ₹{pkg.discountedPrice}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-2">
                      ₹{pkg.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Save {Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Key Tests Included */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900">
                    Includes {pkg.testsCount}+ Parameters:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.testsList.map((test, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onOpenAppointment(`Health Package: ${pkg.title}`)}
                  id={`book-pkg-${pkg.id}`}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Home Sample Collection Banner */}
        <div className="mt-10 bg-blue-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800 shadow-lg">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Need Blood Sample Collection at Home in Lucknow?</span>
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 font-light">
              Our phlebotomist visits Gomti Nagar, Malhaur, Chinhat, and nearby areas with hygienic vacuum containers.
            </p>
          </div>
          <a
            href="tel:09264971232"
            className="shrink-0 px-6 py-3 bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
          >
            Call: 092649 71232
          </a>
        </div>
      </div>
    </section>
  );
};
