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

  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentPage('dashboard');
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
        handleLogin();
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
            onLogin={() => setCurrentPage('login')}
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
        
        {/* Simple Login Mock */}
        {currentPage === 'login' && (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="bg-white p-8 rounded shadow-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Europa-Park Fan Login</h2>
                    <p className="mb-4 text-gray-600">Simulation: Ein Klick loggt dich ein.</p>
                    <button 
                        onClick={handleLogin}
                        className="bg-ep-blue text-white px-6 py-2 rounded hover:bg-blue-900"
                    >
                        Als Demo-Nutzer anmelden
                    </button>
                </div>
            </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">ResortPassAlarm</span>
            <p className="text-xs text-gray-400">Überwachung für Europa-Park ResortPass Gold & Silver.</p>
            <p className="text-xs text-gray-500 mt-1">Keine offizielle Seite des Europa-Park Resorts.</p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <button onClick={() => setCurrentPage('imprint')} className="hover:text-white text-gray-400">Impressum</button>
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-white text-gray-400">Datenschutz</button>
            <button onClick={() => setCurrentPage('partner-info')} className="hover:text-white text-gray-400">Partnerprogramm</button>
            <button onClick={() => setCurrentPage('admin')} className="hover:text-white text-gray-600">Admin Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;