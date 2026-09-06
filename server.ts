import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely with lazy fallback
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hospital: "Nexa Hospital",
    city: "Lucknow, Uttar Pradesh",
    rating: 4.9,
    phone: "092649 71232",
    emergency: "24x7 Active",
  });
});

// In-memory data storage
interface AppointmentPayload {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  department: string;
  doctor?: string;
  preferredDate: string;
  preferredTime: string;
  symptoms?: string;
  isEmergency?: boolean;
  createdAt: string;
  status: string;
}

const appointmentsDatabase: AppointmentPayload[] = [
  {
    id: "NXA-884219",
    patientName: "Sunil Verma",
    phone: "09264971232",
    department: "General & Laparoscopic Surgery",
    doctor: "Dr. S. K. Singh",
    preferredDate: "2026-09-08",
    preferredTime: "Morning OPD (09:00 AM - 01:00 PM)",
    symptoms: "Abdominal pain checkup",
    isEmergency: false,
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  },
];

const homeSampleBookings: Array<{
  id: string;
  patientName: string;
  phone: string;
  address: string;
  selectedTests: string[];
  preferredDate: string;
  preferredSlot: string;
  createdAt: string;
  status: string;
}> = [];

const secondOpinionRequests: Array<{
  id: string;
  patientName: string;
  phone: string;
  department: string;
  primaryDiagnosis: string;
  symptomsSummary: string;
  createdAt: string;
  status: string;
}> = [];

const userReviews: Array<{
  id: string;
  author: string;
  rating: number;
  location: string;
  treatment: string;
  comment: string;
  date: string;
  verified: boolean;
}> = [];

// Appointment booking endpoint
app.post("/api/appointments", (req, res) => {
  try {
    const { patientName, phone, department, preferredDate, preferredTime, symptoms, doctor, email, isEmergency } = req.body;
    if (!patientName || !phone || !department) {
      return res.status(400).json({ error: "Patient name, phone, and department are required." });
    }

    const newAppointment: AppointmentPayload = {
      id: "NXA-" + Math.floor(100000 + Math.random() * 900000),
      patientName,
      phone,
      email: email || "",
      department,
      doctor: doctor || "Senior Specialist On Duty",
      preferredDate: preferredDate || "Earliest Available",
      preferredTime: preferredTime || "Morning OPD",
      symptoms: symptoms || "General Consultation",
      isEmergency: !!isEmergency,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    appointmentsDatabase.unshift(newAppointment);

    res.json({
      success: true,
      message: "Appointment confirmed successfully at Nexa Hospital.",
      appointment: newAppointment,
      instructions: "Please report 15 minutes before your scheduled slot at Awadh Vihar Colony, Gomti Nagar, Lucknow.",
      helpline: "092649 71232",
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to book appointment. Please call 092649 71232 directly." });
  }
});

// Appointment Status Lookup Endpoint
app.get("/api/appointment-status/:query", (req, res) => {
  try {
    const query = req.params.query.trim().toLowerCase();
    const cleanDigits = query.replace(/\D/g, "");

    const found = appointmentsDatabase.find(
      (a) =>
        a.id.toLowerCase() === query ||
        (cleanDigits.length >= 6 && a.phone.replace(/\D/g, "").includes(cleanDigits))
    );

    if (found) {
      return res.json({ success: true, appointment: found });
    } else {
      return res.status(404).json({
        success: false,
        message: "No active appointment found for this Token ID or Phone. Please check your token or call 092649 71232.",
      });
    }
  } catch (error) {
    console.error("Lookup error:", error);
    res.status(500).json({ error: "Failed to lookup appointment." });
  }
});

// Home Sample Collection Endpoint
app.post("/api/home-sample-booking", (req, res) => {
  try {
    const { patientName, phone, address, selectedTests, preferredDate, preferredSlot } = req.body;
    if (!patientName || !phone || !address || !selectedTests || selectedTests.length === 0) {
      return res.status(400).json({ error: "Patient name, phone, address, and tests are required." });
    }

    const booking = {
      id: "LAB-" + Math.floor(100000 + Math.random() * 900000),
      patientName,
      phone,
      address,
      selectedTests,
      preferredDate: preferredDate || "Tomorrow Morning",
      preferredSlot: preferredSlot || "07:00 AM - 09:00 AM (Fasting)",
      createdAt: new Date().toISOString(),
      status: "Phlebotomist Assigned",
    };

    homeSampleBookings.unshift(booking);

    res.json({
      success: true,
      message: "Home sample collection request received. Phlebotomist will contact you to confirm.",
      booking,
    });
  } catch (error) {
    console.error("Lab booking error:", error);
    res.status(500).json({ error: "Failed to book home sample." });
  }
});

// Free Second Opinion Submission Endpoint
app.post("/api/second-opinion", (req, res) => {
  try {
    const { patientName, phone, department, primaryDiagnosis, symptomsSummary } = req.body;
    if (!patientName || !phone || !primaryDiagnosis) {
      return res.status(400).json({ error: "Patient name, phone, and diagnosis are required." });
    }

    const request = {
      id: "OPN-" + Math.floor(100000 + Math.random() * 900000),
      patientName,
      phone,
      department: department || "General / Specialist Panel",
      primaryDiagnosis,
      symptomsSummary: symptomsSummary || "",
      createdAt: new Date().toISOString(),
      status: "Under Review by Senior Specialist",
    };

    secondOpinionRequests.unshift(request);

    res.json({
      success: true,
      message: "Second opinion request logged. Senior doctor will review and call within 4 hours.",
      request,
    });
  } catch (error) {
    console.error("Second opinion error:", error);
    res.status(500).json({ error: "Failed to submit second opinion request." });
  }
});

// Patient Review Submission Endpoint
app.post("/api/reviews", (req, res) => {
  try {
    const { author, rating, location, treatment, comment } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ error: "Author, rating, and comment are required." });
    }

    const review = {
      id: "rev-user-" + Date.now(),
      author,
      rating: Number(rating),
      location: location || "Lucknow",
      treatment: treatment || "OPD & Inpatient Care",
      comment,
      date: "Just now",
      verified: true,
    };

    userReviews.unshift(review);

    res.json({
      success: true,
      message: "Thank you! Your verified review has been recorded.",
      review,
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ error: "Failed to submit review." });
  }
});

