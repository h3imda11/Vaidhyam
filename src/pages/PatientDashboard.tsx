import React, { useState, useEffect } from 'react';
import {
  Calendar,
  HeartPulse,
  User,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit3,
  Video,
  Building,
  Phone,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getPatientAppointments,
  getPatientPdcBookings,
  updateAppointmentStatus
} from '../services/dbService';
import { Appointment, PdcBooking } from '../types';

interface PatientDashboardProps {
  onOpenBooking: () => void;
  onExplorePdc: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onOpenBooking,
  onExplorePdc,
}) => {
  const { userProfile, logOut, updateProfileDetails } = useAuth();
  const [activeTab, setActiveTab] = useState<'appointments' | 'pdc' | 'profile'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pdcBookings, setPdcBookings] = useState<PdcBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit
  const [editingProfile, setEditingProfile] = useState(false);
  const [name, setName] = useState(userProfile?.name || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [emergencyContact, setEmergencyContact] = useState(userProfile?.emergencyContact || '');

  const loadUserData = async () => {
    if (!userProfile) return;
    setLoading(true);
    try {
      const [appts, pdcs] = await Promise.all([
        getPatientAppointments(userProfile.id),
        getPatientPdcBookings(userProfile.id),
      ]);
      setAppointments(appts);
      setPdcBookings(pdcs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userProfile]);

  const handleCancelAppointment = async (apptId: string) => {
    if (window.confirm('Are you sure you want to cancel this consultation?')) {
      await updateAppointmentStatus(apptId, 'cancelled', 'Cancelled by patient');
      loadUserData();
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileDetails({
      name,
      phone,
      address,
      emergencyContact,
    });
    setEditingProfile(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2C6E49]/15 text-[#2C6E49]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
            Paid Online
          </span>
        );
      case 'pay_at_clinic':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            Pay at Sanctuary
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24 text-left">
      {/* Welcome banner */}
      <div className="p-8 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2C6E49]/10 text-[#2C6E49] flex items-center justify-center font-bold text-2xl font-serif">
            {userProfile?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0C281B]">
                Welcome, {userProfile?.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2C6E49]/10 text-[#2C6E49] uppercase">
                Patient Member
              </span>
            </div>
            <p className="text-xs text-[#143D27]/70 mt-1">
              {userProfile?.email} • {userProfile?.phone || 'No phone registered'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadUserData}
            className="p-2.5 rounded-xl border border-[#143D27]/20 text-[#143D27] hover:bg-[#FAF8F5] transition-colors"
            title="Refresh records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all"
          >
            Book Consultation
          </button>
          <button
            onClick={logOut}
            className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#143D27]/10 pb-2">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'appointments'
              ? 'bg-[#0C281B] text-white shadow'
              : 'text-[#143D27]/70 hover:bg-white'
          }`}
        >
          Consultations ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('pdc')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pdc'
              ? 'bg-[#0C281B] text-white shadow'
              : 'text-[#143D27]/70 hover:bg-white'
          }`}
        >
          Post-Delivery Care ({pdcBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-[#0C281B] text-white shadow'
              : 'text-[#143D27]/70 hover:bg-white'
          }`}
        >
          My Profile & Records
        </button>
      </div>

      {/* TAB 1: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#143D27]/60">
              Loading your appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-[#143D27]/10 text-center space-y-4">
              <Calendar className="w-12 h-12 text-[#143D27]/30 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                No Appointments Scheduled
              </h3>
              <p className="text-xs text-[#143D27]/70 max-w-sm mx-auto font-light">
                You do not have any upcoming or past consultation appointments. Connect with Dr. Ananya
                to review your symptoms or postnatal plan.
              </p>
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all"
              >
                Book Your First Consultation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[#143D27]/60 font-mono block">
                          Ref: {appt.id}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-[#0C281B]">
                          Consultation with {appt.doctorName && !appt.doctorName.includes('Ananya') ? appt.doctorName : 'Ayurvedic Physician'}
                        </h4>
                      </div>
                      <div className="text-right space-y-1">
                        {getStatusBadge(appt.status)}
                        <div>{getPaymentBadge(appt.paymentStatus)}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#143D27]/5 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Date & Time</span>
                        <strong className="text-[#0C281B]">
                          {appt.date} • {appt.timeSlot}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Mode</span>
                        <strong className="text-[#0C281B] capitalize">
                          {appt.appointmentType.replace('_', ' ')}
                        </strong>
                      </div>
                    </div>

                    <div className="text-xs text-[#143D27]/80">
                      <strong>Reason: </strong>
                      <span className="font-light">{appt.symptoms}</span>
                    </div>

                    {appt.notes && (
                      <div className="p-2.5 bg-[#E8F5E9] rounded-xl text-xs text-[#0C281B]">
                        <strong>Doctor / Clinic Note: </strong>
                        <span>{appt.notes}</span>
                      </div>
                    )}
                  </div>

                  {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                    <div className="pt-3 border-t border-[#143D27]/10 flex items-center justify-between">
                      <span className="text-[11px] text-[#143D27]/60">
                        Fee: ₹{appt.fee}
                      </span>
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold"
                      >
                        Cancel Consultation
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: POST-DELIVERY CARE (PDC) BOOKINGS */}
      {activeTab === 'pdc' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#143D27]/60">
              Loading your PDC care enrollments...
            </div>
          ) : pdcBookings.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-[#143D27]/10 text-center space-y-4">
              <HeartPulse className="w-12 h-12 text-[#E06D53]/40 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#0C281B]">
                No PDC Care Packages Enrolled
              </h3>
              <p className="text-xs text-[#143D27]/70 max-w-sm mx-auto font-light">
                You have not booked any Sutika Paricharya post-delivery care packages yet. Explore our
                classical 7 to 42-day maternal rejuvenation programs.
              </p>
              <button
                onClick={onExplorePdc}
                className="px-6 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all"
              >
                Explore Post-Delivery Care Programs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pdcBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-white border border-[#143D27]/10 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[#143D27]/60 font-mono block">
                          Ref: {b.id}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-[#0C281B]">
                          {b.packageName} ({b.durationDays} Days)
                        </h4>
                      </div>
                      <div className="text-right space-y-1">
                        {getStatusBadge(b.bookingStatus)}
                        <div>{getPaymentBadge(b.paymentStatus)}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#143D27]/5 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Start Date</span>
                        <strong className="text-[#0C281B]">{b.startDate}</strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Location</span>
                        <strong className="text-[#0C281B] capitalize">
                          {b.preferredLocation === 'clinic_retreat' ? 'Sanctuary Retreat' : 'Home-Care'}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Care Scope</span>
                        <strong className="text-[#0C281B] capitalize">
                          {b.careRequirement.replace('_', ' ')}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[#143D27]/60 block text-[10px]">Package Investment</span>
                        <strong className="text-[#0C281B]">₹{b.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>

                    {b.adminNotes && (
                      <div className="p-2.5 bg-[#E8F5E9] rounded-xl text-xs text-[#0C281B]">
                        <strong>Sanctuary Coordinator Note: </strong>
                        <span>{b.adminNotes}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#143D27]/10 text-xs text-[#143D27]/70">
                    Enrolled on {new Date(b.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white p-8 rounded-3xl border border-[#143D27]/10 shadow-sm max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#0C281B]">Patient Profile</h3>
            {!editingProfile && (
              <button
                onClick={() => setEditingProfile(true)}
                className="flex items-center gap-1.5 text-xs text-[#2C6E49] font-bold hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {editingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, Postal Code"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#143D27] block mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. Husband / Family Member (+91 ...)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#143D27]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6E49] bg-[#FAF8F5]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2C6E49] text-white rounded-xl text-xs font-semibold shadow"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                  className="px-4 py-2.5 border border-[#143D27]/20 text-[#143D27] rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/5">
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Registered Name</span>
                  <strong className="text-[#0C281B] text-sm">{userProfile?.name}</strong>
                </div>
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Email</span>
                  <strong className="text-[#0C281B] text-sm">{userProfile?.email}</strong>
                </div>
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Phone</span>
                  <strong className="text-[#0C281B] text-sm">{userProfile?.phone || 'Not set'}</strong>
                </div>
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Date of Birth</span>
                  <strong className="text-[#0C281B] text-sm">
                    {userProfile?.dateOfBirth || 'Not set'}
                  </strong>
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/5 space-y-2">
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Residential Address</span>
                  <p className="text-[#0C281B]">{userProfile?.address || 'No address added'}</p>
                </div>
                <div>
                  <span className="text-[#143D27]/60 block text-[10px]">Emergency Contact</span>
                  <p className="text-[#0C281B]">
                    {userProfile?.emergencyContact || 'No emergency contact registered'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
