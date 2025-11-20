import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AffiliateDashboard } from './pages/AffiliateDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { PartnerProgramPage } from './pages/PartnerProgramPage';
import { PartnerRegistration } from './pages/PartnerRegistration';
import { CustomerRegistration } from './pages/CustomerRegistration';
import { ImprintPage } from './pages/ImprintPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { User, AvailabilityStatus } from './types';
import { ArrowLeft, Briefcase, Lock } from 'lucide-react';
import { checkSession, loginUser, logoutUser } from './services/storageService';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Max Mustermann',
  email: 'max@beispiel.de',
  phoneNumber: '+49 170 1234567',
  isSubscribed: true,
  isAffiliate: true,
  isAdmin: false
};

const ADMIN_USER: User = {
  id: 'admin1',
  name: 'Dominik Hank',
  email: 'admin@resortpass-alarm.de',
  isSubscribed: true,
  isAffiliate: true,
  isAdmin: true
};

export interface StatusState {
    gold: AvailabilityStatus;
    silver: AvailabilityStatus;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  // Global state for the simulation
  const [mockStatus, setMockStatus] = useState<StatusState>({
      gold: AvailabilityStatus.SOLD_OUT,
      silver: AvailabilityStatus.SOLD_OUT
  });

  // Load session on mount
  useEffect(() => {
      const session = checkSession();
      if (session) {
          setUser(session);
          // Wenn User eingeloggt ist, aber auf Home ist, bleib auf Home oder geh zum Dashboard?
          // Standardverhalten: Bleib da wo du bist, aber User State ist da.
          // Falls wir auf einer "Auth-Only" Seite neu laden, müsste man das prüfen.
          // Einfachheitshalber bleiben wir auf 'home' initial, es sei denn wir wollen redirecten.
      }
  }, []);

