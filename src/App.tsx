/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EmergencyBanner } from './components/EmergencyBanner';
import { AccreditationBadges } from './components/AccreditationBadges';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { BedAvailabilityTracker } from './components/BedAvailabilityTracker';
import { DoctorsSection } from './components/DoctorsSection';
import { DoctorScheduleSection } from './components/DoctorScheduleSection';
import { CostEstimatorSection } from './components/CostEstimatorSection';
import { HealthPackagesSection } from './components/HealthPackagesSection';
import { InsuranceSection } from './components/InsuranceSection';
import { ImmunizationGuideSection } from './components/ImmunizationGuideSection';
import { VirtualTourSection } from './components/VirtualTourSection';
import { HealthBlogSection } from './components/HealthBlogSection';
import { CommuteAndTourismSection } from './components/CommuteAndTourismSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndFacilities } from './components/LocationAndFacilities';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Interactive Modals
import { AppointmentModal } from './components/AppointmentModal';
import { NexaHealthSahayak } from './components/NexaHealthSahayak';
import { AmbulanceModal } from './components/AmbulanceModal';
import { EmergencySosModal } from './components/EmergencySosModal';
import { AppointmentTrackerModal } from './components/AppointmentTrackerModal';
import { HomeSampleBookingModal } from './components/HomeSampleBookingModal';
import { SecondOpinionModal } from './components/SecondOpinionModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { HealthRiskAssessmentModal } from './components/HealthRiskAssessmentModal';
import { AyushmanCheckerModal } from './components/AyushmanCheckerModal';
import { ReviewSubmissionModal } from './components/ReviewSubmissionModal';
import { StickyEmergencyBar } from './components/StickyEmergencyBar';
import { Doctor, PatientReview } from './types';

