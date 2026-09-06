import React, { useState } from 'react';
import { HEALTH_ARTICLES } from '../data/hospitalData';
import { BookOpen, Clock, User, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface HealthBlogSectionProps {
  onOpenAppointment: (dept: string) => void;
  language: 'en' | 'hi';
}

export const HealthBlogSection: React.FC<HealthBlogSectionProps> = ({
  onOpenAppointment,
  language,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="health-blog" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'en' ? 'Health Knowledge & Doctor Advice' : 'स्वास्थ्य जागरूकता एवं मौसमी एडवाइजरी'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'Medical Guides & Prevention Alerts' : 'वरिष्ठ डॉक्टरों द्वारा लिखित स्वास्थ्य सलाह'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Practical health tips tailored to Lucknow's seasonal patterns, covering Dengue alerts, heart attack golden hour rules, maternity safety, and modern keyhole surgery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HEALTH_ARTICLES.map((article) => {
            const isExpanded = expandedId === article.id;
            return (
              <div
                key={article.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {language === 'en' ? article.title : article.titleHi}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'en' ? article.summary : article.summaryHi}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs animate-in fade-in duration-200">
                      <div className="font-bold text-slate-800">Key Doctor Recommendations:</div>
                      <ul className="space-y-1.5 text-slate-700">
                        {article.tips.map((tip, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    By <strong className="text-slate-800">{article.author}</strong>
                  </div>
                  <button
                    onClick={() => toggleExpand(article.id)}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Read Full Advice'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
