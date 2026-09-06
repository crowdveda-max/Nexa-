import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { HeartPulse, Phone, MapPin, Clock, Mail, Star, ShieldCheck, Navigation } from 'lucide-react';

interface FooterProps {
  onOpenAppointment: () => void;
  language: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment, language }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Address Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  NEXA <span className="text-blue-400 font-sans">HOSPITAL</span>
                </span>
                <span className="block text-xs text-slate-400 font-medium">
                  24x7 Multi-Speciality & Trauma Centre • Lucknow
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing ethical, accessible, and high-precision surgical, maternal, orthopedic, pediatric, and critical care in Gomti Nagar, Lucknow.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{HOSPITAL_INFO.rating} / 5.0</span>
              <span className="text-slate-400">({HOSPITAL_INFO.reviewsCount} Google Reviews)</span>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address.full}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.contact.phone}`} className="text-white font-bold hover:text-blue-300">
                  {HOSPITAL_INFO.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Specialities Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Key Medical Departments
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">24x7 Emergency & Trauma</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Laparoscopic Surgery</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Maternity & Delivery Care</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Pediatrics & Neonatal NICU</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Orthopedic Joint Clinic</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Critical Care & Ventilators</a></li>
              <li><a href="#specialities" className="hover:text-blue-300 transition-colors">Digital X-Ray & 24/7 Lab</a></li>
            </ul>
          </div>

          {/* Patients & Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Patient Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={onOpenAppointment} className="hover:text-blue-300 text-left cursor-pointer transition-colors">Book Doctor Appointment</button></li>
              <li><a href="#packages" className="hover:text-blue-300 transition-colors">Health Checkup Packages</a></li>
              <li><a href="#insurance" className="hover:text-blue-300 transition-colors">Ayushman Bharat (PM-JAY)</a></li>
              <li><a href="#insurance" className="hover:text-blue-300 transition-colors">Cashless Insurance TPAs</a></li>
              <li><a href="#reviews" className="hover:text-blue-300 transition-colors">Patient Testimonials</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition-colors">Directions & Campus</a></li>
            </ul>
          </div>

          {/* 24x7 Emergency Contacts */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>24x7 Helplines</span>
            </h4>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Trauma & Ambulance</div>
                <a href={`tel:${HOSPITAL_INFO.contact.phone}`} className="text-sm font-extrabold text-rose-400 hover:underline">
                  {HOSPITAL_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Casualty Incharge</div>
                <div className="text-xs text-white font-bold">24 Hours On Duty</div>
              </div>
            </div>
            <a
              href={HOSPITAL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-bold"
            >
              <span>Get GPS Route</span>
              <Navigation className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Legal & Medical Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} Nexa Hospital. All rights reserved. Awadh Vihar Colony, Ashraf Vihar Colony, Gomti Nagar, Lucknow, UP 226028.
          </p>
          <p className="max-w-md text-right text-slate-400 hidden sm:block">
            Medical Disclaimer: Information on this site is educational. In case of acute emergencies, please dial 092649 71232 or reach the trauma department immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};
