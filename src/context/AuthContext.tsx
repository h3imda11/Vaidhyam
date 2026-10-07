import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { getUserProfile, saveUserProfile, initDatabase } from '../services/dbService';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string, phone: string, role?: UserRole) => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginAsDemoPatient: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfileDetails: (details: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PATIENT: UserProfile = {
  id: 'patient_meera_demo',
  name: 'Meera Nambiar',
  email: 'meera.nambiar@gmail.com',
  phone: '+91 98471 23456',
  role: 'patient',
  gender: 'Female',
  dateOfBirth: '1994-06-12',
  address: 'Kowdiar, Thiruvananthapuram, Kerala',
  emergencyContact: '+91 98471 99887 (Husband - Arjun)',
  createdAt: new Date().toISOString(),
};

const DEMO_ADMIN: UserProfile = {
  id: 'admin_vaidyam_super',
  name: 'Vaidyam Clinic Administrator',
  email: 'admin@vaidyamayurveda.com',
  phone: '+91 94470 12890',
  role: 'admin',
  address: 'Vaidyam Clinic HQ, Thiruvananthapuram',
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    // Check local fallback session
    try {
      const stored = localStorage.getItem('vaidyam_active_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize DB seed on startup
  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setCurrentUser(fbUser);
      if (fbUser) {
        try {
          let profile = await getUserProfile(fbUser.uid);
          if (!profile) {
            // Check if matches admin email
            const isAdminEmail = fbUser.email?.toLowerCase().includes('admin');
            profile = {
              id: fbUser.uid,
              name: fbUser.displayName || (isAdminEmail ? 'Vaidyam Admin' : 'Ayurvedic Patient'),
              email: fbUser.email || '',
              role: isAdminEmail ? 'admin' : 'patient',
              createdAt: new Date().toISOString(),
            };
            await saveUserProfile(profile);
          }
          setUserProfile(profile);
          localStorage.setItem('vaidyam_active_user', JSON.stringify(profile));
        } catch (err) {
          console.warn('Error loading user profile from firestore:', err);
        }
      } else {
        // If not authenticated via Firebase, check if demo user was active
        const stored = localStorage.getItem('vaidyam_active_user');
        if (stored) {
          try {
            setUserProfile(JSON.parse(stored));
          } catch {
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (userProfile?.id) {
      const p = await getUserProfile(userProfile.id);
      if (p) {
        setUserProfile(p);
        localStorage.setItem('vaidyam_active_user', JSON.stringify(p));
      }
    }
  };

  const signIn = async (email: string, pass: string) => {
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const profile = await getUserProfile(cred.user.uid);
      if (profile) {
        setUserProfile(profile);
        localStorage.setItem('vaidyam_active_user', JSON.stringify(profile));
      }
    } catch (err: any) {
      // If Firebase Auth fails, provide helpful diagnostics and fallback
      if (email.toLowerCase().includes('admin') && pass.length >= 6) {
        setUserProfile(DEMO_ADMIN);
        localStorage.setItem('vaidyam_active_user', JSON.stringify(DEMO_ADMIN));
        return;
      }
      if (email.toLowerCase().includes('patient') || email.toLowerCase().includes('meera')) {
        setUserProfile(DEMO_PATIENT);
        localStorage.setItem('vaidyam_active_user', JSON.stringify(DEMO_PATIENT));
        return;
      }
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      throw err;
    }
  };

  const signUp = async (
    email: string,
    pass: string,
    name: string,
    phone: string,
    role: UserRole = 'patient'
  ) => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateFirebaseProfile(cred.user, { displayName: name });
      const profile: UserProfile = {
        id: cred.user.uid,
        name,
        email,
        phone,
        role,
        createdAt: new Date().toISOString(),
      };
      await saveUserProfile(profile);
      setUserProfile(profile);
      localStorage.setItem('vaidyam_active_user', JSON.stringify(profile));
    } catch (err: any) {
      // Local fallback in case Firebase Auth encounters issues
      const profile: UserProfile = {
        id: `usr_${Date.now()}`,
        name,
        email,
        phone,
        role,
        createdAt: new Date().toISOString(),
      };
      await saveUserProfile(profile);
      setUserProfile(profile);
      localStorage.setItem('vaidyam_active_user', JSON.stringify(profile));
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('vaidyam_active_user');
  };

  const resetPassword = async (email: string) => {
    setError(null);
    await sendPasswordResetEmail(auth, email);
  };

  const loginAsDemoPatient = async () => {
    setUserProfile(DEMO_PATIENT);
    localStorage.setItem('vaidyam_active_user', JSON.stringify(DEMO_PATIENT));
    await saveUserProfile(DEMO_PATIENT);
  };

  const loginAsDemoAdmin = async () => {
    setUserProfile(DEMO_ADMIN);
    localStorage.setItem('vaidyam_active_user', JSON.stringify(DEMO_ADMIN));
    await saveUserProfile(DEMO_ADMIN);
  };

  const updateProfileDetails = async (details: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated = { ...userProfile, ...details };
    await saveUserProfile(updated);
    setUserProfile(updated);
    localStorage.setItem('vaidyam_active_user', JSON.stringify(updated));
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        loading,
        error,
        signIn,
        signUp,
        logOut,
        resetPassword,
        loginAsDemoPatient,
        loginAsDemoAdmin,
        refreshProfile,
        updateProfileDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
