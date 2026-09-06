import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Phone, Calendar, AlertCircle, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { ChatMessage } from '../types';

interface NexaHealthSahayakProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: (department?: string) => void;
  language: 'en' | 'hi';
}

export const NexaHealthSahayak: React.FC<NexaHealthSahayakProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
  language,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'en'
          ? "Namaste! I am Nexa Health Sahayak, the virtual medical guide for Nexa Hospital, Gomti Nagar, Lucknow (24x7 Helpline: 092649 71232). How can I assist you today? You can describe symptoms or ask about our doctors, OPD timings, surgeries, maternity packages, or Ayushman Bharat."
          : "नमस्ते! मैं नेक्सा स्वास्थ्य सहायक हूँ, नेक्सा हॉस्पिटल गोमती नगर, लखनऊ का वर्चुअल हेल्थ गाइड (24 घंटे हेल्पलाइन: 092649 71232)। मैं आपकी क्या सहायता कर सकता हूँ? आप अपने लक्षण, डॉक्टर परामर्श, डिलीवरी पैकेज या आयुष्मान कार्ड के बारे में पूछ सकते हैं।",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    language === 'en' ? "Sudden sharp stomach pain" : "पेट में अचानक तेज दर्द",
    language === 'en' ? "Maternity & Normal delivery charges" : "डिलीवरी व प्रसूति पैकेज",
    language === 'en' ? "High fever & dengue symptoms" : "तेज बुखार व डेंगू के लक्षण",
    language === 'en' ? "Knee pain & joint replacement" : "घुटने का दर्द व ऑपरेशन",
    language === 'en' ? "Ayushman card accepted?" : "क्या आयुष्मान कार्ड चलेगा?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: language,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "Nexa Hospital Gomti Nagar is available 24x7. For urgent queries, please call 092649 71232.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedDepartment: data.suggestedDepartment,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text:
          language === 'en'
            ? "Nexa Hospital Gomti Nagar, Lucknow is open 24x7. For immediate consultations or emergency trauma dispatch, please call our 24x7 helpline: 092649 71232 directly."
            : "नेक्सा हॉस्पिटल गोमती नगर, लखनऊ 24 घंटे खुला रहता है। किसी भी चिकित्सीय सहायता या इमरजेंसी के लिए सीधे 092649 71232 पर कॉल करें।",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[92vh]">
        {/* Chat Header */}
        <div className="bg-blue-900 text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-800/80 border border-blue-400/40 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base">Nexa Health Sahayak</span>
                <span className="bg-blue-800/60 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                  AI Triage
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Nexa Hospital, Gomti Nagar • 24x7 Helpline: 092649 71232
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            id="close-ai-sahayak"
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Alert Hotline Callout */}
        <div className="bg-rose-50 border-b border-rose-100 p-2.5 px-4 flex items-center justify-between text-xs text-rose-900">
          <div className="flex items-center space-x-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Severe Emergency? Don't wait:</span>
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.contact.phone}`}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1 rounded-xl text-[11px] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <Phone className="w-3 h-3" />
            <span>Call 092649 71232</span>
          </a>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-100">
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
                        title="Read out aloud"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isSpeaking ? 'Stop Audio' : 'Listen Voice'}</span>
                      </button>
                    )}
                    <span
                      className={`text-[10px] ml-auto ${
                        isUser ? 'text-blue-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Nexa Sahayak is consulting medical protocols...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {promptSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(suggestion)}
              className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              language === 'en'
                ? 'Type symptoms or questions here (English/Hindi)...'
                : 'लक्षण या सवाल यहाँ लिखें (हिन्दी / English)...'
            }
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            id="ai-send-btn"
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl shadow-md shadow-blue-200 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Disclaimer & Book Button */}
        <div className="p-2.5 bg-slate-100 text-center border-t border-slate-200 flex items-center justify-between px-4 text-[10px] text-slate-500">
          <span>Guidance only; not a substitute for clinical diagnosis.</span>
          <button
            onClick={() => {
              onClose();
              onOpenAppointment();
            }}
            className="font-bold text-blue-700 hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Doctor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
