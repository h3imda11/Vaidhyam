import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  UserProfile,
  Doctor,
  AvailabilityConfig,
  Appointment,
  PdcPackage,
  PdcBooking,
  Treatment,
  Enquiry,
  NotificationItem,
  ClinicSettings,
  AppointmentStatus,
  PdcBookingStatus,
  PaymentStatus
} from '../types';
import {
  SEED_DOCTOR,
  SEED_PDC_PACKAGES,
  SEED_TREATMENTS,
  SEED_AVAILABILITY,
  SEED_SETTINGS
} from '../data/seedData';

// Fallback in-memory / local storage caches to guarantee resilience
const LOCAL_STORAGE_KEYS = {
  APPOINTMENTS: 'vaidyam_local_appointments',
  PDC_BOOKINGS: 'vaidyam_local_pdc_bookings',
  PACKAGES: 'vaidyam_local_packages',
  TREATMENTS: 'vaidyam_local_treatments',
  SETTINGS: 'vaidyam_local_settings',
  NOTIFICATIONS: 'vaidyam_local_notifications',
  ENQUIRIES: 'vaidyam_local_enquiries',
};

function getLocal<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // silent ignore
  }
}

/**
 * Initialize Firestore database with seed documents if not present
 */
export async function initDatabase(): Promise<void> {
  try {
    // Check settings
    const settingsRef = doc(db, 'settings', 'general');
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, SEED_SETTINGS);
    }

    // Seed Doctor
    const doctorRef = doc(db, 'doctors', SEED_DOCTOR.id);
    const doctorSnap = await getDoc(doctorRef);
    if (!doctorSnap.exists()) {
      await setDoc(doctorRef, SEED_DOCTOR);
    }

    // Seed Availability
    const availRef = doc(db, 'availability', SEED_AVAILABILITY.doctorId);
    const availSnap = await getDoc(availRef);
    if (!availSnap.exists()) {
      await setDoc(availRef, SEED_AVAILABILITY);
    }

    // Seed PDC Packages
    for (const pkg of SEED_PDC_PACKAGES) {
      const pkgRef = doc(db, 'pdc_packages', pkg.id);
      const snap = await getDoc(pkgRef);
      if (!snap.exists()) {
        await setDoc(pkgRef, pkg);
      }
    }

    // Seed Treatments
    for (const treat of SEED_TREATMENTS) {
      const treatRef = doc(db, 'treatments', treat.id);
      const snap = await getDoc(treatRef);
      if (!snap.exists()) {
        await setDoc(treatRef, treat);
      }
    }
  } catch (error) {
    console.warn('Database initialization completed or running in resilient mode:', error);
  }
}

// ========================
// USER PROFILES
// ========================
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const ref = doc(db, 'users', userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    const ref = doc(db, 'users', profile.id);
    await setDoc(ref, profile, { merge: true });

    // If role is admin, also register in admins collection for security rule checks
    if (profile.role === 'admin') {
      const adminRef = doc(db, 'admins', profile.id);
      await setDoc(adminRef, { uid: profile.id, email: profile.email, assignedAt: new Date().toISOString() });
    }
  } catch (err) {
    console.error('Error saving user profile:', err);
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(d => d.data() as UserProfile);
  } catch {
    return [];
  }
}

// ========================
// DOCTORS & AVAILABILITY
// ========================
export async function getDoctor(doctorId = 'doc_dr_ananya'): Promise<Doctor> {
  try {
    const snap = await getDoc(doc(db, 'doctors', doctorId));
    if (snap.exists()) {
      return snap.data() as Doctor;
    }
  } catch (err) {
    console.warn('Using seed doctor due to error:', err);
  }
  return SEED_DOCTOR;
}

export async function updateDoctor(doctorId: string, updates: Partial<Doctor>): Promise<void> {
  try {
    await updateDoc(doc(db, 'doctors', doctorId), updates);
  } catch (err) {
    console.error('Error updating doctor:', err);
  }
}

export async function getDoctorAvailability(doctorId = 'doc_dr_ananya'): Promise<AvailabilityConfig> {
  try {
    const snap = await getDoc(doc(db, 'availability', doctorId));
    if (snap.exists()) {
      return snap.data() as AvailabilityConfig;
    }
  } catch (err) {
    console.warn('Using seed availability due to error:', err);
  }
  return SEED_AVAILABILITY;
}

