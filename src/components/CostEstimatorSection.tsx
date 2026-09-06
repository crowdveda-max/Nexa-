import React, { useState } from 'react';
import { PROCEDURE_COSTS, HOSPITAL_INFO } from '../data/hospitalData';
import { Calculator, CheckCircle2, ShieldCheck, Clock, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

interface CostEstimatorSectionProps {
  onOpenAppointment: (dept?: string) => void;
  language: 'en' | 'hi';
}

export const CostEstimatorSection: React.FC<CostEstimatorSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(PROCEDURE_COSTS[0].id);
  const selectedProcedure = PROCEDURE_COSTS.find((p) => p.id === selectedProcedureId) || PROCEDURE_COSTS[0];

  return (
    <section id="cost-estimator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Transparent Healthcare Pricing' : 'पारदर्शी उपचार एवं सर्जरी खर्च कैलकुलेटर'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Treatment Cost & Surgery Estimator' : 'सर्जरी एवं उपचार खर्च का अनुमान लगाएं'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Clear, honest pricing with zero hidden charges. Fully covered under Ayushman Bharat (PM-JAY) and major cashless insurance TPAs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Procedure Selection Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Surgery / Procedure:
            </label>
            <div className="space-y-2">
              {PROCEDURE_COSTS.map((proc) => {
                const isSelected = proc.id === selectedProcedureId;
                return (
                  <button
                    key={proc.id}
                    onClick={() => setSelectedProcedureId(proc.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'en' ? proc.name : proc.nameHi}
                      </div>
                      <div className={`text-xs mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                        {proc.estimatedCostRange}
                      </div>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 text-blue-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Procedure Details Card */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  {selectedProcedure.department}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {language === 'en' ? selectedProcedure.name : selectedProcedure.nameHi}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {selectedProcedure.description}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center sm:text-right shrink-0">
                <div className="text-xs text-slate-500 font-semibold">Estimated Package Range</div>
                <div className="text-2xl font-black text-blue-700">{selectedProcedure.estimatedCostRange}</div>
                <div className="text-[11px] text-emerald-600 font-bold">100% Cashless for Ayushman / TPA</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Procedure Duration</span>
                <span className="font-bold text-slate-900">{selectedProcedure.duration}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Hospital Stay</span>
                <span className="font-bold text-slate-900">{selectedProcedure.hospitalStay}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Ayushman Card</span>
                <span className="font-bold text-emerald-600 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Eligible (Free)</span>
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium">Cashless Insurance</span>
                <span className="font-bold text-blue-600">All TPAs Accepted</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Package Inclusions & Hospital Protocol:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProcedure.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenAppointment(selectedProcedure.department)}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Specialist Consultation</span>
              </button>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste Nexa Hospital, I would like to get a detailed quotation and insurance cashless estimate for: ${selectedProcedure.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Quotation on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
