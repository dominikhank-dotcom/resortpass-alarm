import React from 'react';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const ImprintPage: React.FC = () => {
  // Wir generieren ein SVG Bild "on the fly", damit die Adresse als Bild dargestellt wird,
  // wie vom Nutzer gewünscht (Spamschutz).
  const addressSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="180">
      <rect width="100%" height="100%" fill="white"/>
      <text x="10" y="40" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#111827">ResortPassAlarm</text>
      <text x="10" y="80" font-family="Arial, sans-serif" font-size="18" fill="#374151">Dominik Hank</text>
      <text x="10" y="110" font-family="Arial, sans-serif" font-size="18" fill="#374151">Straßburger Weg 2</text>
      <text x="10" y="140" font-family="Arial, sans-serif" font-size="18" fill="#374151">77975 Ringsheim</text>
    </svg>
  `;

  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(addressSvg)}`;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Impressum
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Rechtliche Angaben gemäß § 5 TMG
          </p>
        </div>

        <div className="bg-gray-50 shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-ep-blue" />
              Angaben zum Betreiber
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              
              {/* Anschrift als BILD */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Anschrift
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img 
                    src={svgDataUrl} 
                    alt="Anschrift des Betreibers" 
                    className="border border-gray-200 rounded p-2 bg-white shadow-sm max-w-full"
                  />
                </dd>
              </div>

              {/* Kontakt */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Kontakt
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a href="mailto:support@resortpass-alarm.de" className="text-ep-blue hover:underline font-medium">
                    support@resortpass-alarm.de
                  </a>
                </dd>
              </div>

            </dl>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 space-y-4">
          <h3 className="text-md font-bold text-gray-900">Haftungsausschluss (Disclaimer)</h3>
          
          <p><strong>Haftung für Inhalte</strong><br/>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>

          <p><strong>Haftung für Links</strong><br/>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

          <p><strong>Urheberrecht</strong><br/>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
        
          <p><strong>Streitschlichtung</strong><br/>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.<br/>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>

      </div>
    </div>
  );
};