import React from 'react';
import { Phone, MessageCircle, Calendar, Bot, Ambulance } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface StickyEmergencyBarProps {
  onOpenAppointment: () => void;
  onOpenAiSahayak: () => void;
  onOpenAmbulance: () => void;
  language: 'en' | 'hi';
}

export const StickyEmergencyBar: React.FC<StickyEmergencyBarProps> = ({
  onOpenAppointment,
  onOpenAiSahayak,
  onOpenAmbulance,
  language,
}) => {
  return (
    <aside aria-label="Quick Hospital Actions" className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl p-2.5 sm:hidden">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Call Now */}
        <a
          href={`tel:${HOSPITAL_INFO.contact.phone}`}
          id="mobile-sticky-call"
          className="py-2.5 px-1 bg-rose-600 active:bg-rose-700 text-white rounded-xl flex flex-col items-center justify-center space-y-0.5 shadow-xs"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] font-bold leading-none">Call 24x7</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/919264971232?text=${encodeURIComponent(
            'Namaste Nexa Hospital, I have an inquiry regarding OPD consultation / emergency services.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-whatsapp"
          className="py-2.5 px-1 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl flex flex-col items-center justify-center space-y-0.5 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold leading-none">WhatsApp</span>
        </a>

        {/* Book OPD */}
        <button
          onClick={onOpenAppointment}
          id="mobile-sticky-book"
          className="py-2.5 px-1 bg-blue-600 active:bg-blue-700 text-white rounded-xl flex flex-col items-center justify-center space-y-0.5 shadow-xs cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] font-bold leading-none">Book OPD</span>
        </button>

        {/* AI Sahayak */}
        <button
          onClick={onOpenAiSahayak}
          id="mobile-sticky-ai"
          className="py-2.5 px-1 bg-blue-900 active:bg-blue-800 text-blue-200 rounded-xl flex flex-col items-center justify-center space-y-0.5 shadow-xs cursor-pointer"
        >
          <Bot className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold leading-none">AI Sahayak</span>
        </button>
      </div>
    </aside>
  );
};
