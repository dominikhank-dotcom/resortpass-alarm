import React from 'react';
import { Shield, Lock, Server, CreditCard, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  // Adresse als SVG Bild generieren für Spamschutz
  const addressSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="85">
      <rect width="100%" height="100%" fill="rgba(255,255,255,0)"/>
      <text x="0" y="20" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#4b5563">Dominik Hank</text>
      <text x="0" y="48" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#4b5563">Straßburger Weg 2</text>
      <text x="0" y="76" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#4b5563">77975 Ringsheim</text>
    </svg>
  `;

  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(addressSvg)}`;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Informationen über die Verarbeitung Ihrer personenbezogenen Daten.
          </p>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-ep-blue" />
              1. Einleitung und Verantwortlicher
            </h3>
            <p className="mb-2">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).
            </p>
            <div>
              <strong>Verantwortlicher für die Datenverarbeitung ist:</strong><br />
              <img 
                src={svgDataUrl} 
                alt="Adresse des Verantwortlichen" 
                className="mt-2 mb-2 block select-none" 
                style={{ height: '85px', maxWidth: '100%' }}
              />
              E-Mail: support@resortpass-alarm.de
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Datenerfassung auf unserer Website</h3>
          
          <h4 className="font-bold text-gray-800 mt-4">Server-Log-Dateien</h4>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
          </p>

          <h4 className="font-bold text-gray-800 mt-4">Registrierung und Benutzerkonto</h4>
          <p>
            Wenn Sie sich auf unserer Webseite registrieren, speichern wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, optional Telefonnummer). Diese Daten werden ausschließlich für die Nutzung des jeweiligen Angebotes oder Dienstes (Alarm-Funktion) verwendet.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            3. Zahlungsabwicklung (Stripe)
          </h3>
          <p>
            Zur Abwicklung kostenpflichtiger Abonnements nutzen wir den Zahlungsdienstleister <strong>Stripe Payments Europe, Ltd.</strong> (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland).
          </p>
          <p>
            Die Übermittlung Ihrer Daten an Stripe erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Stripe übernimmt dabei die Funktion eines Auftragsverarbeiters. Wir selbst speichern keine vollständigen Kreditkartendaten. Stripe verwendet die Daten, um die Zahlung durchzuführen und (falls zutreffend) Rückerstattungen abzuwickeln.
            Weitere Informationen zum Datenschutz bei Stripe finden Sie unter: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-ep-blue hover:underline">https://stripe.com/de/privacy</a>.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
             <Mail className="h-5 w-5 text-gray-400" />
             4. Benachrichtigungsdienste
          </h3>
          
          <h4 className="font-bold text-gray-800 mt-4">E-Mail Versand (Resend)</h4>
          <p>
            Für den Versand von Transaktions-E-Mails (z.B. Alarm-Benachrichtigungen, Passwort-Reset) nutzen wir den Dienstleister <strong>Resend Inc.</strong> Die Nutzung erfolgt auf Grundlage unseres berechtigten Interesses, Ihnen die bestellten Benachrichtigungen technisch sicher zuzustellen. Ihre E-Mail-Adresse wird hierfür an die Server von Resend übermittelt.
          </p>

          <h4 className="font-bold text-gray-800 mt-4">SMS Versand (Twilio)</h4>
          <p>
            Sofern Sie den SMS-Alarm aktivieren und Ihre Telefonnummer hinterlegen, nutzen wir <strong>Twilio Inc.</strong> für den Versand der Kurznachrichten. Hierbei wird Ihre Telefonnummer an Twilio übermittelt, um die Zustellung der SMS zu ermöglichen.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Partnerprogramm</h3>
          <p>
            Wenn Sie an unserem Partnerprogramm teilnehmen, speichern wir zusätzlich zu Ihren Stammdaten auch Informationen, die für die Abrechnung und steuerliche Erfassung notwendig sind (Anschrift, PayPal-Adresse, USt-ID). Zur Zuordnung von Provisionen setzen wir Cookies oder ähnliche Tracking-Technologien ein, um zu erkennen, ob ein Nutzer über Ihren Empfehlungslink gekommen ist.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. KI-Dienste (Google Gemini)</h3>
          <p>
            Wir nutzen Schnittstellen zu künstlicher Intelligenz (Google Gemini API), um Benachrichtigungstexte dynamisch zu generieren. Hierbei werden in der Regel keine personenbezogenen Daten des Nutzers an die KI übermittelt, sondern lediglich Kontextinformationen (z.B. "ResortPass Gold ist verfügbar").
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center gap-2">
             <Lock className="h-5 w-5 text-gray-400" />
             7. SSL- bzw. TLS-Verschlüsselung
          </h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Ihre Rechte</h3>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
          </p>
        </div>
      </div>
    </div>
  );
};