export default function App() {
  // Navigation & Modals State
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [aiSahayakOpen, setAiSahayakOpen] = useState(false);
  const [ambulanceModalOpen, setAmbulanceModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [homeSampleModalOpen, setHomeSampleModalOpen] = useState(false);
  const [secondOpinionModalOpen, setSecondOpinionModalOpen] = useState(false);
  const [healthRiskModalOpen, setHealthRiskModalOpen] = useState(false);
  const [ayushmanCheckerOpen, setAyushmanCheckerOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProfileDoctor, setSelectedProfileDoctor] = useState<Doctor | null>(null);

  // Dynamic Patient Reviews
  const [userReviews, setUserReviews] = useState<PatientReview[]>([]);

  // Bilingual Language State ('en' | 'hi')
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const handleOpenAppointment = (dept?: string, doc?: string) => {
    setSelectedDepartment(dept);
    setSelectedDoctor(doc);
    setAppointmentModalOpen(true);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleReviewAdded = (newReview: PatientReview) => {
    setUserReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white pb-14 sm:pb-0">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenAppointment={handleOpenAppointment}
        onOpenAiSahayak={() => setAiSahayakOpen(true)}
        onOpenAmbulance={() => setAmbulanceModalOpen(true)}
        onOpenSos={() => setSosModalOpen(true)}
        onOpenTracker={() => setTrackerModalOpen(true)}
        onOpenHomeSample={() => setHomeSampleModalOpen(true)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenAiSahayak={() => setAiSahayakOpen(true)}
          onOpenAmbulance={() => setAmbulanceModalOpen(true)}
          language={language}
        />

        {/* 2. Emergency Trauma Hotline Banner */}
        <EmergencyBanner
          onOpenAmbulance={() => setAmbulanceModalOpen(true)}
          onOpenAppointment={() => handleOpenAppointment('24x7 Emergency & Trauma Care')}
          language={language}
        />

        {/* 3. Clinical Accreditations & Quality Badges */}
        <AccreditationBadges language={language} />

        {/* 4. Live Bed Availability Tracker (ICU, NICU, Deluxe, General) */}
        <BedAvailabilityTracker language={language} />

        {/* 5. Specialities Section */}
        <SpecialitiesSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 6. Medical Specialists & Surgeons (with live search & profile view) */}
        <DoctorsSection
          onOpenAppointment={handleOpenAppointment}
          onSelectDoctor={(doc) => setSelectedProfileDoctor(doc)}
          language={language}
        />

        {/* 7. Weekly Doctor OPD Schedule & Duty Roster */}
        <DoctorScheduleSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 8. Procedure Cost & Surgery Estimator */}
        <CostEstimatorSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 9. Preventive Health Checkup Packages */}
        <HealthPackagesSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 10. Cashless Insurance & Ayushman Empanelment */}
        <InsuranceSection
          onOpenAyushmanChecker={() => setAyushmanCheckerOpen(true)}
          language={language}
        />

        {/* 11. Child Immunization & Vaccination Guide */}
        <ImmunizationGuideSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 12. Interactive Campus & Technology Virtual Tour */}
        <VirtualTourSection language={language} />

        {/* 13. Health Knowledge & Doctor Advice Articles */}
        <HealthBlogSection
          onOpenAppointment={handleOpenAppointment}
          language={language}
        />

        {/* 14. Outstation Commute & Transportation Guide */}
        <CommuteAndTourismSection language={language} />

        {/* 15. Verified Patient Reviews & Rating Scorecard */}
        <ReviewsSection
          onOpenReviewModal={() => setReviewModalOpen(true)}
          userReviews={userReviews}
          language={language}
        />

        {/* 16. Location, Facilities & Interactive Google Map */}
        <LocationAndFacilities language={language} />

        {/* 17. Frequently Asked Questions */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
        language={language}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <StickyEmergencyBar
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenAiSahayak={() => setAiSahayakOpen(true)}
        onOpenAmbulance={() => setAmbulanceModalOpen(true)}
        language={language}
      />

      {/* Floating Action Button for Health Risk Assessment & Lab Sample */}
      <div className="fixed bottom-20 right-4 z-40 hidden md:flex flex-col gap-2">
        <button
          onClick={() => setHealthRiskModalOpen(true)}
          className="bg-blue-900 hover:bg-blue-950 text-white p-3 rounded-full shadow-xl border border-blue-700 flex items-center space-x-2 text-xs font-bold transition-transform hover:scale-105 cursor-pointer"
          title="Take Health Risk Assessment"
        >
          <span>❤️ Check Health Risk</span>
        </button>
        <button
          onClick={() => setSecondOpinionModalOpen(true)}
          className="bg-white hover:bg-slate-50 text-slate-800 p-3 rounded-full shadow-xl border border-slate-200 flex items-center space-x-2 text-xs font-bold transition-transform hover:scale-105 cursor-pointer"
          title="Get Expert Second Opinion"
        >
          <span>📋 2nd Opinion</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        defaultDepartment={selectedDepartment}
        defaultDoctor={selectedDoctor}
        language={language}
      />

      <NexaHealthSahayak
        isOpen={aiSahayakOpen}
        onClose={() => setAiSahayakOpen(false)}
        onOpenAppointment={handleOpenAppointment}
        language={language}
      />

      <AmbulanceModal
        isOpen={ambulanceModalOpen}
        onClose={() => setAmbulanceModalOpen(false)}
        language={language}
      />

      <EmergencySosModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        language={language}
      />

      <AppointmentTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
        language={language}
      />

      <HomeSampleBookingModal
        isOpen={homeSampleModalOpen}
        onClose={() => setHomeSampleModalOpen(false)}
        language={language}
      />

      <SecondOpinionModal
        isOpen={secondOpinionModalOpen}
        onClose={() => setSecondOpinionModalOpen(false)}
        language={language}
      />

      <DoctorProfileModal
        isOpen={!!selectedProfileDoctor}
        onClose={() => setSelectedProfileDoctor(null)}
        doctor={selectedProfileDoctor}
        onBookAppointment={(dept, doc) => {
          setSelectedProfileDoctor(null);
          handleOpenAppointment(dept, doc);
        }}
        language={language}
      />

      <HealthRiskAssessmentModal
        isOpen={healthRiskModalOpen}
        onClose={() => setHealthRiskModalOpen(false)}
        onOpenAppointment={handleOpenAppointment}
        language={language}
      />

      <AyushmanCheckerModal
        isOpen={ayushmanCheckerOpen}
        onClose={() => setAyushmanCheckerOpen(false)}
        language={language}
      />

      <ReviewSubmissionModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onReviewAdded={handleReviewAdded}
        language={language}
      />
    </div>
  );
}
