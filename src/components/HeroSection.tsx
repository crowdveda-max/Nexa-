import React from 'react';
import { Phone, Calendar, MapPin, Star, ShieldCheck, Clock, Sparkles, Navigation, CheckCircle2, HeartPulse, Activity, Stethoscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface HeroSectionProps {
  onOpenAppointment: () => void;
  onOpenAiSahayak: () => void;
  onOpenAmbulance: () => void;
  language: 'en' | 'hi';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAppointment,
  onOpenAiSahayak,
  onOpenAmbulance,
  language,
}) => {
  return (
    <div className="flex flex-col bg-slate-50 font-sans">
      {/* Signature Geometric Balance Hero Banner */}
      <section className="relative min-h-[480px] lg:min-h-[520px] bg-blue-900 flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden shrink-0">
        {/* Left Content Container */}
        <div className="relative z-10 w-full lg:w-3/5 py-12 space-y-6">
          {/* Geometric Status Pill */}
          <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-400/30 px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-bold text-blue-100 tracking-wider uppercase">
              {language === 'en' ? 'Open 24/7 • Gomti Nagar, Lucknow' : '24 घंटे खुला • गोमती नगर, लखनऊ'}
            </span>
          </div>

          {/* Heading with Geometric Balance Emphasis */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {language === 'en' ? (
              <>
                Advanced Clinical Care <br />
                <span className="text-blue-400">Right in Lucknow.</span>
              </>
            ) : (
              <>
                अत्याधुनिक चिकित्सा सेवा <br />
                <span className="text-blue-400">अब गोमती नगर, लखनऊ में।</span>
              </>
            )}
          </h1>

          <p className="text-blue-100/90 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed">
            {language === 'en'
              ? 'Nexa Hospital combines world-class medical expertise with a compassionate touch, serving Uttar Pradesh with 4.9-star excellence across laparoscopic surgery, maternity, ICU, and trauma.'
              : 'नेक्सा हॉस्पिटल 24 घंटे आपातकालीन ट्रॉमा, दूरबीन विधि से ऑपरेशन, मातृत्व प्रसूति और नवजात शिशु आईसीयू में 4.9-स्टार उत्कृष्ट चिकित्सा सेवाएं प्रदान करता है।'}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenAppointment}
              id="hero-book-btn"
              className="bg-white hover:bg-blue-50 text-blue-900 px-7 py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट लें'}</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.contact.phone}`}
              id="hero-emergency-btn"
              className="border-2 border-blue-400/50 hover:bg-blue-800/40 text-white px-7 py-3 rounded-xl font-bold text-sm sm:text-base backdrop-blur-xs transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>{language === 'en' ? 'Emergency Care' : 'इमरजेंसी कॉल'}</span>
            </a>

            <button
              onClick={onOpenAiSahayak}
              id="hero-ai-guide-btn"
              className="bg-blue-800/70 hover:bg-blue-700/80 text-blue-100 border border-blue-400/30 px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>{language === 'en' ? 'AI Symptom Guide' : 'AI सहायक'}</span>
            </button>
          </div>

          {/* Quick Location Bar */}
          <div className="flex items-center space-x-2 text-xs text-blue-200/90 pt-1">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Awadh Vihar Colony, Ashraf Vihar, Gomti Nagar •</span>
            <a
              href={HOSPITAL_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white underline font-semibold flex items-center"
            >
              <span>{language === 'en' ? 'Directions' : 'गूगल मैप'}</span>
              <Navigation className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Signature Skewed Geometric Balance Visual Slice */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-[46%] xl:w-[48%] skew-x-[-12deg] bg-slate-200 overflow-hidden transform translate-x-12 border-l-8 border-blue-500 shadow-2xl">
          <div
            className="w-full h-full bg-cover bg-center skew-x-[12deg] transform -translate-x-12 opacity-95"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1024')",
            }}
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 via-blue-900/20 to-transparent"></div>

            {/* Floating Live Badge inside skewed container */}
            <div className="absolute bottom-10 left-16 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-blue-200 shadow-xl flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Advanced 24x7 ICU & OT</p>
                <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Nexa Hospital Lucknow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Geometric Balance 4-Column Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-10 bg-white items-stretch border-b border-slate-200">
        {/* Card 1: Cardiology & Critical Care */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">
              {language === 'en' ? 'Cardiology & ICU' : 'हृदय रोग एवं आईसीयू'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {language === 'en'
                ? 'Specialized heart care, advanced ventilators, and round-the-clock emergency cardiac stabilization.'
                : 'विशेषज्ञ हृदय परामर्श, वेंटिलेटर एवं 24 घंटे आपातकालीन कार्डियक सुविधाएं।'}
            </p>
          </div>
          <a
            href="#specialities"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center space-x-1"
          >
            <span>Learn More →</span>
          </a>
        </div>

        {/* Card 2: Diagnostics & Modular OT */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">
              {language === 'en' ? 'Diagnostics & Surgery' : 'जांच एवं लेप्रोस्कोपिक सर्जरी'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {language === 'en'
                ? 'High-precision digital imaging, automated pathology labs, and modular laparoscopic surgery suites.'
                : 'डिजिटल एक्स-रे, ऑटोमेटेड पैथोलॉजी लैब और दूरबीन विधि से सुरक्षित ऑपरेशन।'}
            </p>
          </div>
          <a
            href="#specialities"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center space-x-1"
          >
            <span>Learn More →</span>
          </a>
        </div>

        {/* Card 3: Maternity & Pediatrics */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">
              {language === 'en' ? 'Maternity & Pediatrics' : 'मातृत्व एवं शिशु रोग'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {language === 'en'
                ? 'Comprehensive maternal care, painless labor suites, and dedicated neonatal NICU support.'
                : 'सुरक्षित डिलीवरी, प्रसूति देखभाल एवं नवजात शिशु गहन चिकित्सा (NICU)।'}
            </p>
          </div>
          <a
            href="#specialities"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center space-x-1"
          >
            <span>Learn More →</span>
          </a>
        </div>

        {/* Card 4: Signature Geometric Balance 4.9 Rating Card */}
        <div className="bg-blue-600 p-6 rounded-2xl shadow-xl shadow-blue-100 flex flex-col items-center justify-center text-center text-white transition-all hover:scale-[1.02]">
          <span className="text-4xl font-extrabold tracking-tight">4.9</span>
          <div className="flex gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-90">
            {language === 'en' ? 'Patient Satisfaction' : 'मरीजों का अटूट भरोसा'}
          </p>
          <p className="text-xs mt-1 text-blue-100 font-medium">
            Based on 42+ verified reviews
          </p>
          <a
            href="#reviews"
            className="mt-3 px-4 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-xs font-semibold text-white transition-colors"
          >
            View Reviews
          </a>
        </div>
      </section>
    </div>
  );
};
