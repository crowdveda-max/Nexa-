import React from 'react';
import { COMMUTE_STATIONS, HOSPITAL_INFO } from '../data/hospitalData';
import { Navigation, Train, Plane, Car, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface CommuteAndTourismSectionProps {
  language: 'en' | 'hi';
}

export const CommuteAndTourismSection: React.FC<CommuteAndTourismSectionProps> = ({
  language,
}) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Commute & Outstation Patient Care' : 'बाहरी जनपदों से आने वाले मरीजों हेतु मार्ग निर्देश'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'How to Reach Nexa Hospital Lucknow' : 'अस्पताल तक कैसे पहुंचे: सुगम आवागमन'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Conveniently situated in Gomti Nagar near Malhaur Station, offering swift connectivity from Shaheed Path, Barabanki Highway, and Lucknow Charbagh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Key Distance Cards */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Train className="w-5 h-5 text-blue-600" />
              <span>Major Transport Hub Distances</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {COMMUTE_STATIONS.map((station, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div className="font-bold text-slate-900">{station.name}</div>
                  <div className="text-blue-700 font-extrabold text-sm mt-0.5">{station.distance}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{station.note}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{HOSPITAL_INFO.address.full}</span>
              </div>
              <a
                href={HOSPITAL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Attendant & Outstation Assistance */}
          <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-800 text-blue-200 px-2.5 py-0.5 rounded-full inline-block">
                For Outstation Families
              </span>
              <h4 className="text-xl font-black">
                Visiting from Barabanki, Ayodhya, Sitapur or Sultanpur?
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Nexa Hospital provides dedicated patient attendants assistance, private room bookings, emergency ambulance transfers directly from stations, and subsidized cafeteria meals for attendants.
              </p>
              <ul className="text-xs space-y-1.5 text-blue-200">
                <li>• Free 24x7 Ambulance pickup on call</li>
                <li>• Attendant staying lounge & canteen</li>
                <li>• Priority Ayushman Card desk assistance</li>
              </ul>
            </div>

            <a
              href={`tel:${HOSPITAL_INFO.contact.phone}`}
              className="w-full py-3 bg-white text-blue-900 hover:bg-blue-50 font-black text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Helpline: {HOSPITAL_INFO.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