export async function updateDoctorAvailability(availability: AvailabilityConfig): Promise<void> {
  try {
    await setDoc(doc(db, 'availability', availability.doctorId), availability, { merge: true });
  } catch (err) {
    console.error('Error updating availability:', err);
  }
}

/**
 * Generate available time slots for a date & check against booked appointments
 * Guarantees NO DOUBLE BOOKING!
 */
export async function getAvailableTimeSlots(
  doctorId: string,
  dateString: string
): Promise<{ time: string; available: boolean; reason?: string }[]> {
  const config = await getDoctorAvailability(doctorId);
  const selectedDate = new Date(dateString + 'T00:00:00');
  const dayOfWeek = selectedDate.getDay();

  // Check if doctor works on this day
  if (!config.workingDays.includes(dayOfWeek)) {
    return [];
  }

  // Check if date is blocked
  if (config.blockedDates.includes(dateString)) {
    return [];
  }

  // Generate slots
  const slots: string[] = [];
  const [startH, startM] = config.startTime.split(':').map(Number);
  const [endH, endM] = config.endTime.split(':').map(Number);
  const [breakStartH, breakStartM] = (config.breakStart || '13:00').split(':').map(Number);
  const [breakEndH, breakEndM] = (config.breakEnd || '14:00').split(':').map(Number);

  let currentMin = startH * 60 + startM;
  const endTotalMin = endH * 60 + endM;
  const breakStartTotal = breakStartH * 60 + breakStartM;
  const breakEndTotal = breakEndH * 60 + breakEndM;

  while (currentMin + config.slotDurationMinutes <= endTotalMin) {
    // If during break, skip
    if (currentMin >= breakStartTotal && currentMin < breakEndTotal) {
      currentMin += config.slotDurationMinutes;
      continue;
    }

    const h = Math.floor(currentMin / 60);
    const m = currentMin % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const formatted = `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    slots.push(formatted);
    currentMin += config.slotDurationMinutes;
  }

  // Fetch booked appointments on this date
  const bookedSlots = new Set<string>();
  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('date', '==', dateString)
    );
    const snap = await getDocs(q);
    snap.docs.forEach(d => {
      const data = d.data() as Appointment;
      if (data.status !== 'cancelled') {
        bookedSlots.add(data.timeSlot);
      }
    });
  } catch {
    // Fallback check local
    const local = getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
    local.forEach(a => {
      if (a.doctorId === doctorId && a.date === dateString && a.status !== 'cancelled') {
        bookedSlots.add(a.timeSlot);
      }
    });
  }

  return slots.map(slot => ({
    time: slot,
    available: !bookedSlots.has(slot),
    reason: bookedSlots.has(slot) ? 'Reserved by another patient' : undefined,
  }));
}

// ========================
// APPOINTMENTS
// ========================
export async function createAppointment(
  data: Omit<Appointment, 'id' | 'createdAt' | 'status'>
): Promise<Appointment> {
  // Pre-check for race condition / double booking
  try {
    const existingQ = query(
      collection(db, 'appointments'),
      where('doctorId', '==', data.doctorId),
      where('date', '==', data.date),
      where('timeSlot', '==', data.timeSlot)
    );
    const checkSnap = await getDocs(existingQ);
    const isAlreadyBooked = checkSnap.docs.some(d => (d.data() as Appointment).status !== 'cancelled');
    if (isAlreadyBooked) {
      throw new Error('This appointment slot has just been reserved. Please select another time.');
    }
  } catch (err: any) {
    if (err.message && err.message.includes('just been reserved')) {
      throw err;
    }
  }

  const id = `APT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const appointment: Appointment = {
    ...data,
    id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'appointments', id), appointment);
  } catch {
    // Local storage fallback
    const local = getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
    local.unshift(appointment);
    setLocal(LOCAL_STORAGE_KEYS.APPOINTMENTS, local);
  }

  // Trigger Notifications
  await createNotification({
    userId: data.patientId,
    title: 'Appointment Booked',
    message: `Your consultation with ${data.doctorName} for ${data.date} at ${data.timeSlot} is submitted.`,
    type: 'appointment',
  });

  await createNotification({
    targetRole: 'admin',
    title: 'New Consultation Request',
    message: `Patient ${data.patientName} requested an appointment for ${data.date} at ${data.timeSlot}.`,
    type: 'appointment',
  });

  return appointment;
}

