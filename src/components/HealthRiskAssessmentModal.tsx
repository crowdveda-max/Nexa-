import React, { useState } from 'react';
import { Activity, X, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Calendar } from 'lucide-react';

interface HealthRiskAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: (dept: string) => void;
  language: 'en' | 'hi';
}

export const HealthRiskAssessmentModal: React.FC<HealthRiskAssessmentModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
  language,
}) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const questions = [
    {
      q: "How frequently do you experience high fatigue, excessive thirst, or frequent night urination?",
      options: [
        { label: "Rarely / Never", points: 0 },
        { label: "Occasionally during stressful weeks", points: 1 },
        { label: "Frequently / Almost daily", points: 3 },
      ],
      dept: "Internal Medicine & Diabetology",
    },
    {
      q: "Do you experience breathlessness or chest tightness while climbing 2 flights of stairs?",
      options: [
        { label: "No, breathe comfortably", points: 0 },
        { label: "Mild shortness of breath", points: 1 },
        { label: "Noticeable chest heaviness or fatigue", points: 3 },
      ],
      dept: "Cardiology & Internal Medicine",
    },
    {
      q: "Do you suffer from recurring knee joint pain, stiffness in the morning, or difficulty standing from floor?",
      options: [
        { label: "No pain / fully mobile", points: 0 },
        { label: "Occasional knee crackling or mild ache", points: 1 },
        { label: "Severe knee pain affecting daily walk", points: 3 },
      ],
      dept: "Orthopedics & Joint Replacement",
    },
    {
      q: "Do you suffer from recurrent severe abdominal gas, acid reflux, or gallbladder colic pain after meals?",
      options: [
        { label: "Normal digestion", points: 0 },
        { label: "Mild acidity with oily food", points: 1 },
        { label: "Sharp upper abdominal or back pain", points: 3 },
      ],
      dept: "General & Laparoscopic Surgery",
    },
  ];

  const handleSelectOption = (points: number) => {
    setAnswers((prev) => ({ ...prev, [step]: points }));
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const totalScore = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);

  const getAssessment = () => {
    if (totalScore <= 2) {
      return {
        level: "Low Risk (Healthy Baseline)",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        message: "Your primary health vitals look well-balanced. We recommend routine annual blood screening (Nexa Swasthya Basic Screening, ₹699) to stay proactive.",
        dept: "General Medicine",
      };
    } else if (totalScore <= 6) {
      return {
        level: "Moderate Risk (Early Warning Indicators)",
        badge: "bg-amber-100 text-amber-800 border-amber-200",
        message: "Some metabolic or lifestyle stress markers detected. It is strongly advised to undergo blood sugar (HbA1c), lipid profile, and an OPD consultation.",
        dept: "Internal Medicine & Diabetology",
      };
    } else {
      return {
        level: "Elevated Risk (Clinical Attention Advised)",
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        message: "Multiple significant symptoms identified. We recommend scheduling an in-person consultation at Nexa Hospital, Gomti Nagar with our senior physician.",
        dept: "Internal Medicine & Cardiology",
      };
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
  };

  if (!isOpen) return null;

  const result = getAssessment();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-800 rounded-xl">
              <Activity className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                1-Minute Health Risk Check
              </h3>
              <p className="text-xs text-blue-200">
                Quick Clinical Triage • Nexa Hospital, Lucknow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!completed ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Question {step + 1} of {questions.length}</span>
                <span className="text-blue-600 font-extrabold">{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {questions[step].q}
                </h4>

                <div className="space-y-2.5">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.points)}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-800 text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${result.badge}`}>
                  {result.level}
                </span>
              </div>

              <div className="text-3xl font-black text-slate-900">
                Score: {totalScore} / 12
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {result.message}
              </p>

              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 text-left">
                <strong>Recommended Specialist:</strong> {result.dept} at Nexa Hospital, Gomti Nagar. OPD consultation fee: ₹500.
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAppointment(result.dept);
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Specialist</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="py-3 px-4 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
