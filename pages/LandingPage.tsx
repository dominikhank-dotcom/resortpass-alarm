import React, { useState } from 'react';
import { Check, TrendingUp, Loader2, Clock, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface LandingPageProps {
  onSubscribe: () => void;
  onPartner: () => void;
  onPartnerInfo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSubscribe, onPartner, onPartnerInfo }) => {
  // Wir brauchen kein lokales Redirect-State mehr, da die Navigation in der App.tsx passiert
  
  const handleSubscribeClick = () => {
      // Ruft jetzt die Registrierung auf, statt direkt "Stripe" zu simulieren
      onSubscribe();
  };

  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1628060123733-347554a1a60e?q=80&w=2070&auto=format&fit=crop" 
            alt="Dark Rollercoaster Night"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent mix-blend-multiply" />
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Europa-Park <span className="text-ep-gold">ResortPass</span>
            </h1>
            <p className="mt-2 text-3xl text-gray-300 font-light">
                Gold & Silver Überwachung
            </p>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Der ResortPass ist heiß begehrt und oft ausverkauft. Wir überwachen die Verfügbarkeit von <strong>Gold & Silver</strong> Tickets im Minutentakt für dich.
            </p>
            
            <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <button
                    onClick={handleSubscribeClick}
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ep-blue bg-ep-gold hover:bg-ep-gold-light md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-ep-gold/20"
                  >
                    Jetzt Überwachung starten
                  </button>
                  <a
                    href="#features"
                    onClick={scrollToFeatures}
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm md:py-4 md:text-lg md:px-10 cursor-pointer"
                  >
                    Wie es funktioniert
                  </a>
                </div>
            </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-gray-300 text-sm">
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      ResortPass Gold: <span className="text-white font-bold">Ausverkauft</span>
                  </span>
                  <span className="w-px h-4 bg-gray-600 hidden sm:block"></span>
                  <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      ResortPass Silver: <span className="text-white font-bold">Ausverkauft</span>
                  </span>
              </div>
              <div>
                  Zuletzt geprüft: Vor 1 Minute
              </div>
          </div>
      </div>

      {/* Pricing / Features */}
      <div id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-ep-blue font-semibold tracking-wide uppercase">Premium Service</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Deine Chance auf eine Jahreskarte
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Egal ob du den ResortPass Gold (inkl. Parken & Wasserwelt) oder den ResortPass Silver suchst – wir sagen dir Bescheid.
            </p>
          </div>

          <div className="mt-10">
            <div className="max-w-lg mx-auto rounded-lg shadow-xl overflow-hidden lg:max-w-none lg:flex bg-white border border-gray-100">
                <div className="flex-1 px-6 py-8 lg:p-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl flex items-center gap-2">
                        ResortPass<span className="text-ep-gold">Alarm</span>
                    </h3>
                    <p className="mt-6 text-base text-gray-500">
                        Verliere keine Zeit mit ständigem Neuladen der Ticket-Seite. Unser System erledigt das für dich.
                    </p>
                    <div className="mt-8">
                        <div className="flex items-center">
                            <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-ep-blue">
                                Alles Inklusive
                            </h4>
                            <div className="flex-1 border-t-2 border-gray-200"></div>
                        </div>
                        <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                            {[
                                'Überwachung: Gold & Silver',
                                '5-Minuten Intervalle',
                                'Sofortige E-Mail Alert',
                                'Sofortige SMS Alert',
                                'Direktlink zum Warenkorb',
                                'Jederzeit kündbar',
                            ].map((feature) => (
                                <li key={feature} className="flex items-start lg:col-span-1">
                                    <div className="flex-shrink-0">
                                        <Check className="h-5 w-5 text-ep-gold" aria-hidden="true" />
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700 font-medium">{feature}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 border-l border-gray-100">
                    <p className="text-lg leading-6 font-medium text-gray-900">Voller Zugang</p>
                    <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                        <span>1,99 €</span>
                        <span className="ml-3 text-xl font-medium text-gray-500">/Monat</span>
                    </div>
                    <div className="mt-6">
                        <div className="rounded-md shadow">
                            <button
                                onClick={handleSubscribeClick}
                                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ep-blue hover:bg-blue-900 w-full transition-colors"
                            >
                                Jetzt abonnieren
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <p className="font-medium text-gray-500">
                           14 Tage Geld-zurück-Garantie
                        </p>
                        <div className="flex justify-center mt-2 opacity-50 grayscale">
                             {/* Placeholder for card logos */}
                             <div className="flex gap-2">
                                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCARCITY SECTION */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="text-ep-red w-6 h-6" />
                    <span className="text-ep-red font-bold uppercase tracking-wider text-sm">Nur kleine Wellen</span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                    Warum du schnell sein musst
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Der Europa-Park gibt ResortPässe oft unangekündigt und nur in <strong>sehr kleinen Kontingenten</strong> frei. Oft sind diese "Wellen" nach wenigen Minuten wieder vorbei.
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-ep-gold p-6 mb-10 text-left mx-auto max-w-2xl shadow-sm">
                    <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-yellow-800">Die 10-Minuten-Regel</h3>
                        <div className="mt-2 text-yellow-700">
                        <p>
                            Wer nicht innerhalb von 10 Minuten nach Freischaltung bucht, geht meistens leer aus. Unser Tool verschafft dir den entscheidenden Zeitvorteil durch sofortige Benachrichtigung.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>

                <button
                    onClick={handleSubscribeClick}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-ep-blue hover:bg-blue-900 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                >
                    Jetzt Überwachung starten
                </button>
            </div>
        </div>
      </div>
      
      {/* FAQ SECTION */}
      <div className="bg-gray-50 py-16 lg:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl flex items-center justify-center gap-3">
                    <HelpCircle className="text-ep-blue" />
                    Häufige Fragen
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    Alles, was du über den ResortPassAlarm wissen musst.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Q1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Was bringt mir ResortPassAlarm?</h3>
                    <p className="text-gray-600">
                        Du sparst dir das ständige, nervige Neuladen der Ticket-Seite. Unser System prüft rund um die Uhr im Minutentakt die Verfügbarkeit und benachrichtigt dich sofort, wenn Gold oder Silver Pässe freigeschaltet werden.
                    </p>
                </div>

                {/* Q2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Was kostet der Service?</h3>
                    <p className="text-gray-600">
                        Der Service kostet nur 1,99 € pro Monat. Das deckt unsere Serverkosten für die ständige Überwachung und die SMS-Kosten ab. Ein kleiner Preis für die Chance auf eine Jahreskarte.
                    </p>
                </div>

                {/* Q3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Kann ich jederzeit kündigen?</h3>
                    <p className="text-gray-600">
                        Ja, absolut. Du kannst dein Abo jederzeit mit einem einzigen Klick in deinem Dashboard beenden. Es gibt keine langen Vertragslaufzeiten.
                    </p>
                </div>

                {/* Q4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ist das eine Abofalle?</h3>
                    <p className="text-gray-600">
                        Nein! Wir setzen auf volle Transparenz. Die Zahlungsabwicklung erfolgt sicher über Stripe. Du hast volle Kontrolle über dein Abo und keine versteckten Kosten.
                    </p>
                </div>

                {/* Q5 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Wie bekomme ich den Alarm?</h3>
                    <p className="text-gray-600">
                        Sobald Tickets verfügbar sind, erhältst du sofort eine E-Mail. Optional (und kostenlos inklusive) senden wir dir auch eine SMS auf dein Handy, damit du es unterwegs nicht verpasst.
                    </p>
                </div>

                {/* Q6 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Gibt es eine Jahreskarten-Garantie?</h3>
                    <p className="text-gray-600">
                        Wir garantieren, dass wir dich benachrichtigen. Da die Kontingente oft sehr klein sind, musst du nach dem Alarm trotzdem schnell sein. Wir verschaffen dir aber den entscheidenden Zeitvorteil gegenüber allen anderen.
                    </p>
                </div>

            </div>
        </div>
      </div>
      
       {/* Affiliate Teaser */}
       <div className="bg-ep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
             <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
        </div>
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Betreibst du eine Fanseite?</span>
            <span className="block text-ep-gold">Werde Partner.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Hilf anderen Europa-Park Fans an ihre Tickets zu kommen und verdiene dabei. 
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
                onClick={onPartner}
                className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-ep-blue bg-white hover:bg-gray-50 sm:w-auto"
            >
                <TrendingUp className="w-5 h-5 mr-2"/>
                Zum Partnerprogramm
            </button>
            <button 
                onClick={onPartnerInfo}
                className="text-blue-200 hover:text-white text-sm flex items-center gap-1 hover:underline"
            >
                Mehr Infos und Rechenbeispiele ansehen <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};