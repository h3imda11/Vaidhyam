import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { NotificationsModal } from './components/common/NotificationsModal';
import { ShopifyStoreModal } from './components/common/ShopifyStoreModal';
import { Home } from './pages/Home';
import { FertilityCare } from './pages/FertilityCare';
import { PregnancyCare } from './pages/PregnancyCare';
import { PostnatalCare } from './pages/PostnatalCare';
import { YogaWellness } from './pages/YogaWellness';
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
import { CancellationRefundPolicy } from './pages/CancellationRefundPolicy';
import { MedicalDisclaimer } from './pages/MedicalDisclaimer';
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
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedCategoryForBooking, setSelectedCategoryForBooking] = useState<string>(
    'General Health & Wellness'
  );

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
    if (params?.category) {
      setSelectedCategoryForBooking(params.category);
    }
    if (tab === 'store') {
      setIsStoreModalOpen(true);
      return;
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
    <div className="min-h-screen flex flex-col bg-[#FFFCF7] text-[#25352E] selection:bg-[#E85342]/20 selection:text-[#245B45]">
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
            onOpenStore={() => setIsStoreModalOpen(true)}
            doctor={doctor}
          />
        )}

        {currentTab === 'fertility-care' && (
          <FertilityCare
            doctor={doctor}
            onOpenBooking={() =>
              handleNavigate('book-appointment', { category: 'Fertility & Preconception' })
            }
          />
        )}

        {currentTab === 'pregnancy-care' && (
          <PregnancyCare
            doctor={doctor}
            onOpenBooking={() =>
              handleNavigate('book-appointment', { category: 'Pregnancy-Related Guidance' })
            }
          />
        )}

        {currentTab === 'postnatal-care' && (
          <PostnatalCare
            onOpenBooking={() =>
              handleNavigate('book-appointment', { category: 'Postnatal & Mother–Baby Care' })
            }
            onSelectPdcPackage={(pkgId) => {
              setSelectedPdcPackageId(pkgId);
              handleNavigate('pdc-details');
            }}
          />
        )}

        {currentTab === 'yoga-wellness' && (
          <YogaWellness
            onOpenBooking={() =>
              handleNavigate('book-appointment', { category: 'Lifestyle & Preventive Wellness' })
            }
          />
        )}

        {currentTab === 'pdc' && (
          <PostnatalCare
            onOpenBooking={() =>
              handleNavigate('book-appointment', { category: 'Postnatal & Mother–Baby Care' })
            }
            onSelectPdcPackage={(pkgId) => {
              setSelectedPdcPackageId(pkgId);
              handleNavigate('pdc-details');
            }}
          />
        )}

        {currentTab === 'pdc-details' && (
          <PdcPackageDetails
            packageId={selectedPdcPackageId}
            onBack={() => handleNavigate('postnatal-care')}
            onBookPackage={handleSelectPdcPackage}
          />
        )}

        {currentTab === 'pdc-booking' && activePdcPackage && (
          <PdcBookingFlow
            initialPackage={activePdcPackage}
            onBack={() => handleNavigate('postnatal-care')}
            onSuccess={handlePdcBookingSuccess}
            onNavigateLogin={() => handleNavigate('patient-login')}
          />
        )}

        {currentTab === 'consultations' && (
          <Consultations
            doctor={doctor}
            onOpenBooking={(cat) =>
              handleNavigate('book-appointment', { category: cat || 'General Health & Wellness' })
            }
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
            initialCategory={selectedCategoryForBooking}
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
            onExplorePdc={() => handleNavigate('postnatal-care')}
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
            onExplorePdc={() => handleNavigate('postnatal-care')}
          />
        )}

        {currentTab === 'faq' && (
          <FAQ onOpenBooking={() => handleNavigate('book-appointment')} />
        )}

        {currentTab === 'knowledge' && (
          <KnowledgeBase
            onOpenBooking={() => handleNavigate('book-appointment')}
            onExplorePdc={() => handleNavigate('postnatal-care')}
          />
        )}

        {currentTab === 'privacy' && <PrivacyPolicy />}

        {currentTab === 'terms' && <TermsConditions />}

        {currentTab === 'cancellation-policy' && (
          <CancellationRefundPolicy onBack={() => handleNavigate('home')} />
        )}

        {currentTab === 'disclaimer' && (
          <MedicalDisclaimer onBack={() => handleNavigate('home')} />
        )}
      </main>

      {/* Floating Online Enquiry Button */}
      <button
        onClick={() => handleNavigate('contact')}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 px-4 py-3 bg-[#E85342] hover:bg-[#CF3E30] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-xs"
        title="Send an Enquiry"
        aria-label="Send an Enquiry"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Enquire Online</span>
      </button>

      {/* Booking Confirmation Dialog */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#E4EAE4] w-full max-w-md overflow-hidden text-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EDF2ED] text-[#245B45] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#245B45] block">
                Booking Reference: {confirmedBooking.id}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#25352E]">
                {confirmedBooking.type === 'appointment'
                  ? 'Consultation Slot Reserved'
                  : 'PDC Care Enrollment Placed'}
              </h3>
              <p className="text-xs text-[#69766E] font-light">
                Registered for <strong>{confirmedBooking.patientName}</strong>. Our clinical coordinator
                has logged this reservation into the active schedule.
              </p>
            </div>

            <div className="p-4 bg-[#FFFCF7] rounded-2xl border border-[#E4EAE4] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#69766E]">Program:</span>
                <strong className="text-[#25352E] font-semibold">{confirmedBooking.title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69766E]">Schedule:</span>
                <strong className="text-[#25352E] font-semibold">{confirmedBooking.date}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69766E]">Total Fee:</span>
                <strong className="text-[#25352E] font-semibold">
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
                className="w-full py-3.5 bg-[#245B45] hover:bg-[#1b4634] text-white rounded-xl text-xs font-semibold shadow transition-all flex items-center justify-center gap-2"
              >
                <span>View in Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full py-2 text-xs font-medium text-[#69766E] hover:text-[#25352E]"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopify Store Modal */}
      <ShopifyStoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

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
      <Footer
        setCurrentTab={(tab) => handleNavigate(tab)}
        onOpenStore={() => setIsStoreModalOpen(true)}
      />
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
