import React from 'react';
import { Doctor } from '../types';
import { X, Award, GraduationCap, Calendar, Clock, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (dept: string, doctorName: string) => void;
  language: 'en' | 'hi';
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookAppointment,
  language,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with Doctor Picture & Bio */}
        <div className="bg-blue-900 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/80 px-2.5 py-0.5 rounded-full inline-block">
                {doctor.speciality}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{doctor.name}</h3>
              <p className="text-xs text-blue-200">{doctor.qualification}</p>
              <div className="text-xs text-blue-100 flex items-center justify-center sm:justify-start space-x-3 pt-1">
                <span>⭐ 4.9 Rating</span>
                <span>• {doctor.experienceYears}+ Years Exp.</span>
                <span>• OPD: ₹{doctor.opdFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Bio */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Clinical Overview</h4>
            <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
          </div>

          {/* Education & Qualifications */}
          {doctor.education && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Education & Medical Training</span>
              </h4>
              <ul className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Achievements */}
          {doctor.achievements && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Clinical Milestones & Expertise</span>
              </h4>
              <ul className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {doctor.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* OPD Timings */}
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
            <div className="font-bold text-blue-900 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>OPD Consultation Schedule:</span>
            </div>
            <div className="text-blue-800 font-semibold">{doctor.timing} ({doctor.availableDays})</div>
            <div className="text-slate-600">Location: Nexa Hospital, Awadh Vihar Colony, Gomti Nagar, Lucknow</div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onBookAppointment(doctor.speciality, doctor.name);
            }}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book OPD Appointment (₹{doctor.opdFee})</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
