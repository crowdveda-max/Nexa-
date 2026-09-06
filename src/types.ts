export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  speciality: string;
  experienceYears: number;
  availableDays: string;
  timing: string;
  opdFee: number;
  languages: string[];
  imageUrl: string;
  bio: string;
  education?: string[];
  achievements?: string[];
  memberships?: string[];
}

export interface Speciality {
  id: string;
  title: string;
  titleHi: string;
  iconName: string;
  description: string;
  descriptionHi: string;
  commonSymptoms: string[];
  services: string[];
  headDoctor: string;
}

export interface HealthPackage {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  originalPrice: number;
  discountedPrice: number;
  idealFor: string;
  testsCount: number;
  testsList: string[];
  popular?: boolean;
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  treatment: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  department: string;
  doctor: string;
  preferredDate: string;
  preferredTime: string;
  symptoms?: string;
  isEmergency?: boolean;
  status: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedDepartment?: string;
}

export interface ProcedureCostEstimate {
  id: string;
  name: string;
  nameHi: string;
  department: string;
  duration: string;
  hospitalStay: string;
  estimatedCostRange: string;
  ayushmanCovered: boolean;
  insuranceCashless: boolean;
  inclusions: string[];
  description: string;
}

export interface BedStatus {
  category: string;
  categoryHi: string;
  total: number;
  available: number;
  status: 'Available' | 'High Demand' | 'Critical';
  icon: string;
}

export interface HomeSampleBooking {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  selectedTests: string[];
  preferredDate: string;
  preferredSlot: string;
  status: string;
  createdAt: string;
}

export interface SecondOpinionRequest {
  id: string;
  patientName: string;
  phone: string;
  department: string;
  primaryDiagnosis: string;
  symptomsSummary: string;
  status: string;
  createdAt: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  readTime: string;
  summary: string;
  summaryHi: string;
  author: string;
  date: string;
  tips: string[];
}

export interface ImmunizationVaccine {
  ageGroup: string;
  ageGroupHi: string;
  vaccines: string[];
  prevents: string;
  mandatory: boolean;
}
