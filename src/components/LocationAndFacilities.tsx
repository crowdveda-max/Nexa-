import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { MapPin, Navigation, Phone, Clock, Train, Car, Building2, Shield, CheckCircle } from 'lucide-react';

interface LocationAndFacilitiesProps {
  language: 'en' | 'hi';
}

export const LocationAndFacilities: React.FC<LocationAndFacilitiesProps> = ({ language }) => {
  const facilities = [
    {
      title: "Modular Operation Theatre",
      desc: "Laminar airflow, HEPA filters, advanced laparoscopic electro-cautery towers.",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Advanced 24x7 ICU & HDU",
      desc: "Invasive ventilators, multi-channel infusion pumps, continuous vital monitoring.",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Neonatal Care (NICU)",
      desc: "Warmers, LED phototherapy for jaundice, infant cardiopulmonary support.",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Digital X-Ray & 24/7 Lab",
      desc: "Automated hematology, biochemistry, and bedside imaging diagnostics.",
      img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Deluxe Inpatient Rooms",
      desc: "Air-conditioned private suites with attendant sofa bed, television & nurse-call bell.",
      img: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "24/7 In-House Pharmacy",
      desc: "Round-the-clock availability of critical emergency injectables & surgical consumables.",
      img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Campus & Directions' : 'स्थान, पता एवं सुविधाएं'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Visit Nexa Hospital in Gomti Nagar, Lucknow' : 'नेक्सा हॉस्पिटल कैसे पहुंचें'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Conveniently situated in Gomti Nagar with spacious parking, wheelchair accessibility, and rapid ambulance entrance.'
              : 'अवध विहार कॉलोनी, अशरफ विहार, गोमती नगर, निज़ामपुर मल्हौर, लखनऊ (मल्हौर स्टेशन के पास)। 24 घंटे खुला।'}
          </p>
        </div>

        {/* Location & Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Address Card & Landmark instructions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-blue-800">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-blue-300 tracking-wider bg-blue-800/60 border border-blue-400/30 px-2.5 py-1 rounded-full inline-block">
                  Hospital Address
                </span>
                <h3 className="text-2xl font-black text-white">Nexa Hospital</h3>
                <p className="text-sm text-blue-100 leading-relaxed font-light">
                  {HOSPITAL_INFO.address.full}
                </p>
                <p className="text-xs text-blue-300 font-semibold pt-1">
                  Landmark: {HOSPITAL_INFO.address.landmarks}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-blue-800 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-blue-200 text-xs font-medium">24x7 Helpline & Emergency:</div>
                    <a
                      href={`tel:${HOSPITAL_INFO.contact.phone}`}
                      className="text-white font-black hover:text-blue-200 text-base"
                    >
                      {HOSPITAL_INFO.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-blue-200 text-xs font-medium">Operating Hours:</div>
                    <div className="text-white font-semibold">
                      Emergency & Trauma: 24 Hours (All Days)
                    </div>
                    <div className="text-blue-200/80 text-xs">
                      OPD Consultations: 9:00 AM - 9:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white hover:bg-blue-50 text-blue-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={`tel:${HOSPITAL_INFO.contact.phone}`}
                  className="py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hospital</span>
                </a>
              </div>
            </div>

            {/* Commute & Route Guidance */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Car className="w-4 h-4 text-blue-600" />
                <span>How to Reach Nexa Hospital:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start space-x-2">
                  <Train className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>From Malhaur Railway Station:</strong> Just 5-7 minutes via Malhaur station road.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Car className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>From Gomti Nagar Extension / Shaheed Path:</strong> 10 minutes drive with direct wide road access.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Car className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>From Chinhat / Matiyari Chauraha:</strong> 12 minutes drive. Easy e-rickshaw & auto availability.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed & Directions Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative">
              <iframe
                title="Map of Nexa Hospital Gomti Nagar Lucknow"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.78912345678!2d81.025!3d26.865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3b50c000001%3A0x123456789abcdef!2sNexa%20Hospital%2C%20Awadh%20Vihar%20Colony%2C%20Gomti%20Nagar%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Floating map info badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-slate-200 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Nexa Hospital, Gomti Nagar, Lucknow
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Awadh Vihar Colony, Nijampur Malhaur • Open 24 Hours
                  </div>
                </div>
                <a
                  href={HOSPITAL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shrink-0 flex items-center space-x-1.5 transition-all shadow-md shadow-blue-200 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Navigation</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Infrastructure & Facilities Gallery */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Infrastructure & Patient Amenities
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Built to high clinical and hygienic standards to ensure safe surgeries, sterile ICUs, and comfortable patient recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={fac.img}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white font-bold text-sm">
                    {fac.title}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