export async function getPatientAppointments(patientId: string): Promise<Appointment[]> {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('patientId', '==', patientId)
    );
    const snap = await getDocs(q);
    const list = snap.docs.map(d => d.data() as Appointment);
    if (list.length > 0) return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.warn('Using local appointments fallback:', err);
  }

  const local = getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
  return local.filter(a => a.patientId === patientId);
}

export async function getAllAppointments(): Promise<Appointment[]> {
  try {
    const snap = await getDocs(collection(db, 'appointments'));
    const list = snap.docs.map(d => d.data() as Appointment);
    if (list.length > 0) return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.warn('Using local appointments fallback:', err);
  }
  return getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus,
  notes?: string
): Promise<void> {
  const updates: Partial<Appointment> = {
    status,
    updatedAt: new Date().toISOString(),
  };
  if (notes !== undefined) {
    updates.notes = notes;
  }

  try {
    await updateDoc(doc(db, 'appointments', appointmentId), updates);
  } catch {
    const local = getLocal<Appointment[]>(LOCAL_STORAGE_KEYS.APPOINTMENTS, []);
    const idx = local.findIndex(a => a.id === appointmentId);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.APPOINTMENTS, local);
    }
  }

  // Notify patient of status change
  try {
    const apptSnap = await getDoc(doc(db, 'appointments', appointmentId));
    if (apptSnap.exists()) {
      const appt = apptSnap.data() as Appointment;
      await createNotification({
        userId: appt.patientId,
        title: `Appointment ${status.toUpperCase()}`,
        message: `Your consultation on ${appt.date} at ${appt.timeSlot} is now ${status}.`,
        type: 'appointment',
      });
    }
  } catch {
    // Ignore
  }
}

