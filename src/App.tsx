import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { NotificationsModal } from './components/common/NotificationsModal';
import { Home } from './pages/Home';
import { PostDeliveryCare } from './pages/PostDeliveryCare';
import { PdcPackageDetails } from './pages/PdcPackageDetails';
import { PdcBookingFlow } from './pages/PdcBookingFlow';
import { Consultations } from './pages/Consultations';
import { Treatments } from './pages/Treatments';
import { DoctorProfile } from './pages/DoctorProfile';
import { BookAppointment } from './pages/BookAppointment';
import { PatientAuth } from './pages/PatientAuth';
import { AdminAuth } from './pages/AdminAuth';
import { PatientDashboard } from './pages/PatientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Contact } from './pages/Contact';
import { AboutVaidyam } from './pages/AboutVaidyam';
import { FAQ } from './pages/FAQ';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { getDoctor } from './services/dbService';
import { Doctor, PdcPackage, Appointment, PdcBooking } from './types';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const MainApp: React.FC = () => {
  const { userProfile, isAdmin } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPdcPackageId, setSelectedPdcPackageId] = useState<string>('pdc_21_days');
  const [activePdcPackage, setActivePdcPackage] = useState<PdcPackage | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Success Confirmation Modal
  const [confirmedBooking, setConfirmedBooking] = useState<{
    type: 'appointment' | 'pdc';
    id: string;
    title: string;
    date: string;
    fee: number;
    patientName: string;
  } | null>(null);

  useEffect(() => {
    async function loadDoctor() {
      try {
        const doc = await getDoctor();
        setDoctor(doc);
      } catch {
        // silent
      }
    }
    loadDoctor();
  }, []);

  const handleNavigate = (tab: string, params?: any) => {
    if (params?.packageId) {
      setSelectedPdcPackageId(params.packageId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPdcPackage = (pkg: PdcPackage) => {
    setActivePdcPackage(pkg);
    setCurrentTab('pdc-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentSuccess = (appt: Appointment) => {
    setConfirmedBooking({
      type: 'appointment',
      id: appt.id,
      title: `Consultation with ${appt.doctorName}`,
      date: `${appt.date} at ${appt.timeSlot}`,
      fee: appt.fee,
      patientName: appt.patientName,
    });
  };

  const handlePdcBookingSuccess = (booking: PdcBooking) => {
    setConfirmedBooking({
      type: 'pdc',
      id: booking.id,
      title: `Enrollment: ${booking.packageName} (${booking.durationDays} Days)`,
      date: `Starting on ${booking.startDate}`,
      fee: booking.price,
      patientName: booking.patientName,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0C281B] selection:bg-[#E06D53]/20 selection:text-[#0C281B]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigate(tab)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onOpenBooking={() => handleNavigate('book-appointment')}
            onSelectPdcPackage={handleSelectPdcPackage}
          />
        )}

        {currentTab === 'pdc' && (
          <PostDeliveryCare
            onNavigate={handleNavigate}
            onSelectPdcPackage={handleSelectPdcPackage}
            onOpenBooking={() => handleNavigate('book-appointment')}
          />
        )}

        {currentTab === 'pdc-details' && (
          <PdcPackageDetails
            packageId={selectedPdcPackageId}
            onBack={() => handleNavigate('pdc')}
            onBookPackage={handleSelectPdcPackage}
          />
        )}

        {currentTab === 'pdc-booking' && activePdcPackage && (
          <PdcBookingFlow
            initialPackage={activePdcPackage}
            onBack={() => handleNavigate('pdc')}
            onSuccess={handlePdcBookingSuccess}
            onNavigateLogin={() => handleNavigate('patient-login')}
          />
        )}

        {currentTab === 'consultations' && (
          <Consultations
            doctor={doctor}
            onOpenBooking={() => handleNavigate('book-appointment')}
            onNavigateDoctor={() => handleNavigate('doctor')}
          />
        )}

        {currentTab === 'treatments' && (
          <Treatments
            onOpenBooking={() => handleNavigate('book-appointment')}
          />
        )}

        {currentTab === 'doctor' && (
          <DoctorProfile
            doctor={doctor}
            onOpenBooking={() => handleNavigate('book-appointment')}
          />
        )}

        {currentTab === 'book-appointment' && (
          <BookAppointment
            onSuccess={handleAppointmentSuccess}
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentTab === 'patient-login' && (
          <PatientAuth
            initialMode="login"
            onSuccess={() => handleNavigate('patient-dashboard')}
            onNavigateAdmin={() => handleNavigate('admin-login')}
          />
        )}

        {currentTab === 'patient-signup' && (
          <PatientAuth
            initialMode="signup"
            onSuccess={() => handleNavigate('patient-dashboard')}
            onNavigateAdmin={() => handleNavigate('admin-login')}
          />
        )}

        {currentTab === 'patient-dashboard' && (
          <PatientDashboard
            onOpenBooking={() => handleNavigate('book-appointment')}
            onExplorePdc={() => handleNavigate('pdc')}
          />
        )}

        {currentTab === 'admin-login' && (
          <AdminAuth
            onSuccess={() => handleNavigate('admin-dashboard')}
            onNavigatePatient={() => handleNavigate('patient-login')}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard />
        )}

        {currentTab === 'contact' && <Contact />}

        {currentTab === 'about' && (
          <AboutVaidyam
            onOpenBooking={() => handleNavigate('book-appointment')}
            onExplorePdc={() => handleNavigate('pdc')}
          />
        )}

        {currentTab === 'faq' && (
          <FAQ onOpenBooking={() => handleNavigate('book-appointment')} />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeBase
            onOpenBooking={() => handleNavigate('book-appointment')}
            onExplorePdc={() => handleNavigate('pdc')}
          />
        )}

        {currentTab === 'privacy' && <PrivacyPolicy />}

        {currentTab === 'terms' && <TermsConditions />}
      </main>

      {/* Floating Online Enquiry Button */}
      <button
        onClick={() => handleNavigate('contact')}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 px-4 py-3 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-xs"
        title="Send an Enquiry"
        aria-label="Send an Enquiry"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Enquire Online</span>
      </button>

      {/* Booking Confirmation Dialog */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#143D27]/10 w-full max-w-md overflow-hidden text-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2C6E49] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C6E49] block">
                Booking Reference: {confirmedBooking.id}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0C281B]">
                {confirmedBooking.type === 'appointment'
                  ? 'Consultation Slot Reserved'
                  : 'PDC Care Enrollment Placed'}
              </h3>
              <p className="text-xs text-[#143D27]/70 font-light">
                Registered for <strong>{confirmedBooking.patientName}</strong>. Our clinical coordinator
                has logged this reservation into the active schedule.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#143D27]/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Program:</span>
                <strong className="text-[#0C281B] font-semibold">{confirmedBooking.title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Schedule:</span>
                <strong className="text-[#0C281B] font-semibold">{confirmedBooking.date}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#143D27]/70">Total Fee:</span>
                <strong className="text-[#0C281B] font-semibold">
                  ₹{confirmedBooking.fee.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  handleNavigate(
                    userProfile?.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard'
                  );
                }}
                className="w-full py-3.5 bg-[#E06D53] hover:bg-[#C4573E] text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center justify-center gap-2"
              >
                <span>View in Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2 text-xs font-medium text-[#143D27]/70 hover:text-black"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(tab) => {
          setIsNotificationsOpen(false);
          handleNavigate(tab);
        }}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => handleNavigate(tab)}
      />

      {/* Global Footer */}
      <Footer setCurrentTab={(tab) => handleNavigate(tab)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
