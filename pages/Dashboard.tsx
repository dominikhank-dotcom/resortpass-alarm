import React, { useState, useEffect } from 'react';
import { User, AvailabilityStatus, NotificationLog } from '../types';
import { StatusCard } from '../components/StatusCard';
import { generateAlertMessage } from '../services/geminiService';
import { sendEmailAlert, sendSmsAlert } from '../services/notificationService';
import { checkExternalAvailability } from '../services/availabilityService';
import { Bell, Mail, Smartphone, AlertTriangle, Settings, CreditCard, CheckCircle, Send, RefreshCw, Server, FileText, ExternalLink, Edit2, Check, X, ShieldCheck, ShieldAlert, PlayCircle } from 'lucide-react';
import { StatusState } from '../App';

interface DashboardProps {
  user: User;
  mockStatus: StatusState; 
  setMockStatus: React.Dispatch<React.SetStateAction<StatusState>>;
  onUpdateUser: (data: Partial<User>) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, mockStatus, setMockStatus, onUpdateUser }) => {
  const [loadingGold, setLoadingGold] = useState(false);
  const [loadingSilver, setLoadingSilver] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date());
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [geminiMessage, setGeminiMessage] = useState<string>("");
  const [usingExternalTool, setUsingExternalTool] = useState(false);
  const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false);
  
  // Notification Settings State
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  
  // Edit Contact State
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(user.email);
  
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(user.phoneNumber || "");

  // Toast Notification State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastError, setIsToastError] = useState(false);

  const isMissingContactInfo = !user.email || !user.phoneNumber;

  // Helper to handle real notification sending logic
  const triggerNotifications = async (isAvailable: boolean, productName: string) => {
     if (!isAvailable) return;
     if (!user.isSubscribed) return; // Keine Notifications wenn Abo inaktiv

     // Wenn beide ausgeschaltet sind, brechen wir ab, aber generieren vielleicht trotzdem die Nachricht für die UI
     if (!emailEnabled && !smsEnabled) return;

     // 1. Generate AI Message
     const msg = await generateAlertMessage(productName, true);
     setGeminiMessage(msg);

     // 2. Send Email (if enabled)
     if (emailEnabled) {
         const emailResult = await sendEmailAlert(user.email, msg);
         if (emailResult.success) {
            addLog('EMAIL', msg);
            showNotificationToast(`📧 Alarm für ${productName} gesendet!`);
         }
     }

     // 3. Send SMS (if enabled)
     if (smsEnabled && user.phoneNumber) {
         const smsResult = await sendSmsAlert(user.phoneNumber, msg);
         if (smsResult.success) {
            addLog('SMS', msg);
            // Kleines Delay für den zweiten Toast, damit sie sich nicht sofort überschreiben
            setTimeout(() => {
                showNotificationToast(`📱 SMS für ${productName} gesendet!`);
            }, emailEnabled ? 1500 : 0);
         }
     } else if (smsEnabled && !user.phoneNumber) {
         showNotificationToast(`⚠️ SMS konnte nicht gesendet werden: Keine Nummer hinterlegt.`, true);
     }
  };

  const addLog = (type: 'EMAIL' | 'SMS', content: string) => {
      const newLog: NotificationLog = {
          id: Date.now().toString() + Math.random(),
          timestamp: new Date(),
          type,
          content
      };
      setNotifications(prev => [newLog, ...prev]);
  };

  const showNotificationToast = (msg: string, isError: boolean = false) => {
      setToastMessage(msg);
      setIsToastError(isError);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
  };

  const handleBillingPortal = () => {
      setIsRedirectingToStripe(true);
      // Simulation: Backend Call zu Stripe Billing Portal API
      setTimeout(() => {
          setIsRedirectingToStripe(false);
          alert("Simulation: Du wirst jetzt zum Stripe Kundenportal weitergeleitet.\nDort kannst du deine Rechnungen als PDF herunterladen, deine Zahlungsart ändern oder das Abo kündigen.");
      }, 1500);
  };
  
  const handleActivateSubscription = () => {
      // Mock activation
      onUpdateUser({ isSubscribed: true });
      showNotificationToast("Abonnement erfolgreich aktiviert!");
  };

  const handleSaveEmail = () => {
      // E-Mail Validierung Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!tempEmail || !emailRegex.test(tempEmail)) {
          showNotificationToast("⚠️ Bitte gib eine gültige E-Mail-Adresse ein.", true);
          return;
      }

      onUpdateUser({ email: tempEmail });
      setIsEditingEmail(false);
      showNotificationToast("E-Mail Adresse aktualisiert.");
  };

  const handleSavePhone = () => {
      // Telefon Validierung: Muss mit + beginnen und Ziffern enthalten
      const cleanPhone = tempPhone.replace(/[\s-]/g, ''); // Leerzeichen und Bindestriche ignorieren
      const phoneRegex = /^\+\d{7,15}$/; // Startet mit +, dann 7-15 Ziffern

      if (!tempPhone || !phoneRegex.test(cleanPhone)) {
          showNotificationToast("⚠️ Bitte Nummer mit Ländervorwahl eingeben (+49...)", true);
          return;
      }

      onUpdateUser({ phoneNumber: tempPhone });
      setIsEditingPhone(false);
      showNotificationToast("Handynummer aktualisiert.");
  };
  
  const handleManualTestAlarm = async () => {
      if (!user.isSubscribed) {
          showNotificationToast("⚠️ Bitte aktiviere zuerst dein Abo.", true);
          return;
      }
      if (!emailEnabled && !smsEnabled) {
          showNotificationToast("⚠️ Bitte aktiviere zuerst E-Mail oder SMS oben.", true);
          return;
      }

      // Check restriction for SMS
      if (smsEnabled && user.phoneNumber) {
          if (user.lastTestedPhoneNumber === user.phoneNumber) {
               showNotificationToast("⚠️ Diese Nummer wurde bereits erfolgreich getestet. Änderung erforderlich für neuen Test.", true);
               return;
          }
      }

      await triggerNotifications(true, "Test-Alarm (Verifikation)");
      
      // Update last tested number if SMS was enabled and sent
      if (smsEnabled && user.phoneNumber) {
          onUpdateUser({ lastTestedPhoneNumber: user.phoneNumber });
      }
  };

  // Check both products
  const checkStatusAll = async () => {
    setLoadingGold(true);
    setLoadingSilver(true);
    
    // Versuche echte API Abfrage
    const realData = await checkExternalAvailability();

    if (realData) {
        // ECHTE DATEN GEFUNDEN
        setUsingExternalTool(true);
        setMockStatus({
            gold: realData.gold,
            silver: realData.silver
        });
        setLastChecked(realData.lastChecked);
        setLoadingGold(false);
        setLoadingSilver(false);
        
        if (realData.gold === AvailabilityStatus.AVAILABLE) triggerNotifications(true, "ResortPass Gold");
        if (realData.silver === AvailabilityStatus.AVAILABLE) triggerNotifications(true, "ResortPass Silver");

    } else {
        // FALLBACK AUF DEMO/MOCK DATEN
        setUsingExternalTool(false);
        setTimeout(async () => {
          setLoadingGold(false);
          setLoadingSilver(false);
          setLastChecked(new Date());
          
          // Check Gold
          if (mockStatus.gold === AvailabilityStatus.AVAILABLE) {
              await triggerNotifications(true, "ResortPass Gold");
          } 
          
          // Check Silver
          if (mockStatus.silver === AvailabilityStatus.AVAILABLE) {
              await triggerNotifications(true, "ResortPass Silver");
          }
    
          // If both sold out, maybe gen a message just for UI
          if (mockStatus.gold !== AvailabilityStatus.AVAILABLE && mockStatus.silver !== AvailabilityStatus.AVAILABLE) {
               const msg = await generateAlertMessage("ResortPass", false);
               setGeminiMessage(msg);
          }
    
        }, 1500);
    }
  };

  // Auto-check on mount
  useEffect(() => {
    checkStatusAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Toast Notification */}
      {showToast && (
          <div className={`fixed top-24 right-5 px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-bounce-in transition-all border-l-4 ${isToastError ? 'bg-red-900 border-red-500 text-white' : 'bg-gray-900 border-ep-gold text-white'}`}>
              {isToastError ? <AlertTriangle className="h-6 w-6 text-red-400" /> : <CheckCircle className="text-green-400 h-6 w-6" />}
              <div>
                  <h4 className="font-bold text-sm">{isToastError ? 'Fehler' : 'Benachrichtigung'}</h4>
                  <p className="text-xs text-gray-300">{toastMessage}</p>
              </div>
          </div>
      )}

      {/* SUBSCRIPTION STATUS BANNER */}
      {user.isSubscribed ? (
          <>
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8 rounded-r-md shadow-sm flex items-center justify-between animate-fade-in">
                <div className="flex items-center">
                    <ShieldCheck className="h-8 w-8 text-green-600 mr-4" />
                    <div>
                        <h3 className="text-green-800 font-bold text-lg">Überwachung aktiv</h3>
                        <p className="text-green-700 text-sm">Wir prüfen die Verfügbarkeit im Hintergrund für dich.</p>
                    </div>
                </div>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800 animate-pulse">
                    Live
                </span>
            </div>

            {/* WARNING IF CONTACT INFO MISSING */}
            {isMissingContactInfo && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8 rounded-r-md shadow-sm flex flex-col sm:flex-row items-start animate-fade-in">
                    <AlertTriangle className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-orange-800 font-bold text-sm">Erhöhe deine Chancen!</h4>
                        <p className="text-orange-700 text-sm mt-1">
                            {!user.phoneNumber && !user.email
                                ? "Du hast weder E-Mail noch Handynummer hinterlegt." 
                                : !user.phoneNumber 
                                    ? "Du hast noch keine Handynummer für SMS-Alarme hinterlegt." 
                                    : "Du hast noch keine E-Mail Adresse hinterlegt."} 
                            {' '}Wir empfehlen dringend, <strong>beides</strong> unten in den Einstellungen anzugeben, um sicher keinen Alarm zu verpassen.
                        </p>
                    </div>
                </div>
            )}
          </>
      ) : (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 rounded-r-md shadow-sm flex flex-col sm:flex-row items-center justify-between animate-fade-in gap-4">
              <div className="flex items-center">
                  <ShieldAlert className="h-8 w-8 text-red-600 mr-4" />
                  <div>
                      <h3 className="text-red-800 font-bold text-lg">Überwachung inaktiv</h3>
                      <p className="text-red-700 text-sm">Schließe jetzt das Abo ab, um Alarme zu erhalten.</p>
                  </div>
              </div>
              <button 
                  onClick={handleActivateSubscription}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Abo jetzt aktivieren (1,99 €)
              </button>
          </div>
      )}

      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-ep-blue sm:text-3xl sm:truncate">
            Europa-Park Monitor
          </h2>
          <p className="mt-1 text-sm text-gray-500 flex items-center gap-2">
            Statusquelle: 
            {usingExternalTool ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <Server className="w-3 h-3 mr-1" /> Live-API
                </span>
            ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    Simulation (Demo)
                </span>
            )}
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button 
             onClick={checkStatusAll} 
             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
             <RefreshCw className={`mr-2 h-4 w-4 ${loadingGold || loadingSilver ? 'animate-spin' : ''}`} />
             Alles prüfen
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* LEFT COLUMN: Status Cards */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatusCard 
                    status={mockStatus.gold} 
                    lastChecked={lastChecked} 
                    loading={loadingGold} 
                    productName="ResortPass Gold"
                    productUrl="https://tickets.mackinternational.de/de/ticket/resortpass-gold"
                    variant="gold"
                    onCheckNow={() => {
                        setLoadingGold(true);
                        setTimeout(() => { setLoadingGold(false); if(mockStatus.gold === 'AVAILABLE') triggerNotifications(true, "ResortPass Gold"); }, 1000);
                    }}
                />
                <StatusCard 
                    status={mockStatus.silver} 
                    lastChecked={lastChecked} 
                    loading={loadingSilver} 
                    productName="ResortPass Silver"
                    productUrl="https://tickets.mackinternational.de/de/ticket/resortpass-silver"
                    variant="silver"
                    onCheckNow={() => {
                         setLoadingSilver(true);
                         setTimeout(() => { setLoadingSilver(false); if(mockStatus.silver === 'AVAILABLE') triggerNotifications(true, "ResortPass Silver"); }, 1000);
                    }}
                />
            </div>
            
            {/* DEMO CONTROLS */}
            {!usingExternalTool && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-full">
                            <h3 className="text-sm font-medium text-yellow-800">Demo & Test Center</h3>
                            <p className="text-xs text-yellow-700 mb-3">
                                Es ist kein externes Tool (wie Browse.ai) verbunden. Nutze diese Buttons, um Verfügbarkeit zu simulieren.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Gold Control */}
                                <div className="bg-white/50 p-2 rounded border border-yellow-100">
                                    <p className="text-xs font-bold text-yellow-800 mb-1">Gold Status:</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => setMockStatus(prev => ({...prev, gold: AvailabilityStatus.SOLD_OUT}))} className={`flex-1 py-1 text-xs rounded ${mockStatus.gold === 'SOLD_OUT' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>Ausverkauft</button>
                                        <button onClick={() => { setMockStatus(prev => ({...prev, gold: AvailabilityStatus.AVAILABLE})); checkStatusAll(); }} className={`flex-1 py-1 text-xs rounded ${mockStatus.gold === 'AVAILABLE' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Verfügbar</button>
                                    </div>
                                </div>

                                {/* Silver Control */}
                                <div className="bg-white/50 p-2 rounded border border-slate-200">
                                    <p className="text-xs font-bold text-slate-700 mb-1">Silver Status:</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => setMockStatus(prev => ({...prev, silver: AvailabilityStatus.SOLD_OUT}))} className={`flex-1 py-1 text-xs rounded ${mockStatus.silver === 'SOLD_OUT' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>Ausverkauft</button>
                                        <button onClick={() => { setMockStatus(prev => ({...prev, silver: AvailabilityStatus.AVAILABLE})); checkStatusAll(); }} className={`flex-1 py-1 text-xs rounded ${mockStatus.silver === 'AVAILABLE' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Verfügbar</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}

             {/* Gemini Analysis */}
             <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                 <h4 className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                    ✨ Letzter KI-Statusbericht
                 </h4>
                 <p className="text-sm text-indigo-700 italic">"{geminiMessage || "Warte auf Status-Änderung..."}"</p>
            </div>
        </div>

        {/* RIGHT COLUMN: Settings & Logs */}
        <div className="space-y-6">
            
             {/* Subscription / Payment Management */}
             <div className="bg-white shadow rounded-lg border border-gray-200">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        Mein Abo & Rechnungen
                    </h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-bold text-ep-blue flex items-center gap-2">
                                Premium Plan 
                                {user.isSubscribed ? 
                                    <span className="bg-green-100 text-green-800 text-xs font-normal px-2 py-0.5 rounded-full">Aktiv</span> : 
                                    <span className="bg-red-100 text-red-800 text-xs font-normal px-2 py-0.5 rounded-full">Inaktiv</span>
                                }
                            </p>
                            <p className="text-xs text-gray-500 mt-1">1,99 € / Monat</p>
                            {user.isSubscribed && <p className="text-xs text-gray-500">Nächste Abrechnung: 01.04.2025</p>}
                        </div>
                        <div className="text-right">
                            <FileText className="h-8 w-8 text-gray-300 ml-auto mb-1" />
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleBillingPortal}
                        disabled={isRedirectingToStripe}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                    >
                        {isRedirectingToStripe ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                        Rechnungen & Abo verwalten
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                        Weiterleitung zum sicheren Stripe Kundenportal
                    </p>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white shadow rounded-lg border border-gray-200">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-gray-400" />
                        Alarm Einstellungen
                    </h3>
                </div>
                <div className="px-4 py-5 sm:p-6 space-y-4">
                    
                    {/* EMAIL ROW */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
                            <Mail className={`h-5 w-5 flex-shrink-0 ${emailEnabled ? 'text-ep-blue' : 'text-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${emailEnabled ? 'text-gray-700' : 'text-gray-400'}`}>E-Mail</p>
                                
                                {isEditingEmail ? (
                                    <div className="flex items-center gap-1 mt-1">
                                        <input 
                                            type="email" 
                                            value={tempEmail} 
                                            onChange={(e) => setTempEmail(e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-1 py-0.5 w-full max-w-[150px]"
                                        />
                                        <button onClick={handleSaveEmail} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4"/></button>
                                        <button onClick={() => { setIsEditingEmail(false); setTempEmail(user.email); }} className="text-red-500 hover:text-red-700"><X className="w-4 h-4"/></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-500 truncate" title={user.email}>{user.email}</p>
                                        <button onClick={() => setIsEditingEmail(true)} className="text-gray-400 hover:text-ep-blue"><Edit2 className="w-3 h-3"/></button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => setEmailEnabled(!emailEnabled)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ep-blue focus:ring-offset-2 ${emailEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                            role="switch"
                            aria-checked={emailEnabled}
                        >
                            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${emailEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* SMS ROW */}
                    <div className="flex items-center justify-between border-t pt-4 border-gray-100">
                         <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
                            <Smartphone className={`h-5 w-5 flex-shrink-0 ${smsEnabled ? 'text-ep-blue' : 'text-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${smsEnabled ? 'text-gray-700' : 'text-gray-400'}`}>SMS</p>
                                
                                {isEditingPhone ? (
                                     <div className="mt-1">
                                        <div className="flex items-center gap-1">
                                            <input 
                                                type="tel" 
                                                value={tempPhone} 
                                                onChange={(e) => setTempPhone(e.target.value)}
                                                className="text-xs border border-gray-300 rounded px-1 py-0.5 w-full max-w-[150px]"
                                            />
                                            <button onClick={handleSavePhone} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4"/></button>
                                            <button onClick={() => { setIsEditingPhone(false); setTempPhone(user.phoneNumber || ""); }} className="text-red-500 hover:text-red-700"><X className="w-4 h-4"/></button>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-1">Format: +49 170 1234567</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.phoneNumber || "Keine Nummer"}
                                        </p>
                                        <button onClick={() => setIsEditingPhone(true)} className="text-gray-400 hover:text-ep-blue"><Edit2 className="w-3 h-3"/></button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => setSmsEnabled(!smsEnabled)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ep-blue focus:ring-offset-2 ${smsEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
                            role="switch"
                            aria-checked={smsEnabled}
                        >
                            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${smsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* TEST ALARM BUTTON */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                            Der Testalarm geht einmalig an deine E-Mail und/oder als SMS an deine Handynummer. Stelle sicher, dass beides stimmt um keinen Alarm zu verpassen!
                        </p>
                        <button 
                            onClick={handleManualTestAlarm}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-ep-blue bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ep-blue transition-colors"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Test-Alarm jetzt senden
                        </button>
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white shadow rounded-lg border border-gray-200">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-gray-400" />
                        Versand-Protokoll
                    </h3>
                </div>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <li className="px-4 py-8 text-sm text-gray-500 text-center flex flex-col items-center">
                            <Bell className="h-8 w-8 text-gray-300 mb-2" />
                            Noch keine Alarme versendet.
                        </li>
                    ) : (
                        notifications.map((log) => (
                            <li key={log.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-ep-blue truncate flex items-center gap-2">
                                        {log.type === 'EMAIL' ? <Mail className="h-3 w-3"/> : <Smartphone className="h-3 w-3"/>}
                                        {log.type === 'EMAIL' ? 'E-Mail' : 'SMS'}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Gesendet
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 italic">"{log.content}"</p>
                                    <p className="text-xs text-gray-400 mt-1 text-right">{log.timestamp.toLocaleTimeString()}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};