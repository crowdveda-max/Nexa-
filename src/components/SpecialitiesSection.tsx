import React, { useState } from 'react';
import { SPECIALITIES } from '../data/hospitalData';
import {
  Ambulance,
  Activity,
  HeartPulse,
  Baby,
  Bone,
  Heart,
  ShieldAlert,
  Microscope,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';

interface SpecialitiesSectionProps {
  onOpenAppointment: (department?: string) => void;
  language: 'en' | 'hi';
}

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  const [activeDepartment, setActiveDepartment] = useState<string>(SPECIALITIES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className="w-5 h-5 text-rose-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-pink-600" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-cyan-600" />;
      case 'Bone':
        return <Bone className="w-5 h-5 text-amber-600" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case 'Microscope':
        return <Microscope className="w-5 h-5 text-blue-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
    }
  };

  const currentSpeciality = SPECIALITIES.find((s) => s.id === activeDepartment) || SPECIALITIES[0];

  return (
    <section id="specialities" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Clinical Excellence' : 'उच्च स्तरीय चिकित्सा विभाग'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Our Specialties & Departments' : 'नेक्सा हॉस्पिटल के मुख्य चिकित्सा विभाग'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Providing comprehensive surgical, maternal, pediatric, trauma, and inpatient facilities under experienced medical super-specialists in Lucknow.'
              : 'अनुभवी चिकित्सकों और आधुनिक चिकित्सा उपकरणों के साथ सभी प्रमुख बीमारियों का विश्वसनीय व संपूर्ण इलाज।'}
          </p>
        </div>

        {/* Department Interactive Grid / Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {SPECIALITIES.map((spec) => {
            const isSelected = spec.id === activeDepartment;
            return (
              <button
                key={spec.id}
                onClick={() => setActiveDepartment(spec.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex items-center space-x-3 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-2xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {getIcon(spec.iconName)}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'en' ? spec.title : spec.titleHi}
                  </div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {spec.headDoctor}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Speciality Detail Showcase */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600">
                  {getIcon(currentSpeciality.iconName)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {language === 'en' ? currentSpeciality.title : currentSpeciality.titleHi}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-700 font-semibold">
                    Head Specialist: {currentSpeciality.headDoctor}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {language === 'en' ? currentSpeciality.description : currentSpeciality.descriptionHi}
              </p>

              {/* Common Symptoms / Indications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'en' ? 'Common Symptoms & Conditions Treated:' : 'प्रमुख लक्षण एवं बीमारियाँ:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentSpeciality.commonSymptoms.map((sym, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium"
                    >
                      • {sym}
                    </span>
                  ))}
                </div>
              </div>

              {/* Procedures & Services */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'en' ? 'Key Clinical Services & Procedures:' : 'उपलब्ध चिकित्सा सुविधाएं व प्रक्रियाएं:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentSpeciality.services.map((srv, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Quick Booking for this department */}
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 shadow-2xs">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase">
                  Direct OPD Booking
                </span>
                <h4 className="text-base font-extrabold text-slate-900 pt-1">
                  Consult {currentSpeciality.title}
                </h4>
                <p className="text-xs text-slate-500">
                  Morning & Evening slots available with Senior Specialist.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex justify-between py-1">
                  <span>Consultation Fee:</span>
                  <span className="font-bold text-slate-900">₹500 - ₹600</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Emergency Casualty:</span>
                  <span className="font-bold text-rose-600">Open 24 Hours</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Cashless / Ayushman:</span>
                  <span className="font-bold text-emerald-600">Supported</span>
                </div>
              </div>

              <button
                onClick={() => onOpenAppointment(currentSpeciality.title)}
                id={`book-speciality-${currentSpeciality.id}`}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
