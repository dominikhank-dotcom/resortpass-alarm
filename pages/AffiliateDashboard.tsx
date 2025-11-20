import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AffiliateStat, AffiliateProfile } from '../types';
import { Copy, DollarSign, Users, MousePointer, Settings, LayoutDashboard, AlertTriangle, Save, CheckCircle, ArrowRight, Wallet } from 'lucide-react';
import { loadConfig } from '../services/configService';

const MOCK_DATA: AffiliateStat[] = [
  { month: 'Jan', clicks: 120, conversions: 5, earnings: 25 },
  { month: 'Feb', clicks: 150, conversions: 8, earnings: 40 },
  { month: 'Mar', clicks: 300, conversions: 20, earnings: 100 },
  { month: 'Apr', clicks: 250, conversions: 15, earnings: 75 },
  { month: 'Mai', clicks: 400, conversions: 35, earnings: 175 },
];

export const AffiliateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [savedMessage, setSavedMessage] = useState("");
  const [payoutStatus, setPayoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [commissionRate, setCommissionRate] = useState(50);

  useEffect(() => {
      const config = loadConfig();
      if (config.affiliateCommissionPercentage) {
          setCommissionRate(config.affiliateCommissionPercentage);
      }
  }, []);
  
  // Profile State
  const [profile, setProfile] = useState<AffiliateProfile>({
      street: '',
      houseNumber: '',
      zip: '',
      city: '',
      country: 'Deutschland',
      companyName: '',
      vatId: '',
      paypalEmail: ''
  });

  // Check if mandatory fields are filled
  const isProfileComplete = 
      profile.street !== '' && 
      profile.houseNumber !== '' && 
      profile.zip !== '' && 
      profile.city !== '' && 
      profile.country !== '' && 
      profile.paypalEmail !== '';

  const referralLink = "https://resortpass-alarm.de/ref/epfan24";
  const totalEarnings = MOCK_DATA.reduce((acc, curr) => acc + curr.earnings, 0);
  const MIN_PAYOUT = 20;

  const handleSaveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API Save
      setSavedMessage("Daten erfolgreich gespeichert!");
      setTimeout(() => setSavedMessage(""), 3000);
  };

  const handlePayoutRequest = () => {
      setPayoutStatus('processing');
      setTimeout(() => {
          setPayoutStatus('success');
          // In einer echten App würde hier das Guthaben zurückgesetzt oder eine Transaktion erstellt
      }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Navigation */}
      <div className="md:flex md:items-center md:justify-between mb-8 border-b border-gray-200 pb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Partner Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">Verwalte deine Einnahmen und Einstellungen. <span className="font-bold text-green-600 ml-2">Aktuelle Provision: {commissionRate}%</span></p>
        </div>
        <div className="mt-4 flex md:mt-0 bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-white shadow text-ep-blue' : 'text-gray-500 hover:text-gray-900'}`}
            >
                <LayoutDashboard className="w-4 h-4" />
                Übersicht
            </button>
            <button 
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'settings' ? 'bg-white shadow text-ep-blue' : 'text-gray-500 hover:text-gray-900'}`}
            >
                <Settings className="w-4 h-4" />
                Einstellungen & Auszahlung
                {!isProfileComplete && <span className="h-2 w-2 bg-red-500 rounded-full"></span>}
            </button>
        </div>
      </div>

      {/* MISSING DATA ALERT */}
      {!isProfileComplete && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        <span className="font-bold">Auszahlungen pausiert:</span> Bitte vervollständige deine Adress- und Auszahlungsdaten im Reiter "Einstellungen & Auszahlung".
                    </p>
                </div>
            </div>
        </div>
      )}

      {/* --- OVERVIEW TAB --- */}
      {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                        <MousePointer className="h-6 w-6 text-ep-blue" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Klicks Gesamt</dt>
                        <dd className="text-lg font-medium text-gray-900">1,220</dd>
                        </dl>
                    </div>
                    </div>
                </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Aktive Abos</dt>
                        <dd className="text-lg font-medium text-gray-900">83</dd>
                        </dl>
                    </div>
                    </div>
                </div>
                </div>

                {/* EARNINGS & PAYOUT CARD */}
                <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-ep-gold">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                    <DollarSign className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div className="ml-5">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Verfügbares Guthaben</dt>
                                        <dd className="text-2xl font-bold text-gray-900">{totalEarnings.toFixed(2)} €</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {payoutStatus === 'success' ? (
                                <div className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100">
                                    <CheckCircle className="w-4 h-4 mr-2"/>
                                    Auszahlung angefordert!
                                </div>
                            ) : (
                                <button 
                                    onClick={handlePayoutRequest}
                                    disabled={totalEarnings < MIN_PAYOUT || !isProfileComplete || payoutStatus === 'processing'}
                                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors ${
                                        totalEarnings >= MIN_PAYOUT && isProfileComplete 
                                        ? 'bg-green-600 hover:bg-green-700 shadow-md' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    {payoutStatus === 'processing' ? 'Verarbeite...' : 'Guthaben auszahlen'}
                                </button>
                            )}
                            
                            {!isProfileComplete ? (
                                <p className="mt-2 text-xs text-center text-red-500">Profil unvollständig</p>
                            ) : totalEarnings < MIN_PAYOUT ? (
                                <p className="mt-2 text-xs text-center text-gray-500">Auszahlung ab {MIN_PAYOUT},00 € möglich</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Einnahmen Verlauf</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="earnings" name="Einnahmen (€)" radius={[4, 4, 0, 0]}>
                            {MOCK_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#002C5F' : '#D4AF37'} />
                            ))}
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>

                {/* Tools */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 h-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Dein Referral Link</h3>
                        <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <input
                            type="text"
                            name="link"
                            id="link"
                            className="focus:ring-ep-blue focus:border-ep-blue block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-3 bg-gray-50 text-gray-600"
                            value={referralLink}
                            readOnly
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => alert("Link kopiert!")}
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                        >
                            <Copy className="h-4 w-4" />
                            <span>Kopieren</span>
                        </button>
                        </div>
                        
                        {/* EXPLANATION BOX */}
                        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <h4 className="text-sm font-bold text-ep-blue flex items-center gap-2 mb-2">
                                <ArrowRight className="w-4 h-4" />
                                Wie geht es?
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Teile diesen Link überall wo du willst: Freunde, Gruppen, Foren, Social Media, mit deinen Followern - du bekommst die Provision für jede Buchung über deinen Link. <span className="font-bold">Jeden Monat!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </>
      )}

      {/* --- SETTINGS TAB --- */}
      {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Stammdaten & Auszahlung</h3>
                  <p className="mt-1 text-sm text-gray-500">
                      Diese Daten sind notwendig, um deine Provisionen steuerrechtlich korrekt auszuzahlen.
                  </p>
              </div>
              <form onSubmit={handleSaveProfile} className="px-4 py-5 sm:p-6 space-y-6">
                  
                  {/* ADRESSE */}
                  <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Anschrift (Pflichtfelder)</h4>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                              <label className="block text-sm font-medium text-gray-700">Straße</label>
                              <input
                                  type="text"
                                  name="street"
                                  required
                                  value={profile.street}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                              />
                          </div>
                          <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Hausnummer</label>
                              <input
                                  type="text"
                                  name="houseNumber"
                                  required
                                  value={profile.houseNumber}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                              />
                          </div>

                          <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">PLZ</label>
                              <input
                                  type="text"
                                  name="zip"
                                  required
                                  value={profile.zip}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                              />
                          </div>
                          <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Ort</label>
                              <input
                                  type="text"
                                  name="city"
                                  required
                                  value={profile.city}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                              />
                          </div>
                          <div className="sm:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Land</label>
                              <select
                                  name="country"
                                  value={profile.country}
                                  onChange={handleChange}
                                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-ep-blue focus:border-ep-blue sm:text-sm"
                              >
                                  <option>Deutschland</option>
                                  <option>Österreich</option>
                                  <option>Schweiz</option>
                                  <option>Frankreich</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* FIRMA / STEUER */}
                  <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Gewerbliche Angaben (Optional)</h4>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-700">Firma / Unternehmensname</label>
                              <input
                                  type="text"
                                  name="companyName"
                                  value={profile.companyName}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                              />
                          </div>
                          <div className="sm:col-span-3">
                              <label className="block text-sm font-medium text-gray-700">USt-ID (VAT ID)</label>
                              <input
                                  type="text"
                                  name="vatId"
                                  value={profile.vatId}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                  placeholder="DE123456789"
                              />
                          </div>
                      </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* AUSZAHLUNG */}
                  <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Auszahlungsmethode</h4>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                              <label className="block text-sm font-medium text-gray-700">PayPal E-Mail Adresse (Pflicht)</label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="email"
                                    name="paypalEmail"
                                    required
                                    value={profile.paypalEmail}
                                    onChange={handleChange}
                                    className="focus:ring-ep-blue focus:border-ep-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                                    placeholder="email@paypal.com"
                                />
                              </div>
                              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                  <Wallet className="w-3 h-3"/>
                                  Auszahlung kann manuell angefordert werden, sobald das Guthaben 20,00 € erreicht.
                              </p>
                          </div>
                      </div>
                  </div>

                  <div className="pt-5 border-t border-gray-200 flex items-center justify-between">
                      {savedMessage && (
                          <div className="flex items-center text-green-600 text-sm animate-fade-in-out">
                              <CheckCircle className="w-4 h-4 mr-2"/>
                              {savedMessage}
                          </div>
                      )}
                      {!savedMessage && <div></div>} {/* Spacer */}

                      <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ep-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ep-blue flex items-center gap-2"
                      >
                          <Save className="w-4 h-4" />
                          Änderungen speichern
                      </button>
                  </div>
              </form>
          </div>
      )}

    </div>
  );
};