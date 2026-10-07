import React, { useState, useEffect } from 'react';
import {
  Calendar,
  HeartPulse,
  Users,
  DollarSign,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Edit,
  Save,
  Plus,
  RefreshCw,
  LogOut,
  Mail,
  Phone,
  Settings as SettingsIcon,
  Sparkles,
  UserCheck,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getAllAppointments,
  getAllPdcBookings,
  getAllUsers,
  getPdcPackages,
  updatePdcPackage,
  createPdcPackage,
  updateAppointmentStatus,
  updatePdcBookingStatus,
  getDoctor,
  updateDoctor,
  getDoctorAvailability,
  updateDoctorAvailability,
  getTreatments,
  updateTreatment,
  createTreatment,
  getAllEnquiries,
  updateEnquiryStatus,
  getClinicSettings,
  updateClinicSettings
} from '../services/dbService';
import {
  Appointment,
  PdcBooking,
  UserProfile,
  PdcPackage,
  Doctor,
  AvailabilityConfig,
  Treatment,
  Enquiry,
  ClinicSettings,
  AppointmentStatus,
  PdcBookingStatus
} from '../types';

export const AdminDashboard: React.FC = () => {
  const { userProfile, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'pdc' | 'packages' | 'availability' | 'treatments' | 'doctor' | 'enquiries' | 'settings'
  >('overview');

  // Database Records
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pdcBookings, setPdcBookings] = useState<PdcBooking[]>([]);
  const [patients, setPatients] = useState<UserProfile[]>([]);
  const [packages, setPackages] = useState<PdcPackage[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availability, setAvailability] = useState<AvailabilityConfig | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Package Edit State
  const [editingPkg, setEditingPkg] = useState<PdcPackage | null>(null);
  const [isNewPkg, setIsNewPkg] = useState(false);

  // Availability Edit State
  const [blockedDateInput, setBlockedDateInput] = useState('');

  // Doctor Edit State
  const [docFee, setDocFee] = useState<number>(850);
  const [docBio, setDocBio] = useState('');

  // Settings Edit State
  const [settingsPhone, setSettingsPhone] = useState('');
  const [settingsEmail, setSettingsEmail] = useState('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [appts, pdcs, usrs, pkgs, doc, avail, treats, enqs, stt] = await Promise.all([
        getAllAppointments(),
        getAllPdcBookings(),
        getAllUsers(),
        getPdcPackages(),
        getDoctor(),
        getDoctorAvailability(),
        getTreatments(),
        getAllEnquiries(),
        getClinicSettings(),
      ]);
      setAppointments(appts);
      setPdcBookings(pdcs);
      setPatients(usrs);
      setPackages(pkgs);
      setDoctor(doc);
      setAvailability(avail);
      setTreatments(treats);
      setEnquiries(enqs);
      setSettings(stt);

      if (doc) {
        setDocFee(doc.consultationFee);
        setDocBio(doc.bio);
      }
      if (stt) {
        setSettingsPhone(stt.phone);
        setSettingsEmail(stt.email);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Compute key metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter((a) => a.date === todayStr);
  const upcomingAppts = appointments.filter(
    (a) => a.date >= todayStr && a.status !== 'cancelled' && a.status !== 'completed'
  );
  const pendingBookings = [
    ...appointments.filter((a) => a.status === 'pending'),
    ...pdcBookings.filter((p) => p.bookingStatus === 'pending'),
  ];
  const totalRevenue =
    appointments.filter((a) => a.paymentStatus === 'paid').reduce((sum, a) => sum + a.fee, 0) +
    pdcBookings.filter((p) => p.paymentStatus === 'paid').reduce((sum, p) => sum + p.price, 0);

  // Status Handlers
  const handleUpdateApptStatus = async (id: string, newStatus: AppointmentStatus) => {
    await updateAppointmentStatus(id, newStatus);
    loadAllData();
  };

  const handleUpdatePdcStatus = async (id: string, newStatus: PdcBookingStatus) => {
    await updatePdcBookingStatus(id, newStatus);
    loadAllData();
  };

  // Package Save Handler (Allows admin to edit package prices & details directly!)
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;
    if (isNewPkg) {
      await createPdcPackage(editingPkg);
    } else {
      await updatePdcPackage(editingPkg.id, editingPkg);
    }
    setEditingPkg(null);
    setIsNewPkg(false);
    loadAllData();
  };

  // Availability Save Handler
  const handleToggleWorkingDay = async (day: number) => {
    if (!availability) return;
    const current = [...availability.workingDays];
    const index = current.indexOf(day);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(day);
    }
    const updated = { ...availability, workingDays: current.sort() };
    await updateDoctorAvailability(updated);
    setAvailability(updated);
  };

  const handleAddBlockedDate = async () => {
    if (!availability || !blockedDateInput) return;
    if (!availability.blockedDates.includes(blockedDateInput)) {
      const updated = {
        ...availability,
        blockedDates: [...availability.blockedDates, blockedDateInput].sort(),
      };
      await updateDoctorAvailability(updated);
      setAvailability(updated);
      setBlockedDateInput('');
    }
  };

  const handleRemoveBlockedDate = async (dateStr: string) => {
    if (!availability) return;
    const updated = {
      ...availability,
      blockedDates: availability.blockedDates.filter((d) => d !== dateStr),
    };
    await updateDoctorAvailability(updated);
    setAvailability(updated);
  };

  // Doctor Profile Save
  const handleSaveDoctor = async () => {
    if (!doctor) return;
    await updateDoctor(doctor.id, {
      consultationFee: docFee,
      bio: docBio,
    });
    alert('Doctor consultation fee and bio updated successfully!');
    loadAllData();
  };

  // Settings Save
  const handleSaveSettings = async () => {
    if (!settings) return;
    await updateClinicSettings({
      phone: settingsPhone,
      email: settingsEmail,
    });
    alert('Clinic contact settings updated!');
    loadAllData();
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-left">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0C281B] text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C29B38]">
            <ShieldCheck className="w-4 h-4" />
            Vaidyam Master Administration Console
          </div>
          <h1 className="font-serif text-3xl font-bold">Clinical Operations & Oversight</h1>
          <p className="text-xs text-white/70">
            Logged in as {userProfile?.name} • Real-time synchronization active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={logOut}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* METRIC OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>Today's Appts</span>
            <Clock className="w-4 h-4 text-[#2C6E49]" />
          </div>
          <strong className="text-2xl font-serif text-[#0C281B] block">
            {todayAppts.length}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>Upcoming</span>
            <Calendar className="w-4 h-4 text-[#2C6E49]" />
          </div>
          <strong className="text-2xl font-serif text-[#0C281B] block">
            {upcomingAppts.length}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>Pending Requests</span>
            <Clock className="w-4 h-4 text-[#E06D53]" />
          </div>
          <strong className="text-2xl font-serif text-[#E06D53] block">
            {pendingBookings.length}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>PDC Enrollments</span>
            <HeartPulse className="w-4 h-4 text-[#E06D53]" />
          </div>
          <strong className="text-2xl font-serif text-[#0C281B] block">
            {pdcBookings.length}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>Registered Patients</span>
            <Users className="w-4 h-4 text-[#2C6E49]" />
          </div>
          <strong className="text-2xl font-serif text-[#0C281B] block">
            {patients.length}
          </strong>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#143D27]/10 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[#143D27]/70">
            <span>Verified Revenue</span>
            <DollarSign className="w-4 h-4 text-[#C29B38]" />
          </div>
          <strong className="text-xl font-serif text-[#0C281B] block">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#143D27]/10">
        {[
          { id: 'overview', label: 'Overview & Schedule' },
          { id: 'appointments', label: `Appointments (${appointments.length})` },
          { id: 'pdc', label: `PDC Bookings (${pdcBookings.length})` },
          { id: 'packages', label: 'PDC Package Pricing' },
          { id: 'availability', label: 'Doctor Availability' },
          { id: 'treatments', label: 'Treatments Directory' },
          { id: 'doctor', label: 'Doctor Profile' },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
          { id: 'settings', label: 'Clinic Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#0C281B] text-white shadow'
                : 'text-[#143D27]/80 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* TAB: OVERVIEW & SCHEDULE */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Consultations */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#0C281B] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2C6E49]" />
                  <span>Today's Consultation Schedule ({todayStr})</span>
                </h3>
                <span className="text-xs font-semibold text-[#2C6E49]">
                  {todayAppts.length} appointments
                </span>
              </div>

              {todayAppts.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#143D27]/60">
                  No appointments scheduled for today.
                </div>
              ) : (
                <div className="space-y-3">
                  {todayAppts.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-[#0C281B] block">{appt.patientName}</strong>
                        <span className="text-[#143D27]/60">
                          {appt.timeSlot} • {appt.appointmentType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            appt.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {appt.status}
                        </span>
                        <button
                          onClick={() => handleUpdateApptStatus(appt.id, 'completed')}
                          className="px-2 py-1 bg-[#2C6E49] text-white rounded-lg text-[10px]"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Action Items */}
            <div className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#0C281B] flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-[#E06D53]" />
                  <span>Pending Care Enquiries & Enrollments</span>
                </h3>
                <span className="text-xs font-semibold text-[#E06D53]">
                  {pendingBookings.length} pending
                </span>
              </div>

              {pendingBookings.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#143D27]/60">
                  All requests processed! No pending items.
                </div>
              ) : (
                <div className="space-y-3">
                  {pdcBookings
                    .filter((p) => p.bookingStatus === 'pending')
                    .slice(0, 4)
                    .map((pdc) => (
                      <div
                        key={pdc.id}
                        className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-[#0C281B] block">
                            {pdc.patientName} • {pdc.packageName} ({pdc.durationDays}D)
                          </strong>
                          <span className="text-[#143D27]/70">
                            Starts {pdc.startDate} • {pdc.patientPhone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdatePdcStatus(pdc.id, 'confirmed')}
                            className="px-2.5 py-1 bg-[#2C6E49] text-white rounded-lg text-[10px] font-semibold"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdatePdcStatus(pdc.id, 'cancelled')}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-[10px]"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: APPOINTMENTS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'appointments' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
              Consultation Appointments
            </h3>

            {/* Filter & Search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#143D27]/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search patient / ref..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#143D27]/70 border-b border-[#143D27]/10">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Symptoms / Notes</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#143D27]/10">
                {appointments
                  .filter((a) => {
                    const matchesSearch =
                      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      a.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
                    return matchesSearch && matchesStatus;
                  })
                  .map((a) => (
                    <tr key={a.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="p-3 font-mono text-[10px] font-bold">{a.id}</td>
                      <td className="p-3">
                        <strong className="block text-[#0C281B]">{a.patientName}</strong>
                        <span className="text-[#143D27]/60 text-[10px]">{a.patientPhone}</span>
                      </td>
                      <td className="p-3">
                        <div>{a.date}</div>
                        <div className="text-[10px] text-[#143D27]/60 font-semibold">{a.timeSlot}</div>
                      </td>
                      <td className="p-3 capitalize">{a.appointmentType.replace('_', ' ')}</td>
                      <td className="p-3 max-w-xs truncate" title={a.symptoms}>
                        {a.symptoms}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          ₹{a.fee} ({a.paymentStatus})
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : a.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : a.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        {a.status !== 'confirmed' && (
                          <button
                            onClick={() => handleUpdateApptStatus(a.id, 'confirmed')}
                            className="px-2 py-1 bg-[#2C6E49] text-white rounded text-[10px]"
                            title="Confirm appointment"
                          >
                            Confirm
                          </button>
                        )}
                        {a.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateApptStatus(a.id, 'completed')}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-[10px]"
                            title="Mark completed"
                          >
                            Done
                          </button>
                        )}
                        {a.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateApptStatus(a.id, 'cancelled')}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded text-[10px]"
                            title="Cancel appointment"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: PDC BOOKINGS MANAGEMENT */}
      {/* ========================================================= */}
      {activeTab === 'pdc' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
              Post-Delivery Care (PDC) Enrollments
            </h3>
            <span className="text-xs text-[#143D27]/70">
              Total Enrollments: {pdcBookings.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#143D27]/70 border-b border-[#143D27]/10">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Mother Name</th>
                  <th className="p-3">Package</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">Location & Scope</th>
                  <th className="p-3">Price & Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#143D27]/10">
                {pdcBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="p-3 font-mono text-[10px] font-bold">{b.id}</td>
                    <td className="p-3">
                      <strong className="block text-[#0C281B]">{b.patientName}</strong>
                      <span className="text-[#143D27]/60 text-[10px]">{b.patientPhone}</span>
                    </td>
                    <td className="p-3 font-semibold text-[#0C281B]">
                      {b.packageName} ({b.durationDays}D)
                    </td>
                    <td className="p-3">{b.startDate}</td>
                    <td className="p-3 capitalize">
                      <div>{b.preferredLocation.replace('_', ' ')}</div>
                      <div className="text-[10px] text-[#143D27]/60">
                        {b.careRequirement.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="p-3">
                      <div>₹{b.price.toLocaleString('en-IN')}</div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          b.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : b.bookingStatus === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : b.bookingStatus === 'completed'
                            ? 'bg-purple-100 text-purple-800'
                            : b.bookingStatus === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      {b.bookingStatus !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdatePdcStatus(b.id, 'confirmed')}
                          className="px-2 py-1 bg-[#2C6E49] text-white rounded text-[10px]"
                        >
                          Confirm
                        </button>
                      )}
                      {b.bookingStatus !== 'active' && b.bookingStatus === 'confirmed' && (
                        <button
                          onClick={() => handleUpdatePdcStatus(b.id, 'active')}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-[10px]"
                        >
                          Start
                        </button>
                      )}
                      {b.bookingStatus !== 'completed' && (
                        <button
                          onClick={() => handleUpdatePdcStatus(b.id, 'completed')}
                          className="px-2 py-1 bg-purple-600 text-white rounded text-[10px]"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: PDC PACKAGES & DYNAMIC PRICING MANAGER */}
      {/* (Requirement: Admin can edit package prices without changing code) */}
      {/* ========================================================= */}
      {activeTab === 'packages' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
                PDC Packages & Dynamic Pricing Editor
              </h3>
              <p className="text-xs text-[#143D27]/70">
                Update prices, durations, descriptions, and inclusions live in Firestore database.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingPkg({
                  id: `pdc_${Date.now()}`,
                  name: 'New Care Package',
                  durationDays: 14,
                  price: 45000,
                  description: 'Comprehensive postpartum rejuvenation package.',
                  inclusions: ['Daily Herbal Abhyanga', 'Doctor Consultations'],
                  exclusions: ['Emergency surgery'],
                  accommodation: 'Sanctuary or Home-Care',
                  food: 'Mathruka Diet Included',
                  motherAndBabyOption: true,
                  sessionsCount: 14,
                  consultationsIncluded: 3,
                  homeCareAvailable: true,
                  active: true,
                  order: packages.length + 1,
                });
                setIsNewPkg(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2C6E49] text-white rounded-xl text-xs font-semibold shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </button>
          </div>

          {/* Package Editor Modal / Drawer */}
          {editingPkg && (
            <form
              onSubmit={handleSavePackage}
              className="p-6 bg-[#FAF8F5] rounded-3xl border border-[#2C6E49]/30 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold text-[#0C281B]">
                  {isNewPkg ? 'Create New PDC Package' : `Edit Package: ${editingPkg.name}`}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="text-xs text-[#143D27]/60 hover:text-black font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Package Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.name}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingPkg.durationDays}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Package Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={editingPkg.price}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white font-bold text-[#2C6E49]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingPkg.description}
                  onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Therapy Sessions Count
                  </label>
                  <input
                    type="number"
                    value={editingPkg.sessionsCount}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, sessionsCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#143D27] block mb-1">
                    Doctor Consultations Included
                  </label>
                  <input
                    type="number"
                    value={editingPkg.consultationsIncluded}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        consultationsIncluded: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-white"
                  />
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={editingPkg.motherAndBabyOption}
                      onChange={(e) =>
                        setEditingPkg({ ...editingPkg, motherAndBabyOption: e.target.checked })
                      }
                      className="rounded text-[#2C6E49]"
                    />
                    <span>Mother & Baby</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={editingPkg.active}
                      onChange={(e) => setEditingPkg({ ...editingPkg, active: e.target.checked })}
                      className="rounded text-[#2C6E49]"
                    />
                    <span>Active in Catalog</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2C6E49] text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Changes to Database
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2.5 border border-[#143D27]/20 rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Packages Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#143D27]/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#143D27]/10 text-[#0C281B]">
                      {pkg.durationDays} Days
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pkg.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {pkg.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#0C281B]">{pkg.name}</h4>
                  <div className="text-2xl font-serif font-bold text-[#2C6E49]">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-[#143D27]/70 line-clamp-2">{pkg.description}</p>
                </div>

                <div className="pt-3 border-t border-[#143D27]/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingPkg(pkg);
                      setIsNewPkg(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#143D27]/20 rounded-xl text-xs font-semibold text-[#0C281B] hover:bg-[#FAF8F5]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Price / Details</span>
                  </button>

                  <button
                    onClick={() => updatePdcPackage(pkg.id, { active: !pkg.active }).then(loadAllData)}
                    className="text-xs font-semibold text-[#143D27]/70 hover:underline"
                  >
                    {pkg.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: DOCTOR AVAILABILITY & BLOCKED DATES */}
      {/* ========================================================= */}
      {activeTab === 'availability' && availability && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
              Consultation Availability & Working Schedule
            </h3>
            <p className="text-xs text-[#143D27]/70">
              Control working days, clinic operating hours, slot intervals, and blackout dates.
            </p>
          </div>

          {/* Working Days */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
              Active Working Days
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {dayNames.map((name, dayIndex) => {
                const isActive = availability.workingDays.includes(dayIndex);
                return (
                  <button
                    key={dayIndex}
                    onClick={() => handleToggleWorkingDay(dayIndex)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#2C6E49] text-white shadow-sm'
                        : 'bg-[#FAF8F5] text-gray-500 border border-[#143D27]/10'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operating hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Consultation Start Time
              </label>
              <input
                type="time"
                value={availability.startTime}
                onChange={(e) => {
                  const updated = { ...availability, startTime: e.target.value };
                  updateDoctorAvailability(updated);
                  setAvailability(updated);
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Consultation End Time
              </label>
              <input
                type="time"
                value={availability.endTime}
                onChange={(e) => {
                  const updated = { ...availability, endTime: e.target.value };
                  updateDoctorAvailability(updated);
                  setAvailability(updated);
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Slot Duration (Minutes)
              </label>
              <input
                type="number"
                value={availability.slotDurationMinutes}
                onChange={(e) => {
                  const updated = {
                    ...availability,
                    slotDurationMinutes: Number(e.target.value),
                  };
                  updateDoctorAvailability(updated);
                  setAvailability(updated);
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              />
            </div>
          </div>

          {/* Blocked Dates */}
          <div className="pt-4 border-t border-[#143D27]/10 space-y-3">
            <label className="text-xs font-bold text-[#143D27] uppercase tracking-wider block">
              Blocked Vacation / Leave Dates
            </label>
            <div className="flex items-center gap-3 max-w-md">
              <input
                type="date"
                value={blockedDateInput}
                onChange={(e) => setBlockedDateInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              />
              <button
                type="button"
                onClick={handleAddBlockedDate}
                className="px-4 py-2 bg-[#E06D53] text-white rounded-xl text-xs font-semibold"
              >
                Block Date
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {availability.blockedDates.map((bDate) => (
                <span
                  key={bDate}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-xl text-xs font-mono"
                >
                  <span>{bDate}</span>
                  <button
                    onClick={() => handleRemoveBlockedDate(bDate)}
                    className="hover:text-red-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: DOCTOR PROFILE EDITOR */}
      {/* ========================================================= */}
      {activeTab === 'doctor' && doctor && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm max-w-3xl space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
              Doctor Profile & Consultation Pricing
            </h3>
            <p className="text-xs text-[#143D27]/70">
              Configure attending physician consultation fee and public profile details.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Doctor Full Name & Credentials
              </label>
              <input
                type="text"
                disabled
                value={doctor.name}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/10 text-xs bg-gray-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Consultation Fee (₹ INR)
              </label>
              <input
                type="number"
                value={docFee}
                onChange={(e) => setDocFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5] font-bold text-[#2C6E49]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#143D27] block mb-1">
                Professional Bio & Clinical Philosophy
              </label>
              <textarea
                rows={4}
                value={docBio}
                onChange={(e) => setDocBio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 text-xs bg-[#FAF8F5]"
              />
            </div>

            <button
              onClick={handleSaveDoctor}
              className="px-6 py-2.5 bg-[#2C6E49] text-white rounded-xl text-xs font-bold shadow"
            >
              Update Doctor Profile
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: ENQUIRIES */}
      {/* ========================================================= */}
      {activeTab === 'enquiries' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
            Patient Enquiries & Contact Submissions
          </h3>

          <div className="space-y-3">
            {enquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#143D27]/60">
                No enquiry messages received yet.
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#143D27]/10 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-[#0C281B]">{enq.name}</strong>
                      <span className="text-[#143D27]/60">({enq.phone} • {enq.email})</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          enq.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <div className="font-semibold text-[#143D27]">Subject: {enq.subject}</div>
                    <p className="text-[#143D27]/80 leading-relaxed font-light">{enq.message}</p>
                    <span className="text-[10px] text-[#143D27]/50 block">
                      Submitted: {new Date(enq.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'contacted').then(loadAllData)}
                      className="px-2.5 py-1 bg-[#143D27]/10 rounded-lg text-[10px] font-semibold"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'resolved').then(loadAllData)}
                      className="px-2.5 py-1 bg-[#2C6E49] text-white rounded-lg text-[10px] font-semibold"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: CLINIC SETTINGS */}
      {/* ========================================================= */}
      {activeTab === 'settings' && settings && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#143D27]/10 shadow-sm max-w-2xl space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
            Sanctuary & Business Settings
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#143D27] block mb-1">
                Clinic Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={settingsPhone}
                onChange={(e) => setSettingsPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#143D27] block mb-1">Clinic Email</label>
              <input
                type="email"
                value={settingsEmail}
                onChange={(e) => setSettingsEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#143D27]/20 bg-[#FAF8F5]"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 bg-[#2C6E49] text-white rounded-xl font-bold shadow"
            >
              Save Clinic Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
