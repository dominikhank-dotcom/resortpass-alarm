import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentPage }) => {
  return (
    <nav className="bg-ep-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="h-8 w-8 bg-ep-gold rounded-full flex items-center justify-center text-ep-blue font-bold">R</div>
              <span className="font-bold text-xl tracking-tight">ResortPass<span className="text-ep-gold">Alarm</span></span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'dashboard' ? 'bg-blue-800 text-ep-gold' : 'hover:bg-blue-800'}`}
                >
                  Dashboard
                </button>
                {/* Partner Button entfernt, Zugriff nur noch über Footer oder Direktlink */}
                <button 
                  onClick={onLogout}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('customer-register')}
                className="bg-ep-gold text-ep-blue hover:bg-ep-gold-light px-4 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Login / Registrieren
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};