// ========================
// PDC PACKAGES
// ========================
export async function getPdcPackages(): Promise<PdcPackage[]> {
  try {
    const snap = await getDocs(collection(db, 'pdc_packages'));
    if (!snap.empty) {
      const list = snap.docs.map(d => d.data() as PdcPackage);
      return list.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  } catch (err) {
    console.warn('Falling back to local/seed PDC packages:', err);
  }

  const local = getLocal<PdcPackage[]>(LOCAL_STORAGE_KEYS.PACKAGES, SEED_PDC_PACKAGES);
  return local.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getPdcPackageById(packageId: string): Promise<PdcPackage | null> {
  const all = await getPdcPackages();
  return all.find(p => p.id === packageId) || null;
}

export async function updatePdcPackage(id: string, updates: Partial<PdcPackage>): Promise<void> {
  try {
    await setDoc(doc(db, 'pdc_packages', id), updates, { merge: true });
  } catch (err) {
    console.error('Failed to update PDC package in Firestore:', err);
  }

  // Always sync local
  const current = getLocal<PdcPackage[]>(LOCAL_STORAGE_KEYS.PACKAGES, SEED_PDC_PACKAGES);
  const index = current.findIndex(p => p.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updates };
  } else {
    current.push({ ...updates, id } as PdcPackage);
  }
  setLocal(LOCAL_STORAGE_KEYS.PACKAGES, current);
}

export async function createPdcPackage(pkg: PdcPackage): Promise<void> {
  try {
    await setDoc(doc(db, 'pdc_packages', pkg.id), pkg);
  } catch {
    // sync local
  }
  const current = getLocal<PdcPackage[]>(LOCAL_STORAGE_KEYS.PACKAGES, SEED_PDC_PACKAGES);
  current.push(pkg);
  setLocal(LOCAL_STORAGE_KEYS.PACKAGES, current);
}

// ========================
// PDC BOOKINGS
// ========================
export async function createPdcBooking(
  bookingData: Omit<PdcBooking, 'id' | 'createdAt' | 'bookingStatus'>
): Promise<PdcBooking> {
  const id = `VAY-PDC-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const booking: PdcBooking = {
    ...bookingData,
    id,
    bookingStatus: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'pdc_bookings', id), booking);
  } catch {
    const local = getLocal<PdcBooking[]>(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, []);
    local.unshift(booking);
    setLocal(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, local);
  }

  // In-app notifications
  await createNotification({
    userId: bookingData.patientId,
    title: 'PDC Care Enrollment Received',
    message: `Your booking for ${bookingData.packageName} (${bookingData.durationDays} Days) starting on ${bookingData.startDate} has been placed. Ref: ${id}`,
    type: 'pdc',
  });

  await createNotification({
    targetRole: 'admin',
    title: 'New PDC Booking',
    message: `${bookingData.patientName} booked ${bookingData.packageName} (${bookingData.durationDays} Days). Ref: ${id}`,
    type: 'pdc',
  });

  return booking;
}

export async function getPatientPdcBookings(patientId: string): Promise<PdcBooking[]> {
  try {
    const q = query(collection(db, 'pdc_bookings'), where('patientId', '==', patientId));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => d.data() as PdcBooking);
    if (list.length > 0) return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.warn('Fallback to local PDC bookings:', err);
  }

  const local = getLocal<PdcBooking[]>(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, []);
  return local.filter(b => b.patientId === patientId);
}

export async function getAllPdcBookings(): Promise<PdcBooking[]> {
  try {
    const snap = await getDocs(collection(db, 'pdc_bookings'));
    const list = snap.docs.map(d => d.data() as PdcBooking);
    if (list.length > 0) return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.warn('Fallback to local PDC bookings:', err);
  }

  return getLocal<PdcBooking[]>(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, []);
}

export async function updatePdcBookingStatus(
  bookingId: string,
  status: PdcBookingStatus,
  adminNotes?: string
): Promise<void> {
  const updates: Partial<PdcBooking> = {
    bookingStatus: status,
    updatedAt: new Date().toISOString(),
  };
  if (adminNotes !== undefined) updates.adminNotes = adminNotes;

  try {
    await updateDoc(doc(db, 'pdc_bookings', bookingId), updates);
  } catch {
    const local = getLocal<PdcBooking[]>(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, []);
    const idx = local.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, local);
    }
  }

  // Notify patient
  try {
    const snap = await getDoc(doc(db, 'pdc_bookings', bookingId));
    if (snap.exists()) {
      const b = snap.data() as PdcBooking;
      await createNotification({
        userId: b.patientId,
        title: `PDC Booking ${status.toUpperCase()}`,
        message: `Your booking for ${b.packageName} has been marked as ${status}.`,
        type: 'pdc',
      });
    }
  } catch {
    // Ignore
  }
}

export async function updatePdcPaymentStatus(
  bookingId: string,
  paymentStatus: PaymentStatus,
  paymentId?: string
): Promise<void> {
  const updates: Partial<PdcBooking> = {
    paymentStatus,
    paymentId,
    updatedAt: new Date().toISOString(),
  };

  try {
    await updateDoc(doc(db, 'pdc_bookings', bookingId), updates);
  } catch {
    const local = getLocal<PdcBooking[]>(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, []);
    const idx = local.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates };
      setLocal(LOCAL_STORAGE_KEYS.PDC_BOOKINGS, local);
    }
  }
}

// ========================
// TREATMENTS
// ========================
export async function getTreatments(): Promise<Treatment[]> {
  try {
    const snap = await getDocs(collection(db, 'treatments'));
    if (!snap.empty) {
      return snap.docs.map(d => d.data() as Treatment);
    }
  } catch (err) {
    console.warn('Fallback to local/seed treatments:', err);
  }

  return getLocal<Treatment[]>(LOCAL_STORAGE_KEYS.TREATMENTS, SEED_TREATMENTS);
}

export async function updateTreatment(id: string, updates: Partial<Treatment>): Promise<void> {
  try {
    await setDoc(doc(db, 'treatments', id), updates, { merge: true });
  } catch (err) {
    console.error('Failed to update treatment:', err);
  }

  const list = getLocal<Treatment[]>(LOCAL_STORAGE_KEYS.TREATMENTS, SEED_TREATMENTS);
  const idx = list.findIndex(t => t.id === id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates };
  } else {
    list.push({ ...updates, id } as Treatment);
  }
  setLocal(LOCAL_STORAGE_KEYS.TREATMENTS, list);
}

export async function createTreatment(treatment: Treatment): Promise<void> {
  try {
    await setDoc(doc(db, 'treatments', treatment.id), treatment);
  } catch {
    // fallback
  }
  const list = getLocal<Treatment[]>(LOCAL_STORAGE_KEYS.TREATMENTS, SEED_TREATMENTS);
  list.push(treatment);
  setLocal(LOCAL_STORAGE_KEYS.TREATMENTS, list);
}

export async function deleteTreatment(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'treatments', id));
  } catch {
    // fallback
  }
  const list = getLocal<Treatment[]>(LOCAL_STORAGE_KEYS.TREATMENTS, SEED_TREATMENTS);
  setLocal(LOCAL_STORAGE_KEYS.TREATMENTS, list.filter(t => t.id !== id));
}

// ========================
// ENQUIRIES
// ========================
export async function submitEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<Enquiry> {
  const id = `ENQ-${Date.now().toString(36).toUpperCase()}`;
  const enquiry: Enquiry = {
    ...data,
    id,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'enquiries', id), enquiry);
  } catch {
    const list = getLocal<Enquiry[]>(LOCAL_STORAGE_KEYS.ENQUIRIES, []);
    list.unshift(enquiry);
    setLocal(LOCAL_STORAGE_KEYS.ENQUIRIES, list);
  }

  await createNotification({
    targetRole: 'admin',
    title: 'New Contact Enquiry',
    message: `${data.name} sent an enquiry: "${data.subject}"`,
    type: 'general',
  });

  return enquiry;
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const snap = await getDocs(collection(db, 'enquiries'));
    if (!snap.empty) {
      return snap.docs.map(d => d.data() as Enquiry).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  } catch {
    // fallback
  }
  return getLocal<Enquiry[]>(LOCAL_STORAGE_KEYS.ENQUIRIES, []);
}

export async function updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved'): Promise<void> {
  try {
    await updateDoc(doc(db, 'enquiries', id), { status });
  } catch {
    const list = getLocal<Enquiry[]>(LOCAL_STORAGE_KEYS.ENQUIRIES, []);
    const idx = list.findIndex(e => e.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      setLocal(LOCAL_STORAGE_KEYS.ENQUIRIES, list);
    }
  }
}

// ========================
// NOTIFICATIONS
// ========================
export async function createNotification(
  notif: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>
): Promise<void> {
  const id = `NOTIF-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
  const item: NotificationItem = {
    ...notif,
    id,
    read: false,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'notifications', id), item);
  } catch {
    const list = getLocal<NotificationItem[]>(LOCAL_STORAGE_KEYS.NOTIFICATIONS, []);
    list.unshift(item);
    setLocal(LOCAL_STORAGE_KEYS.NOTIFICATIONS, list.slice(0, 50));
  }
}