  // Zentraler Navigations-Wrapper, der immer nach oben scrollt
  const navigateTo = (page: string) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
  };

  // Kunde Login
  const handleLogin = (asAdmin: boolean = false) => {
    const userToLogin = asAdmin ? ADMIN_USER : MOCK_USER;
    loginUser(userToLogin);
    setUser(userToLogin);
    navigateTo('dashboard');
  };

  // Partner Login (Spezifisch)
  const handlePartnerLogin = () => {
      const partnerUser = {
          ...MOCK_USER,
          name: 'Partner Demo',
          isAffiliate: true,
          isAdmin: false
      };
      loginUser(partnerUser);
      setUser(partnerUser);
      navigateTo('affiliate');
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigateTo('home');
  };

  // Funktion um User-Daten (z.B. Email/Tel) zu aktualisieren
  const handleUpdateUser = (updatedData: Partial<User>) => {
      if (user) {
          const newUser = { ...user, ...updatedData };
          loginUser(newUser); // Update storage
          setUser(newUser);
      }
  };

  const navigate = (page: string) => {
    if (!user && (page === 'dashboard' || page === 'affiliate')) {
        if (page === 'affiliate') {
            navigateTo('partner-login');
        } else {
            // Für Dashboard Zugriff -> Login Screen
            navigateTo('login'); 
        }
        return;
    }
    navigateTo(page);
  };

  // ADMIN ROUTE: Renders full screen without standard navbar
  if (currentPage === 'admin') {
      return <AdminPanel onBack={() => navigateTo('dashboard')} />;
  }

  // PARTNER REGISTRATION ROUTE: Full screen (Focus mode)
  if (currentPage === 'partner-register') {
      return (
        <PartnerRegistration 
            onBack={() => navigateTo('partner-info')}
            onLogin={() => navigateTo('partner-login')}
            onRegister={(userData) => {
                const newUser = {
                    id: 'p-' + Date.now(),
                    ...userData,
                    isAdmin: false
                };
                loginUser(newUser);
                setUser(newUser);
                navigateTo('affiliate');
            }}
        />
      );
  }

  // CUSTOMER REGISTRATION ROUTE: Full screen
  if (currentPage === 'customer-register') {
      return (
          <CustomerRegistration 
              onBack={() => navigateTo('home')}
              onLogin={() => navigateTo('login')}
              onRegister={(userData) => {
                  const newUser = {
                      id: 'c-' + Date.now(),
                      ...userData,
                      isAdmin: false
                  };
                  loginUser(newUser);
                  setUser(newUser);
                  navigateTo('dashboard');
              }}
          />
      );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        user={user} 
        onNavigate={navigate} 
        onLogout={handleLogout} 
        currentPage={currentPage}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <LandingPage 
            onSubscribe={() => {
                if (user) {
                    navigateTo('dashboard');
                } else {
                    navigateTo('customer-register');
                }
            }} 
            onPartner={() => {
                if (user?.isAffiliate) {
                    navigateTo('affiliate');
                } else {
                    // ÄNDERUNG: Gehe direkt zur Registrierung, nicht zur Info-Seite
                    navigateTo('partner-register');
                }
            }}
            onPartnerInfo={() => navigateTo('partner-info')}
          />
        )}
        
        {currentPage === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            mockStatus={mockStatus}
            setMockStatus={setMockStatus}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {currentPage === 'affiliate' && user && (
          <AffiliateDashboard />
        )}
        
        {currentPage === 'partner-info' && (
          <PartnerProgramPage 
              onJoin={() => {
                  navigateTo('partner-register');
              }}
              onBack={() => navigateTo('home')}
          />
        )}

        {currentPage === 'imprint' && (
          <ImprintPage />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage />
        )}
        
        {/* Simple Customer Login Mock */}
        {currentPage === 'login' && (
            <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-gray-200">
                    <div className="mb-6 flex justify-center">
                         <div className="h-12 w-12 bg-ep-blue rounded-full flex items-center justify-center text-white font-bold text-xl">C</div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Europa-Park Fan Login</h2>
                    <p className="mb-6 text-gray-600 text-sm">Melde dich an, um deine Alarme zu verwalten.</p>
                    
                    <div className="space-y-4">
                        <input type="email" placeholder="E-Mail Adresse" className="w-full p-2 border border-gray-300 rounded" defaultValue="demo@fan.de"/>
                        <input type="password" placeholder="Passwort" className="w-full p-2 border border-gray-300 rounded" defaultValue="password"/>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => handleLogin(false)}
                                className="w-full bg-ep-blue text-white px-4 py-3 rounded-md hover:bg-blue-900 font-bold transition-colors text-sm"
                            >
                                Als Kunde
                            </button>
                             <button 
                                onClick={() => handleLogin(true)}
                                className="w-full bg-gray-700 text-white px-4 py-3 rounded-md hover:bg-gray-800 font-bold transition-colors text-sm border border-gray-600"
                            >
                                Als Admin
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">(Wähle Admin um Zugriff auf Demo-Tools zu haben)</p>
                    </div>
                    <div className="mt-6 border-t pt-4 text-sm">
                        <button onClick={() => navigateTo('customer-register')} className="text-ep-blue hover:underline">Noch keinen Account? Registrieren</button>
                    </div>
                </div>
            </div>
        )}

        {/* Partner Login Mock */}
        {currentPage === 'partner-login' && (
            <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-t-4 border-ep-gold">
                    <div className="mb-6 flex justify-center">
                         <div className="h-12 w-12 bg-gray-900 rounded-full flex items-center justify-center text-ep-gold font-bold">
                             <Briefcase className="w-6 h-6"/>
                         </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Partner Programm Login</h2>
                    <p className="mb-6 text-gray-600 text-sm">Zugang für Affiliate Partner & Influencer.</p>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <input type="email" placeholder="Partner E-Mail" className="w-full p-3 border border-gray-300 rounded bg-gray-50" defaultValue="partner@demo.de"/>
                        </div>
                        <div className="relative">
                             <input type="password" placeholder="Passwort" className="w-full p-3 border border-gray-300 rounded bg-gray-50" defaultValue="secret"/>
                        </div>
                        
                        <button 
                            onClick={handlePartnerLogin}
                            className="w-full bg-ep-gold text-ep-blue px-6 py-3 rounded-md hover:bg-yellow-500 font-bold transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            <Lock className="w-4 h-4"/> Ins Partner Dashboard
                        </button>
                    </div>
                    <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                        <button onClick={() => navigateTo('home')} className="flex items-center hover:text-gray-900"><ArrowLeft className="w-3 h-3 mr-1"/> Zur Startseite</button>
                        <button onClick={() => navigateTo('partner-register')} className="text-ep-blue hover:underline font-medium">Partner werden</button>
                    </div>
                </div>
            </div>
        )}

      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-lg">ResortPassAlarm</span>
            <p className="text-xs text-gray-400">Überwachung für Europa-Park ResortPass Gold & Silver.</p>
            <p className="text-xs text-gray-500 mt-1">Keine offizielle Seite des Europa-Park Resorts.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400">
            <button onClick={() => navigateTo('imprint')} className="hover:text-white text-gray-400 transition-colors">Impressum</button>
            <button onClick={() => navigateTo('privacy')} className="hover:text-white text-gray-400 transition-colors">Datenschutz</button>
            <button onClick={() => navigateTo('partner-info')} className="hover:text-white text-gray-400 transition-colors">Partnerprogramm Infos</button>
            <button onClick={() => navigateTo('partner-login')} className="hover:text-white text-ep-gold font-medium transition-colors">Partner Login</button>
            <button onClick={() => navigateTo('admin')} className="hover:text-white text-gray-600 transition-colors border-l border-gray-600 pl-4">Admin Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;