import React, { useState } from 'react';
import { Camera, ShieldCheck, ChevronRight, Eye } from 'lucide-react';

interface VirtualTourSectionProps {
  language: 'en' | 'hi';
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({
  language,
}) => {
  const tourSpots = [
    {
      id: 'emergency-bay',
      title: '24x7 Emergency Trauma & Resuscitation Bay',
      titleHi: '24x7 इमरजेंसी एवं ट्रॉमा रिससिटेशन बे',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80',
      description: 'Dedicated crash carts, multiparameter monitors, immediate oxygen pipelines, and round-the-clock emergency doctors.',
      equipment: ['ALS Crash Cart', 'Multipara Vitals Monitor', 'Defibrillator Unit', 'Direct Trauma Entry'],
    },
    {
      id: 'modular-ot',
      title: 'Laminar Airflow Modular Operation Theatres',
      titleHi: 'लेमिनार एयरफ्लो मॉड्यूलर ऑपरेशन थिएटर',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=80',
      description: 'HEPA filtered zero-bacteria environment equipped with Karl Storz laparoscopy towers, C-Arm fluoroscopy, and electrocautery.',
      equipment: ['Karl Storz HD Laparoscopy', 'Allengers High-Res C-Arm', 'Dräger Anaesthesia Workstation', 'LED Surgical OT Lights'],
    },
    {
      id: 'icu-ventilators',
      title: 'Intensive Critical Care Unit (ICU)',
      titleHi: 'आधुनिक गहन चिकित्सा कक्ष (आईसीयू)',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1000&auto=format&fit=crop&q=80',
      description: 'Invasive mechanical ventilators, motorized ICU beds, dedicated dialysis line, and 1:1 specialist nurse-to-patient ratio.',
      equipment: ['Hamilton Ventilators', 'Central Nursing Station', 'Arterial Blood Gas (ABG)', 'Syringe Infusion Arrays'],
    },
    {
      id: 'deluxe-rooms',
      title: 'Private Deluxe Inpatient Rooms',
      titleHi: 'प्राइवेट डीलक्स एवं रिकवरी वार्ड्स',
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1000&auto=format&fit=crop&q=80',
      description: 'Fully air-conditioned single patient suites with attendant couch, ensuite washroom, cable TV, and peaceful recovery atmosphere.',
      equipment: ['Motorized Patient Bed', 'Attendant Sleeper Sofa', 'Central Oxygen Supply', 'Nurse Call Buzzer'],
    },
  ];

  const [activeSpotId, setActiveSpotId] = useState<string>(tourSpots[0].id);
  const activeSpot = tourSpots.find((s) => s.id === activeSpotId) || tourSpots[0];

  return (
    <section id="virtual-tour" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Campus & Technology Showcase' : 'अस्पताल परिसर एवं अत्याधुनिक तकनीक दर्शन'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Virtual Tour of Nexa Hospital Infrastructure' : 'नेक्सा हॉस्पिटल का आधुनिक इन्फ्रास्ट्रक्चर'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Take a visual tour through our advanced surgical theaters, emergency trauma wards, high-dependency ICU, and patient suites in Gomti Nagar.
          </p>
        </div>

        {/* Spot Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {tourSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveSpotId(spot.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeSpotId === spot.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {language === 'en' ? spot.title.split(' ')[0] + ' ' + (spot.title.split(' ')[1] || '') : spot.titleHi.split(' ')[0] + ' ' + (spot.titleHi.split(' ')[1] || '')}
            </button>
          ))}
        </div>

        {/* Active Spot Display */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 h-72 sm:h-96 relative overflow-hidden bg-slate-900">
            <img
              src={activeSpot.imageUrl}
              alt={activeSpot.title}
              className="w-full h-full object-cover opacity-90 transition-all duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-blue-900/80 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Verified Cleanliness & Sterility Protocol
                </span>
                <h4 className="text-xl sm:text-2xl font-black">
                  {language === 'en' ? activeSpot.title : activeSpot.titleHi}
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">
                Facility Details & Clinical Equipment
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeSpot.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Technology Installed:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSpot.equipment.map((eq, i) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold flex items-center space-x-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="line-clamp-1">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>Awadh Vihar Colony, Gomti Nagar, Lucknow</span>
              <span className="font-bold text-emerald-600">Open 24 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
