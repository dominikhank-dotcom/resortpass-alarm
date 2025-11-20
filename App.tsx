import React, { useState } from 'react';
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

const MOCK_USER: User = {
  id: 'u1',
  name: 'Max Mustermann',
  email: 'max@beispiel.de',
  phoneNumber: '+49 170 1234567',
  isSubscribed: true,
  isAffiliate: true
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

  // Kunde Login
  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentPage('dashboard');
  };

  // Partner Login (Spezifisch)
  const handlePartnerLogin = () => {
      setUser({
          ...MOCK_USER,
          name: 'Partner Demo',
          isAffiliate: true
      });
      setCurrentPage('affiliate');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  // Funktion um User-Daten (z.B. Email/Tel) zu aktualisieren
  const handleUpdateUser = (updatedData: Partial<User>) => {
      if (user) {
          setUser({ ...user, ...updatedData });
      }
  };

  const navigate = (page: string) => {
    if (!user && (page === 'dashboard' || page === 'affiliate')) {
        if (page === 'affiliate') {
            setCurrentPage('partner-login');
        } else {
            handleLogin(); // Default fallback
        }
        return;
    }
    setCurrentPage(page);
  };

  // ADMIN ROUTE: Renders full screen without standard navbar
  if (currentPage === 'admin') {
      return <AdminPanel onBack={() => setCurrentPage('dashboard')} />;
  }

  // PARTNER REGISTRATION ROUTE: Full screen (Focus mode)
  if (currentPage === 'partner-register') {
      return (
        <PartnerRegistration 
            onBack={() => setCurrentPage('partner-info')}
            onLogin={() => setCurrentPage('partner-login')}
            onRegister={(userData) => {
                // Simulate creating a new partner user
                setUser({
                    id: 'p-' + Date.now(),
                    ...userData
                });
                setCurrentPage('affiliate');
            }}
        />
      );
  }

  // CUSTOMER REGISTRATION ROUTE: Full screen
  if (currentPage === 'customer-register') {
      return (
          <CustomerRegistration 
              onBack={() => setCurrentPage('home')}
              onLogin={() => setCurrentPage('login')}
              onRegister={(userData) => {
                  // Simulate creating a new customer (NOT SUBSCRIBED yet)
                  setUser({
                      id: 'c-' + Date.now(),
                      ...userData
                  });
                  setCurrentPage('dashboard');
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
                // Statt Mock-User zu setzen, gehen wir zur Registrierung
                if (user) {
                    setCurrentPage('dashboard');
                } else {
                    setCurrentPage('customer-register');
                }
            }} 
            onPartner={() => {
                // Falls schon eingeloggt -> Dashboard, sonst -> Info Seite -> Registrierung
                if (user?.isAffiliate) {
                    setCurrentPage('affiliate');
                } else {
                    setCurrentPage('partner-info');
                }
            }}
            onPartnerInfo={() => setCurrentPage('partner-info')}
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
                  setCurrentPage('partner-register');
              }}
              onBack={() => setCurrentPage('home')}
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
                        <button 
                            onClick={handleLogin}
                            className="w-full bg-ep-blue text-white px-6 py-3 rounded-md hover:bg-blue-900 font-bold transition-colors"
                        >
                            Einloggen
                        </button>
                    </div>
                    <div className="mt-6 border-t pt-4 text-sm">
                        <button onClick={() => setCurrentPage('customer-register')} className="text-ep-blue hover:underline">Noch keinen Account? Registrieren</button>
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
                        <button onClick={() => setCurrentPage('home')} className="flex items-center hover:text-gray-900"><ArrowLeft className="w-3 h-3 mr-1"/> Zur Startseite</button>
                        <button onClick={() => setCurrentPage('partner-register')} className="text-ep-blue hover:underline font-medium">Partner werden</button>
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
            <button onClick={() => setCurrentPage('imprint')} className="hover:text-white text-gray-400 transition-colors">Impressum</button>
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-white text-gray-400 transition-colors">Datenschutz</button>
            <button onClick={() => setCurrentPage('partner-info')} className="hover:text-white text-gray-400 transition-colors">Partnerprogramm Infos</button>
            <button onClick={() => setCurrentPage('partner-login')} className="hover:text-white text-ep-gold font-medium transition-colors">Partner Login</button>
            <button onClick={() => setCurrentPage('admin')} className="hover:text-white text-gray-600 transition-colors border-l border-gray-600 pl-4">Admin Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;