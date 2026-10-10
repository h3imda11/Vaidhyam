export type UserRole = 'patient' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  createdAt?: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  bio: string;
  experienceYears: number;
  languages: string[];
  consultationFee: number;
  photoUrl?: string;
  consultationTypes: ('video' | 'audio' | 'in_clinic')[];
  registrationNumber?: string;
  active: boolean;
}

export interface AvailabilityConfig {
  doctorId: string;
  workingDays: number[]; // 0=Sunday, 1=Monday, etc.
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "17:00"
  slotDurationMinutes: number; // e.g. 30
  breakStart?: string; // e.g. "13:00"
  breakEnd?: string; // e.g. "14:00"
  blockedDates: string[]; // ['YYYY-MM-DD']
  maxAppointmentsPerDay: number;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no-show';
export type PaymentStatus = 'pending' | 'paid' | 'pay_at_clinic';
export type AppointmentType = 'video' | 'audio' | 'in_clinic';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM (e.g., "10:00 AM")
  appointmentType: AppointmentType;
  symptoms: string;
  notes?: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  fee: number;
  paymentId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PdcPackage {
  id: string;
  name: string;
  durationDays: number;
  price: number;
  description: string;
  inclusions: string[];
  exclusions: string[];
  accommodation: string; // "Included" | "Not Included" | "Optional"
  food: string; // "Ayurvedic Mathruka Diet Included" | "Diet Plan Provided"
  motherAndBabyOption: boolean;
  sessionsCount: number;
  consultationsIncluded: number;
  homeCareAvailable: boolean;
  active: boolean;
  order: number;
}

export type PdcBookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface PdcBooking {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  packageId: string;
  packageName: string;
  durationDays: number;
  startDate: string;
  preferredConsultationDate?: string;
  careRequirement: 'mother_only' | 'mother_and_baby';
  preferredLocation: 'clinic_retreat' | 'home_care';
  deliveryDateOrExpected?: string;
  additionalNotes?: string;
  price: number;
  paymentStatus: PaymentStatus;
  bookingStatus: PdcBookingStatus;
  paymentId?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: 'Post-Delivery Care' | "Women's Wellness" | 'Digestive Wellness' | 'Stress & Lifestyle' | 'Joint & Musculoskeletal' | 'Skin & Hair' | 'Ayurvedic Detox' | 'Personalized Therapies';
  shortDescription: string;
  suitableFor: string;
  approach: string;
  durationMinutes?: number;
  price?: number;
  requiresAssessment: boolean;
  active: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  targetRole?: 'patient' | 'admin' | 'all';
  title: string;
  message: string;
  type: 'appointment' | 'pdc' | 'general' | 'payment';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface ClinicSettings {
  id: string;
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  consultationFee: number;
  currency: string;
  workingHoursText: string;
  cancellationNoticeHours: number;
  razorpayKeyId?: string;
  allowPayAtClinic: boolean;
}

export type KnowledgeCategory =
  | 'Postnatal Care'
  | "Women's Health"
  | 'Gut & Agni'
  | 'Daily Routine (Dinacharya)'
  | 'Botanical Science'
  | 'Mind & Sleep';

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  keyTips: string[];
  category: KnowledgeCategory;
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha';
  readingTimeMinutes: number;
  author: string;
  authorTitle?: string;
  classicalReference?: string;
  tags: string[];
  recommendedHerbOrOil?: string;
  helpfulCount: number;
  featured?: boolean;
  publishedAt: string;
}

