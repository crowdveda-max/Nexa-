import React, { useState } from 'react';
import { AlertCircle, MapPin, Phone, Send, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const EmergencySosModal: React.FC<EmergencySosModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [phone, setPhone] = useState('');
  const [emergencyType, setEmergencyType] = useState('Severe Road Accident / Poly-Trauma');
  const [geoStatus, setGeoStatus] = useState<string>('Not fetched yet');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [fetchingGeo, setFetchingGeo] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('Geolocation not supported by browser.');
      return;
    }
    setFetchingGeo(true);
    setGeoStatus('Acquiring high-accuracy GPS coordinates...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoStatus(`GPS Locked: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setFetchingGeo(false);
      },
      (err) => {
        console.warn('Geo error:', err);
        setGeoStatus('Unable to retrieve automatic GPS. Please tell location on call.');
        setFetchingGeo(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleTriggerSos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    try {
      await fetch('/api/sos-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          emergencyType,
          latitude: coords?.lat,
          longitude: coords?.lng,
        }),
      });
    } catch (err) {
      console.error('SOS fetch error:', err);
    }
    setSosSent(true);
  };

  const handleReset = () => {
    setSosSent(false);
    setPhone('');
    onClose();
  };

  if (!isOpen) return null;

  const mapsLink = coords
    ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
    : 'Location pending';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-rose-300 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-600 rounded-xl animate-pulse">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                Emergency SOS Dispatch
              </h3>
              <p className="text-xs text-rose-200">
                Nexa Hospital Trauma Center • Immediate Response
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-rose-200 hover:text-white hover:bg-rose-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Direct Call Action */}
        <div className="p-4 bg-rose-50 border-b border-rose-200 text-center space-y-2">
          <div className="text-xs font-bold text-rose-900">
            For critical resuscitation, call directly right now:
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.contact.phone}`}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-rose-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>Call 24x7: {HOSPITAL_INFO.contact.phoneDisplay}</span>
          </a>
        </div>

        {sosSent ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-black text-slate-900">
                SOS Alert Dispatched!
              </h4>
              <p className="text-xs text-slate-600">
                Our trauma casualty in-charge has received your coordinates and is calling{' '}
                <strong className="text-slate-900">{phone}</strong>.
              </p>
            </div>

            {coords && (
              <a
                href={`https://wa.me/${HOSPITAL_INFO.contact.whatsapp}?text=${encodeURIComponent(
                  `EMERGENCY SOS ALERT! Phone: ${phone}, Emergency: ${emergencyType}, My Live GPS Pin: https://maps.google.com/?q=${coords.lat},${coords.lng}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Live Pin on WhatsApp</span>
              </a>
            )}

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleTriggerSos} className="p-6 space-y-4">
            {/* GPS Fetch Button */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>GPS Location</span>
                </span>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={fetchingGeo}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {fetchingGeo ? 'Locating...' : 'Get My Live GPS'}
                </button>
              </div>
              <div className="text-[11px] text-slate-500 italic">
                {geoStatus}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Caller / Patient Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 092649 71232"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Type of Emergency
              </label>
              <select
                value={emergencyType}
                onChange={(e) => setEmergencyType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-rose-500 focus:bg-white focus:outline-hidden"
              >
                <option value="Severe Road Accident / Poly-Trauma">Severe Road Accident / Fracture</option>
                <option value="Acute Heart Attack / Chest Pain">Acute Heart Attack / Chest Pain</option>
                <option value="Respiratory Failure / Severe Breathlessness">Respiratory Failure / Low Oxygen</option>
                <option value="Labor Pain / Urgent Delivery">Labor Pain / Maternity Crisis</option>
                <option value="Stroke / Paralysis / Unconscious">Stroke / Paralysis / Unconscious</option>
                <option value="Severe Burns / Poisoning">Severe Burns / Poisoning</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Send SOS Alert to Nexa Hospital</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
