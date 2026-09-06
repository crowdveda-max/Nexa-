import React, { useState } from 'react';
import { Phone, Clock, MapPin, Calendar, MessageSquare, Menu, X, Shield, Star, HeartPulse, Search, Activity, AlertTriangle, Syringe } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface NavbarProps {
  onOpenAppointment: (department?: string, doctor?: string) => void;
  onOpenAiSahayak: () => void;
  onOpenAmbulance: () => void;
  onOpenSos: () => void;
  onOpenTracker: () => void;
  onOpenHomeSample: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAppointment,
  onOpenAiSahayak,
  onOpenAmbulance,
  onOpenSos,
  onOpenTracker,
  onOpenHomeSample,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Emergency & Info Utility Bar */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 sm:space-x-5 flex-wrap">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-pulse"></span>
              <span className="text-slate-300 font-medium">24/7 Emergency:</span>
              <a
                href={`tel:${HOSPITAL_INFO.contact.phone}`}
                className="text-white hover:text-blue-300 font-bold tracking-wide"
              >
                {HOSPITAL_INFO.contact.phoneDisplay}
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-slate-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Open 24 Hours • Gomti Nagar, Lucknow</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            {/* Quick Track Appointment */}
            <button
              onClick={onOpenTracker}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Track OPD Token"
            >
              <Search className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">Track Token</span>
            </button>

            {/* Quick Lab at Home */}
            <button
              onClick={onOpenHomeSample}
              className="hidden sm:flex px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 text-[11px] font-semibold transition-colors items-center gap-1 cursor-pointer"
              title="Home Blood Sample Collection"
            >
              <Syringe className="w-3 h-3 text-emerald-400" />
              <span>Home Lab</span>
            </button>

            {/* Language toggle */}
            <button
              onClick={onToggleLanguage}
              id="lang-toggle-btn"
              className="px-2 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Switch Language"
            >
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Red SOS Button */}
            <button
              onClick={onOpenSos}
              className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-black px-2.5 py-1 rounded-full flex items-center space-x-1 transition-all cursor-pointer shadow-xs active:scale-95 animate-pulse"
              title="Instant Trauma Emergency Alert"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>SOS</span>
            </button>

            {/* Emergency Ambulance CTA */}
            <button
              onClick={onOpenAmbulance}
              id="top-ambulance-btn"
              className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>{language === 'en' ? 'Ambulance' : 'एम्बुलेंस'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-tight">NEXA</span>
              <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded text-[11px] font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>4.9</span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">(42)</span>
              </span>
            </div>
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">
              Hospital Lucknow
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-700">
          <a href="#specialities" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Specialties' : 'विभाग'}
          </a>
          <a href="#doctors" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Doctors' : 'डॉक्टर'}
          </a>
          <a href="#beds" className="hover:text-blue-600 flex items-center space-x-1 text-emerald-700 transition-colors">
            <Activity className="w-3 h-3" />
            <span>{language === 'en' ? 'Live Beds' : 'बेड स्थिति'}</span>
          </a>
          <a href="#cost-estimator" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Cost Calculator' : 'खर्च कैलकुलेटर'}
          </a>
          <a href="#insurance" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Ayushman & TPA' : 'आयुष्मान'}
          </a>
          <a href="#virtual-tour" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Virtual Tour' : 'टूर'}
          </a>
          <a href="#reviews" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Reviews (4.9★)' : 'समीक्षाएं'}
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            {language === 'en' ? 'Contact' : 'संपर्क'}
          </a>
        </div>

        {/* Action Buttons & Phone */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAiSahayak}
            id="nav-ai-btn"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'AI Guide' : 'AI सहायक'}</span>
          </button>

          <button
            onClick={() => onOpenAppointment()}
            id="nav-book-btn"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-200 transition-all hover:shadow-lg active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट लें'}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center space-x-2">
          <button
            onClick={() => onOpenAppointment()}
            className="sm:hidden px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-700 pt-2">
            <a
              href="#specialities"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Specialties' : 'चिकित्सा विभाग'}
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Our Doctors' : 'हमारे डॉक्टर'}
            </a>
            <a
              href="#beds"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl font-bold"
            >
              {language === 'en' ? 'Live Bed Status' : 'बेड की स्थिति'}
            </a>
            <a
              href="#cost-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-blue-50 text-blue-800 rounded-xl font-bold"
            >
              {language === 'en' ? 'Cost Calculator' : 'खर्च कैलकुलेटर'}
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Health Packages' : 'स्वास्थ्य पैकेज'}
            </a>
            <a
              href="#insurance"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Ayushman & TPA' : 'आयुष्मान व बीमा'}
            </a>
            <a
              href="#virtual-tour"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Virtual Tour' : 'कैंपस टूर'}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700"
            >
              {language === 'en' ? 'Location & Map' : 'स्थान व संपर्क'}
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 shadow-md shadow-blue-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'en' ? 'Book OPD Appointment' : 'ऑनलाइन अपॉइंटमेंट बुक करें'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>{language === 'en' ? 'Track Appointment Token Status' : 'अपॉइंटमेंट टोकन स्टेटस चेक करें'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiSahayak();
              }}
              className="w-full py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>{language === 'en' ? 'Chat with Nexa AI Health Guide' : 'नेक्सा AI स्वास्थ्य सहायक'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSos();
              }}
              className="w-full py-2 rounded-xl bg-red-600 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 cursor-pointer animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{language === 'en' ? 'Emergency SOS Trauma Alert' : 'इमरजेंसी SOS अलार्म'}</span>
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.contact.phone}`}
              className="w-full py-2 rounded-xl bg-rose-600 text-white font-bold text-xs text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>{language === 'en' ? 'Emergency Call: 092649 71232' : 'इमरजेंसी कॉल: 092649 71232'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
