import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Users, ShieldCheck, Infinity, Calculator, ArrowRight, CheckCircle, PieChart, Sliders } from 'lucide-react';
import { loadConfig } from '../services/configService';

interface PartnerProgramPageProps {
  onJoin: () => void;
  onBack: () => void;
}

export const PartnerProgramPage: React.FC<PartnerProgramPageProps> = ({ onJoin, onBack }) => {
  const [commissionRate, setCommissionRate] = useState(50);
  const [calculatorUserCount, setCalculatorUserCount] = useState(500);
  
  useEffect(() => {
      const config = loadConfig();
      if (config.affiliateCommissionPercentage) {
          setCommissionRate(config.affiliateCommissionPercentage);
      }
  }, []);

  // Calculation Constants
  const PRICE_PER_MONTH = 1.99;
  const monthlyRevenue = calculatorUserCount * PRICE_PER_MONTH * (commissionRate / 100);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-ep-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-ep-gold/20 text-ep-gold border border-ep-gold mb-6 text-sm font-bold uppercase tracking-wider">
            Für Fanseiten & Influencer
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Verdiene Geld mit deiner <br/><span className="text-ep-gold">Europa-Park Leidenschaft</span>
          </h1>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Das fairste Partnerprogramm der Freizeitpark-Branche. Empfiehl unser Tool und erhalte dauerhaft <strong className="text-white">{commissionRate}% Provision</strong> auf alle Umsätze deiner vermittelten Nutzer.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onJoin}
              className="px-8 py-4 border border-transparent text-lg font-bold rounded-md text-ep-blue bg-white hover:bg-gray-50 shadow-lg transition-transform hover:-translate-y-1"
            >
              Jetzt kostenlos Partner werden
            </button>
          </div>
        </div>
      </div>

      {/* Key Benefits Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-ep-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <PieChart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{commissionRate}% Provision</h3>
              <p className="text-gray-600">
                Du erhältst {commissionRate}% des Umsatzes. Bei jedem Abo-Abschluss und jeder Verlängerung.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Infinity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Vergütung</h3>
              <p className="text-gray-600">
                Solange der Kunde das Abo behält, wirst du jeden Monat bezahlt. Einmal werben, immer verdienen.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Monatliche Auszahlung</h3>
              <p className="text-gray-600">
                Wir überweisen dein Guthaben pünktlich zum Monatsanfang direkt auf dein Bankkonto oder PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Example */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Lohnt sich das? <br/><span className="text-ep-blue">Ein Rechenbeispiel.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Viele Fanseiten und Gruppen haben Tausende Mitglieder. Da der ResortPass extrem begehrt ist, sind die Abschlussraten sehr hoch.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Angenommen, du nutzt einen Aktionspreis von 1,99 € für deine Community:
              </p>
              <ul className="space-y-4">
                {[
                  'Keine Kosten für dich',
                  'Kein technisches Wissen nötig',
                  'Live-Dashboard mit deinen Einnahmen',
                  'Werbemittel (Banner) inklusive'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Calculator Card */}
            <div className="lg:w-1/2">
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden border border-gray-700">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-ep-gold/20 rounded-full blur-3xl"></div>
                
                <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-4">
                  <Calculator className="w-6 h-6 text-ep-gold" />
                  <span className="text-lg font-medium text-gray-300">Deine Einnahmen-Prognose</span>
                </div>

                <div className="space-y-6 relative z-10">
                  
                  {/* Interactive Slider Section */}
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-gray-400 text-sm flex items-center gap-2"><Sliders className="w-4 h-4"/> Anzahl vermittelte Abos</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="5000" 
                        step="10" 
                        value={calculatorUserCount}
                        onChange={(e) => setCalculatorUserCount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-ep-gold mb-4"
                      />
                      <div className="flex justify-between items-center">
                           <span className="text-xs text-gray-500">10</span>
                           <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    value={calculatorUserCount}
                                    onChange={(e) => setCalculatorUserCount(Number(e.target.value))}
                                    className="bg-gray-700 border border-gray-600 text-white text-right w-24 rounded px-2 py-1 focus:border-ep-gold outline-none font-bold"
                                />
                                <span className="text-sm font-bold">Nutzer</span>
                           </div>
                           <span className="text-xs text-gray-500">5.000</span>
                      </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400">Preis pro Abo</span>
                    <span className="text-xl">x {PRICE_PER_MONTH} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Deine Provision</span>
                    <span className="text-xl text-ep-gold">{commissionRate}%</span>
                  </div>
                  
                  <div className="h-px bg-gray-700 my-4"></div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Dein monatlicher Verdienst:</span>
                  </div>
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-ep-gold to-yellow-200 mt-2">
                    {monthlyRevenue.toFixed(2).replace('.', ',')} €
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Jeden Monat, solange die Abos laufen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">So einfach geht's</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                {/* Connector Line (Desktop only) */}
                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-200 z-0"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-white border-4 border-ep-blue rounded-full flex items-center justify-center text-2xl font-bold text-ep-blue mx-auto mb-6 shadow-lg">
                        1
                    </div>
                    <h3 className="text-lg font-bold mb-2">Anmelden</h3>
                    <p className="text-gray-600 px-4">Registriere dich kostenlos in 30 Sekunden für das Partnerprogramm.</p>
                </div>
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-white border-4 border-ep-blue rounded-full flex items-center justify-center text-2xl font-bold text-ep-blue mx-auto mb-6 shadow-lg">
                        2
                    </div>
                    <h3 className="text-lg font-bold mb-2">Link teilen</h3>
                    <p className="text-gray-600 px-4">Poste deinen individuellen Link auf deiner Fanseite, Instagram oder in Foren.</p>
                </div>
                <div className="relative z-10">
                    <div className="w-24 h-24 bg-white border-4 border-ep-gold rounded-full flex items-center justify-center text-2xl font-bold text-ep-gold mx-auto mb-6 shadow-lg">
                        3
                    </div>
                    <h3 className="text-lg font-bold mb-2">Geld verdienen</h3>
                    <p className="text-gray-600 px-4">Lehn dich zurück. Du wirst automatisch benachrichtigt, wenn du Provision erhältst.</p>
                </div>
            </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-ep-blue text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bereit, mit deiner Community Geld zu verdienen?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Es gibt kein Risiko, keine versteckten Kosten und du kannst jederzeit aufhören.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onJoin}
              className="px-8 py-4 bg-ep-gold text-ep-blue font-bold rounded-md hover:bg-ep-gold-light shadow-lg text-lg"
            >
              Jetzt Partner Account erstellen
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-md hover:bg-white/10"
            >
              Zurück zur Startseite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};