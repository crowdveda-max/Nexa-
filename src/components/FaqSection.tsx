import React, { useState } from 'react';
import { FAQS } from '../data/hospitalData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  language: 'en' | 'hi';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले सवाल'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Got Questions About Nexa Hospital?' : 'नेक्सा हॉस्पिटल से जुड़े जरूरी सवाल'}
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about our 24x7 hospital facilities, doctors, and cashless services.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100/80 transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? faq.q : faq.qHi}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white pt-4">
                    {language === 'en' ? faq.a : faq.aHi}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
