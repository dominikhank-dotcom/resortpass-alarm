import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Globe, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { loadConfig } from '../services/configService';

interface PartnerRegistrationProps {
  onRegister: (userData: any) => void;
  onBack: () => void;
  onLogin: () => void;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({ onRegister, onBack, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    channel: ''
  });
  const [commissionRate, setCommissionRate] = useState(50);

  useEffect(() => {
      const config = loadConfig();
      if (config.affiliateCommissionPercentage) {
          setCommissionRate(config.affiliateCommissionPercentage);
      }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      onRegister({
        name: formData.name,
        email: formData.email,
        isAffiliate: true,
        isSubscribed: false // Partner müssen nicht zwingend Abonnenten sein
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="h-12 w-12 bg-ep-gold rounded-full flex items-center justify-center text-ep-blue font-bold text-xl">R</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Werde ResortPassAlarm Partner
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Registriere dich jetzt und starte in weniger als 2 Minuten.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Left: Form */}
            <div>
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
                            Vollständiger Name
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
                                placeholder="partner@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="channel" className="block text-sm font-medium text-gray-700">
                            Deine Webseite / Kanal (Optional)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="channel"
                                name="channel"
                                type="text"
                                value={formData.channel}
                                onChange={handleChange}
                                className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="instagram.com/europaparkfan"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Passwort erstellen
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
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-ep-blue focus:ring-ep-blue border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            Ich stimme den <a href="#" className="text-ep-blue hover:underline">Partnerbedingungen</a> zu.
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ep-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ep-blue transition-colors disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Kostenlos registrieren"}
                        </button>
                    </div>
                </form>
                
                 <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Oder</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button onClick={onLogin} className="text-sm font-medium text-ep-blue hover:text-blue-800">
                            Bereits einen Account? Hier einloggen
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Benefits Summary */}
            <div className="hidden md:block border-l border-gray-100 pl-10">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Deine Vorteile als Partner</h3>
                <ul className="space-y-6">
                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 text-green-600">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900">Hohe Provision</h4>
                            <p className="mt-1 text-sm text-gray-500">{commissionRate}% Lifetime auf alle Umsätze. Das sind knapp 1€ pro Nutzer jeden Monat.</p>
                        </div>
                    </li>
                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-ep-blue">
                                <Globe className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900">Einfaches Tracking</h4>
                            <p className="mt-1 text-sm text-gray-500">Erhalte einen individuellen Link. Wir tracken jeden Klick und jeden Kauf automatisch.</p>
                        </div>
                    </li>
                    <li className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-100 text-yellow-600">
                                <ArrowRight className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900">Schnelle Auszahlung</h4>
                            <p className="mt-1 text-sm text-gray-500">Keine langen Wartezeiten. Wir zahlen monatlich zuverlässig aus.</p>
                        </div>
                    </li>
                </ul>
                
                <div className="mt-10 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 italic">
                        "Seit ich ResortPassAlarm empfehle, finanziere ich mir meine eigenen Parkbesuche komplett durch die Provisionen."
                    </p>
                    <div className="mt-3 flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                        <p className="ml-2 text-xs font-bold text-gray-900">Thomas M., Fanseiten-Betreiber</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};