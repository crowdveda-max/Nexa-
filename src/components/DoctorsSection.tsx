import React, { useState } from 'react';
import { DOCTORS } from '../data/hospitalData';
import { Doctor } from '../types';
import { Calendar, Clock, Award, CheckCircle2, Stethoscope, Search, UserCheck } from 'lucide-react';

interface DoctorsSectionProps {
  onOpenAppointment: (department?: string, doctor?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  language: 'en' | 'hi';
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onOpenAppointment,
  onSelectDoctor,
  language,
}) => {
  const [filterSpeciality, setFilterSpeciality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Surgeon', 'Gynecologist', 'Orthopedic', 'Physician', 'Pediatrician'];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesCategory =
      filterSpeciality === 'All' ||
      doc.speciality.toLowerCase().includes(filterSpeciality.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      doc.name.toLowerCase().includes(query) ||
      doc.speciality.toLowerCase().includes(query) ||
      doc.bio.toLowerCase().includes(query) ||
      doc.qualification.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="doctors" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Our Medical Specialists' : 'वरिष्ठ विशेषज्ञ चिकित्सक'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Meet Our Senior Consultants & Surgeons' : 'हमारे अनुभवी डॉक्टर एवं सर्जन'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Decades of clinical excellence from top medical institutes, committed to ethical, transparent, and patient-first healthcare in Lucknow.'
              : 'लखनऊ और उत्तर प्रदेश के प्रमुख चिकित्सा संस्थानों से प्रशिक्षित, समर्पित एवं अनुभवी डॉक्टर।'}
          </p>

          {/* Search & Category Filter Controls */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor by name, surgery, or ailment..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-xs"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterSpeciality(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filterSpeciality === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? (language === 'en' ? 'All Doctors' : 'सभी डॉक्टर') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Card Top Banner & Avatar */}
                <div className="p-6 pb-4 flex items-start space-x-4 border-b border-slate-200 bg-white">
                  <div className="relative shrink-0">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <span
                      className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white"
                      title="Active Consultant"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {doc.speciality}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 truncate">
                      {doc.qualification}
                    </p>
                    <div className="mt-1 flex items-center space-x-1 text-xs text-amber-700 font-bold">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{doc.experienceYears}+ Years Experience</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Details & Timings */}
                <div className="p-6 pt-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900">Days:</span>
                      <span className="text-slate-600">{doc.availableDays}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900">OPD:</span>
                      <span className="text-slate-600 truncate">{doc.timing}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900">Languages:</span>
                      <span className="text-slate-600">{doc.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Fee & Booking Button */}
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">OPD Fee</span>
                  <span className="text-base font-extrabold text-slate-900">₹{doc.opdFee}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => onOpenAppointment(doc.speciality, doc.name)}
                    id={`book-doctor-${doc.id}`}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-200 flex items-center space-x-1 transition-all cursor-pointer active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
