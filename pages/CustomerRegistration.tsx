import React, { useState } from 'react';
import { User, Mail, Lock, Loader2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface CustomerRegistrationProps {
  onRegister: (userData: any) => void;
  onLogin: () => void;
  onBack: () => void;
}

export const CustomerRegistration: React.FC<CustomerRegistrationProps> = ({ onRegister, onLogin, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Fehler zurücksetzen, wenn der Nutzer tippt
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        setError('Die Passwörter stimmen nicht überein.');
        return;
    }

    if (formData.password.length < 6) {
        setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
        return;
    }

    setIsLoading(true);
    
    // Simulation einer API-Registrierung
    setTimeout(() => {
      setIsLoading(false);
      // Wir erstellen einen User, der noch KEIN Abo hat (isSubscribed: false)
      onRegister({
        name: formData.name,
        email: formData.email,
        isAffiliate: false,
        isSubscribed: false 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center cursor-pointer" onClick={onBack}>
            <div className="h-12 w-12 bg-ep-blue rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-ep-gold">R</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Account erstellen
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Der erste Schritt zu deinem ResortPass.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Dein Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="Max Mustermann"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-Mail Adresse
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="deine@email.de"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Passwort festlegen
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Passwort wiederholen
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ep-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ep-blue transition-colors disabled:opacity-70 items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                            <>
                                Weiter zur Buchung <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
            
             <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Bereits Kunde?</span>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button onClick={onLogin} className="text-sm font-medium text-ep-blue hover:text-blue-800">
                        Hier einloggen
                    </button>
                </div>
            </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 max-w-xs mx-auto">
            <div className="flex items-center justify-center gap-1 mb-2">
                <ShieldCheck className="w-4 h-4 text-green-600"/>
                <span>Sichere SSL-Verschlüsselung</span>
            </div>
            Indem du fortfährst, stimmst du unseren Nutzungsbedingungen und der Datenschutzerklärung zu.
        </div>
      </div>
    </div>
  );
};