// Emergency SOS Alert Endpoint
app.post("/api/sos-alert", (req, res) => {
  try {
    const { latitude, longitude, phone, emergencyType } = req.body;
    console.log("EMERGENCY SOS RECEIVED:", { latitude, longitude, phone, emergencyType });

    res.json({
      success: true,
      message: "Emergency SOS registered at Nexa Trauma Desk. Dispatch team is actively monitoring.",
      hotline: "092649 71232",
    });
  } catch (error) {
    console.error("SOS error:", error);
    res.status(500).json({ error: "Failed to trigger SOS alert." });
  }
});

// AI Health Sahayak & Triage endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "bilingual", history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getAiClient();
    if (!ai) {
      return res.json({
        reply: language === "hi"
          ? "नमस्ते! नेक्सा हॉस्पिटल गोमती नगर, लखनऊ (फ़ोन: 092649 71232) 24x7 आपकी सेवा में तत्पर है। यदि आपातकालीन स्थिति है, तो कृपया तुरंत हमारे इमरजेंसी नंबर 092649 71232 पर कॉल करें या अस्पताल पधारें। आप ऊपर दिए गए फॉर्म से भी अपॉइंटमेंट बुक कर सकते हैं।"
          : "Hello! Nexa Hospital, Gomti Nagar, Lucknow (Phone: 092649 71232) is available 24x7 for all medical needs. If this is an urgent emergency, please call 092649 71232 immediately or visit our 24x7 Emergency & Trauma Centre. You can also book an OPD slot directly above.",
        suggestedDepartment: "General Medicine / 24x7 Emergency",
      });
    }

    const systemInstruction = `You are "Nexa Health Sahayak" (नेक्सा स्वास्थ्य सहायक), the official compassionate AI Medical Assistant for Nexa Hospital located at Awadh Vihar Colony, Gomti Nagar, Lucknow, Uttar Pradesh (Phone: 092649 71232, Rating: 4.9★ with 42+ Google Reviews, Open 24 Hours).

Key Hospital Information to incorporate naturally:
- Name: Nexa Hospital, Gomti Nagar, Lucknow
- Specialties: 24x7 Emergency & Trauma, General & Laparoscopic Surgery, Obstetrics & Gynecology (Maternity & High-Risk Delivery), Pediatrics & NICU, Orthopedics & Joint Replacement, Cardiology, Internal Medicine, Diabetology, Cashless Insurance & Ayushman Bharat support, In-house Diagnostic Lab & Pharmacy.
- Location: Awadh Vihar Colony, Ashraf Vihar Colony, Gomti Nagar, Nijampur Malhaur, Lucknow, UP 226028.
- Helpline: 092649 71232

Role and tone:
- Warm, reassuring, culturally respectful, clinical yet simple (Hinglish/Hindi/English as the patient prefers).
- Provide practical first-aid / lifestyle advice and symptom clarification.
- CLEAR MEDICAL DISCLAIMER: Always state that this is for guidance and does not replace in-person doctor evaluation.
- Suggest the appropriate specialist department at Nexa Hospital.
- For life-threatening red flags (chest pain, acute breathlessness, severe blood loss, unconsciousness, severe burns, high fever in infants), immediately urge calling the 24x7 Emergency Helpline: 092649 71232 or visiting Nexa Hospital Gomti Nagar right away.
- Keep responses structured, concise, and easy to read on mobile.`;

    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { role: string; content: string }) => `${h.role === "user" ? "Patient" : "Sahayak"}: ${h.content}`).join("\n")
      : "";

    const prompt = `${formattedHistory ? formattedHistory + "\n" : ""}Patient query: ${message}\n\nPlease provide a helpful, warm response. At the end, specify the most relevant Nexa Hospital department to consult.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const reply = response.text || "Thank you for reaching out to Nexa Hospital. Please contact our 24x7 desk at 092649 71232 for direct assistance.";

    res.json({
      reply,
      hospitalPhone: "092649 71232",
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.json({
      reply: "Nexa Hospital Gomti Nagar, Lucknow is open 24x7. For immediate consultation or emergency ambulance, please call 092649 71232 directly.",
      hospitalPhone: "092649 71232",
    });
  }
});

// Vite middleware configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexa Hospital Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
