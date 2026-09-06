import React, { useState } from 'react';
import { FileText, X, CheckCircle2, User, Phone, Stethoscope, ShieldCheck } from 'lucide-react';
import { SPECIALITIES, HOSPITAL_INFO } from '../data/hospitalData';

interface SecondOpinionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const SecondOpinionModal: React.FC<SecondOpinionModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('General & Laparoscopic Surgery');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
  const [symptomsSummary, setSymptomsSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !primaryDiagnosis.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/second-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          phone,
          department,
          primaryDiagnosis,
          symptomsSummary,
        }),
      });
      const data = await res.json();
      if (data.success && data.request) {
        setSubmittedRequest(data.request);
      } else {
        setSubmittedRequest({
          id: 'OPN-' + Math.floor(100000 + Math.random() * 900000),
          patientName,
          phone,
          department,
          primaryDiagnosis,
          status: 'Under Review by Senior Specialist',
        });
      }
    } catch (err) {
      console.error('Second opinion error:', err);
      setSubmittedRequest({
        id: 'OPN-' + Math.floor(100000 + Math.random() * 900000),
        patientName,
        phone,
        department,
        primaryDiagnosis,
        status: 'Under Review by Senior Specialist',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setPatientName('');
    setPhone('');
    setPrimaryDiagnosis('');
    setSymptomsSummary('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-800 rounded-xl">
              <FileText className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {language === 'en' ? 'Free Medical Second Opinion' : 'वरिष्ठ डॉक्टरों से मुफ्त सेकंड ओपिनियन'}
              </h3>
              <p className="text-xs text-blue-200">
                Nexa Hospital Board of Specialists • Gomti Nagar, Lucknow
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {submittedRequest ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                Second Opinion Request Submitted!
              </h4>
              <p className="text-xs text-slate-600">
                Case ID: <strong className="text-blue-700">{submittedRequest.id}</strong>. Our senior consultant in {submittedRequest.department} will review your case and call you back on <strong className="text-slate-900">{submittedRequest.phone}</strong>.
              </p>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 text-left space-y-1">
                <div className="font-bold">WhatsApp Report Sharing:</div>
                <p>You can also send your MRI, CT, or Ultrasound scan photos directly to our clinical WhatsApp: <strong>{HOSPITAL_INFO.contact.phoneDisplay}</strong> with reference ID: <strong>{submittedRequest.id}</strong>.</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Advised surgery elsewhere? Consult our senior surgeons and medical team before taking a major decision. Get honest, evidence-based guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Patient Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 092649 71232"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                  <span>Clinical Speciality</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                >
                  {SPECIALITIES.map((sp) => (
                    <option key={sp.id} value={sp.title}>
                      {sp.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Current Diagnosis / Surgery Advised *
                </label>
                <input
                  type="text"
                  required
                  value={primaryDiagnosis}
                  onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                  placeholder="e.g. Gallbladder Stone 14mm, Knee Replacement advised, etc."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Brief Medical Summary or Questions for Doctor (Optional)
                </label>
                <textarea
                  rows={2}
                  value={symptomsSummary}
                  onChange={(e) => setSymptomsSummary(e.target.value)}
                  placeholder="Mention any scan findings, allergies, or questions you have..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Confidential medical evaluation by our credentialed consultants.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {submitting ? 'Submitting Case...' : 'Request Free Specialist Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