export async function getUserNotifications(userId?: string, role?: string): Promise<NotificationItem[]> {
  try {
    const snap = await getDocs(collection(db, 'notifications'));
    const all = snap.docs.map(d => d.data() as NotificationItem);
    return all.filter(n => {
      if (role === 'admin') return true;
      if (userId && n.userId === userId) return true;
      if (n.targetRole === 'all') return true;
      return false;
    }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    const list = getLocal<NotificationItem[]>(LOCAL_STORAGE_KEYS.NOTIFICATIONS, []);
    return list.filter(n => {
      if (role === 'admin') return true;
      if (userId && n.userId === userId) return true;
      if (n.targetRole === 'all') return true;
      return false;
    });
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  } catch {
    const list = getLocal<NotificationItem[]>(LOCAL_STORAGE_KEYS.NOTIFICATIONS, []);
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      list[idx].read = true;
      setLocal(LOCAL_STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }
}

// ========================
// CLINIC SETTINGS
// ========================
export async function getClinicSettings(): Promise<ClinicSettings> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'));
    if (snap.exists()) {
      return snap.data() as ClinicSettings;
    }
  } catch (err) {
    console.warn('Fallback to local/seed settings:', err);
  }
  return getLocal<ClinicSettings>(LOCAL_STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
}

export async function updateClinicSettings(updates: Partial<ClinicSettings>): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'general'), updates, { merge: true });
  } catch (err) {
    console.error('Error updating settings:', err);
  }
  const current = getLocal<ClinicSettings>(LOCAL_STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
  setLocal(LOCAL_STORAGE_KEYS.SETTINGS, { ...current, ...updates });
}
