import React, { useState } from 'react';
import { REVIEWS, HOSPITAL_INFO } from '../data/hospitalData';
import { PatientReview } from '../types';
import { Star, ShieldCheck, MessageSquare, ExternalLink, PlusCircle } from 'lucide-react';

interface ReviewsSectionProps {
  onOpenReviewModal: () => void;
  userReviews?: PatientReview[];
  language: 'en' | 'hi';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenReviewModal,
  userReviews = [],
  language,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Emergency', 'Surgery', 'Maternity', 'Orthopedic', 'Pediatric'];

  const allReviews = [...userReviews, ...REVIEWS];

  const filteredReviews = allReviews.filter((r) => {
    if (selectedFilter === 'All') return true;
    return r.treatment.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <section id="reviews" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Google Verified 4.9 ★ Rating</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'What Lucknow Patients Say About Nexa Hospital' : 'मरीजों और उनके परिजनों का विश्वास'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Real experiences from families across Gomti Nagar, Malhaur, Chinhat, and Lucknow who trusted Nexa Hospital in critical moments.'
              : 'लखनऊ वासियों द्वारा गूगल पर दिए गए 42+ रिव्यू और 4.9 स्टार रेटिंग हमारे उच्च मानकों का प्रमाण हैं।'}
          </p>
        </div>

        {/* Rating Summary Scorecard Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6 space-y-1">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <span className="text-5xl font-black text-slate-900">{HOSPITAL_INFO.rating}</span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-slate-500 mt-0.5">
                    Based on {HOSPITAL_INFO.reviewsCount}+ Google Reviews
                  </div>
                </div>
              </div>
              <div className="text-xs text-blue-700 font-bold flex items-center justify-center md:justify-start space-x-1 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Verified Hospital in Uttar Pradesh</span>
              </div>
            </div>

            <div className="md:col-span-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Doctor Treatment & Compassion</span>
                <span className="font-bold text-slate-900">4.9 / 5</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '98%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Cleanliness, Hygiene & Inpatient Rooms</span>
                <span className="font-bold text-slate-900">4.9 / 5</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '97%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>24/7 Emergency & Rapid Response</span>
                <span className="font-bold text-slate-900">5.0 / 5</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="md:col-span-3 text-center space-y-2">
              <button
                onClick={onOpenReviewModal}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-200 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Your Review</span>
              </button>
              <a
                href={HOSPITAL_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-slate-600 hover:text-blue-700 flex items-center justify-center space-x-1"
              >
                <span>View All on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === f
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f === 'All' ? 'All Reviews' : f}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center space-x-1">
                    <span>{rev.author}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" title="Verified Patient" />
                  </div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {rev.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
