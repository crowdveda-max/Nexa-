import React from 'react';
import { DOCTOR_OPD_SCHEDULE } from '../data/hospitalData';
import { Calendar, Clock, Phone, Stethoscope } from 'lucide-react';

interface DoctorScheduleSectionProps {
  onOpenAppointment: (dept?: string, doctor?: string) => void;
  language: 'en' | 'hi';
}

export const DoctorScheduleSection: React.FC<DoctorScheduleSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  return (
    <section id="opd-schedule" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Weekly OPD Timetable' : 'साप्ताहिक डॉक्टर ओपीडी समय सारिणी'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Doctor Availability & OPD Schedule' : 'विशेषज्ञ डॉक्टरों के मिलने का समय'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Check daily OPD shifts for all clinical specialists at Nexa Hospital, Gomti Nagar. Emergency & Trauma consultants are on duty 24 Hours.
          </p>
        </div>

        {/* Schedule Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-blue-900 text-white font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Specialist Doctor</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Mon - Fri Timings</th>
                  <th className="p-4">Saturday</th>
                  <th className="p-4">Sunday</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {DOCTOR_OPD_SCHEDULE.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{doc.doctorName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{doc.speciality}</td>
                    <td className="p-4 text-slate-800 font-semibold">{doc.mon}</td>
                    <td className="p-4 text-slate-700">{doc.sat}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {doc.sun}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onOpenAppointment(doc.speciality, doc.doctorName)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        Book Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            Note: 24x7 Casualty Medical Officer (CMO) and ICU intensivists are always available for walk-in acute emergencies.
          </div>
        </div>
      </div>
    </section>
  );
};
