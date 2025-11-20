import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Save, Database, Key, Shield, Activity, Users, CreditCard, RefreshCw, Mail, Briefcase, Calendar, DollarSign, Award, TrendingUp, Filter, Search, Settings, Percent, Wallet, Lock } from 'lucide-react';
import { SystemConfig, AdminStatData, User } from '../types';
import { loadConfig, saveConfig } from '../services/configService';

interface AdminPanelProps {
  onBack: () => void;
}

const MOCK_CHART_DATA: AdminStatData[] = [
  { name: 'Woche 1', users: 10, revenue: 20 },
  { name: 'Woche 2', users: 25, revenue: 50 },
  { name: 'Woche 3', users: 45, revenue: 90 },
  { name: 'Woche 4', users: 80, revenue: 160 },
  { name: 'Woche 5', users: 120, revenue: 240 },
  { name: 'Aktuell', users: 145, revenue: 290 },
];

const MOCK_USERS_LIST: Partial<User>[] = [
  { id: 'u1', name: 'Max Mustermann', email: 'max@test.de', isSubscribed: true },
  { id: 'u2', name: 'Julia Park', email: 'julia@ep-fan.de', isSubscribed: true },
  { id: 'u3', name: 'Tom Roller', email: 'tom@coaster.com', isSubscribed: false },
  { id: 'u4', name: 'Sarah Silver', email: 'sarah@mail.de', isSubscribed: true },
];

// MOCK DATA FOR PARTNERS
const MOCK_TOP_PARTNERS = [
  { id: 1, name: 'Thomas Müller (EP Fanblog)', clicks: 1250, conversions: 85, revenue: 169.15, status: 'active' },
  { id: 2, name: 'Coaster Friends NRW', clicks: 980, conversions: 62, revenue: 123.38, status: 'active' },
  { id: 3, name: 'Sarahs Freizeitpark Welt', clicks: 850, conversions: 45, revenue: 89.55, status: 'active' },
  { id: 4, name: 'Rulantica Insider', clicks: 620, conversions: 38, revenue: 75.62, status: 'active' },
  { id: 5, name: 'Achterbahn Junkies', clicks: 550, conversions: 22, revenue: 43.78, status: 'warning' },
  { id: 6, name: 'EP News Ticker', clicks: 400, conversions: 18, revenue: 35.82, status: 'active' },
  { id: 7, name: 'Resort Fans Suisse', clicks: 350, conversions: 15, revenue: 29.85, status: 'active' },
  { id: 8, name: 'Marcels Vlogs', clicks: 200, conversions: 12, revenue: 23.88, status: 'new' },
  { id: 9, name: 'Rust Community', clicks: 180, conversions: 8, revenue: 15.92, status: 'inactive' },
  { id: 10, name: 'Ticket Watcher Pro', clicks: 150, conversions: 5, revenue: 9.95, status: 'active' },
];

const MOCK_PARTNER_CONVERSION_DATA = [
  { name: 'Social Media', clicks: 4000, signups: 120 },
  { name: 'Blogs/Foren', clicks: 2500, signups: 280 }, // Höhere Conversion
  { name: 'Direkt/Messenger', clicks: 1000, signups: 150 },
  { name: 'YouTube', clicks: 1800, signups: 90 },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'partners' | 'config' | 'users'>('stats');
  const [config, setConfig] = useState<SystemConfig>(loadConfig());
  const [isSaving, setIsSaving] = useState(false);
  
  // Partner Stats Filter State
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: new Date().toISOString().split('T')[0] });
  const [payoutStats, setPayoutStats] = useState({ count: 18, amount: 845.50 });
  const [isFiltering, setIsFiltering] = useState(false);

  // Revenue Stats
  const revenueTotal = 290.00;
  const commissionTotal = 85.50;
  const profitTotal = revenueTotal - commissionTotal;

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const handleSaveConfig = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    saveConfig(config);
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Simuliert das Neuladen von Daten wenn der Filter geändert wird
  const handlePartnerFilter = () => {
      setIsFiltering(true);
      // Fake API Call simulation
      setTimeout(() => {
          // Zufällige Variation der Zahlen um Filterung zu simulieren
          setPayoutStats({
              count: Math.floor(Math.random() * 50) + 5,
              amount: Math.floor(Math.random() * 2000) + 100
          });
          setIsFiltering(false);
      }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-ep-gold" />
              <span className="font-bold text-xl">Admin Konsole</span>
            </div>
            <button onClick={onBack} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
              <RefreshCw className="w-3 h-3"/>
              Zurück zur App
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 min-w-[100px] rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all flex justify-center items-center gap-2 ${activeTab === 'stats' ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
          >
            <Activity className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 min-w-[100px] rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all flex justify-center items-center gap-2 ${activeTab === 'users' ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> Kunden
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`flex-1 min-w-[100px] rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all flex justify-center items-center gap-2 ${activeTab === 'partners' ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
          >
            <Briefcase className="w-4 h-4" /> Partner
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 min-w-[100px] rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 transition-all flex justify-center items-center gap-2 ${activeTab === 'config' ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
          >
            <Database className="w-4 h-4" /> API Settings
          </button>
        </div>

        {/* STATS VIEW */}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {/* Card 1: Active Users */}
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Aktive Nutzer</dt>
                    <dd className="text-2xl font-bold text-gray-900">145</dd>
                  </dl>
                </div>
              </div>

              {/* Card 2: Profit / Revenue / Payouts Breakdown */}
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex flex-col justify-between relative">
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 bg-green-600 rounded-md p-3">
                        <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Reingewinn (Profit)</dt>
                            <dd className="text-2xl font-bold text-gray-900">{profitTotal.toFixed(2)} €</dd>
                        </dl>
                    </div>
                </div>
                
                {/* Sub-metrics Breakdown */}
                <div className="border-t border-gray-100 pt-3 mt-1 grid grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col">
                        <span className="text-gray-400 mb-0.5">Gesamtumsatz</span>
                        <span className="font-semibold text-green-600 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {revenueTotal.toFixed(2)} €
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-gray-400 mb-0.5">Provisionen</span>
                        <span className="font-semibold text-red-500">
                            - {commissionTotal.toFixed(2)} €
                        </span>
                    </div>
                </div>
              </div>

              {/* Card 3: API Usage */}
              <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">API Calls (Heute)</dt>
                    <dd className="text-2xl font-bold text-gray-900">2,405</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Wachstum & Umsatz</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#8884d8" fillOpacity={1} fill="url(#colorUsers)" />
                      <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Server Last (Requests/Std)</h3>
                 <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                        {name: '08:00', req: 400}, {name: '10:00', req: 300}, 
                        {name: '12:00', req: 900}, {name: '14:00', req: 200},
                        {name: '16:00', req: 500}, {name: '18:00', req: 800}
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="req" fill="#002C5F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PARTNERS VIEW */}
        {activeTab === 'partners' && (
             <div className="space-y-6 animate-fade-in">
                
                {/* Partner Program Settings */}
                <div className="bg-gradient-to-r from-ep-blue to-blue-900 rounded-lg shadow p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-ep-gold" />
                                Programm Konfiguration
                            </h3>
                            <p className="text-blue-200 text-sm mt-1 max-w-2xl">
                                Änderungen hier wirken sich sofort auf die gesamte Plattform aus (Anzeigetexte, Rechenbeispiele, Provisionsabrechnung).
                            </p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg">
                            <Percent className="w-6 h-6 text-ep-gold" />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-md border border-white/10">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-blue-100 mb-2">
                                Globale Provision (%)
                            </label>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="80" 
                                    step="5"
                                    name="affiliateCommissionPercentage"
                                    value={config.affiliateCommissionPercentage}
                                    onChange={handleChange}
                                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex items-center bg-white text-ep-blue px-3 py-1 rounded font-bold min-w-[80px] justify-center">
                                    {config.affiliateCommissionPercentage} %
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => handleSaveConfig(e)}
                            className="w-full sm:w-auto px-4 py-2 bg-ep-gold text-ep-blue font-bold rounded hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                        >
                            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                            Einstellung speichern
                        </button>
                    </div>
                </div>

                {/* Header & Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-ep-blue" />
                        <h3 className="text-lg font-bold text-gray-900">Statistik</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-md border border-gray-200">
                        <div className="flex items-center px-2">
                             <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                             <span className="text-xs text-gray-500 font-medium">Zeitraum:</span>
                        </div>
                        <input 
                            type="date" 
                            value={dateRange.start} 
                            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                            className="text-sm border-gray-300 rounded border px-2 py-1"
                        />
                        <span className="text-gray-400">-</span>
                        <input 
                            type="date" 
                            value={dateRange.end} 
                            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                            className="text-sm border-gray-300 rounded border px-2 py-1"
                        />
                        <button 
                            onClick={handlePartnerFilter}
                            className="bg-ep-blue text-white px-3 py-1 rounded text-sm hover:bg-blue-900 flex items-center gap-1"
                        >
                            {isFiltering ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Filter className="w-3 h-3" />}
                            Anwenden
                        </button>
                    </div>
                </div>

                {/* Partner KPI Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                    {/* Total Partners */}
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                <Users className="h-6 w-6 text-ep-blue" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Partner Gesamt</dt>
                                    <dd className="text-2xl font-bold text-gray-900">42</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    
                    {/* New Partners */}
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Neue Partner</dt>
                                    <dd className="text-2xl font-bold text-gray-900">+5 <span className="text-xs font-normal text-gray-400">(Diesen Monat)</span></dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Payouts in Period */}
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                <DollarSign className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Ausgezahlt (Zeitraum)</dt>
                                    <dd className={`text-2xl font-bold text-gray-900 transition-all ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                                        {payoutStats.amount.toFixed(2)} €
                                    </dd>
                                    <dd className="text-xs text-gray-400">{payoutStats.count} Transaktionen</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Pending Payouts (Important!) */}
                    <div className="bg-white overflow-hidden shadow rounded-lg p-5 border-l-4 border-red-400">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-red-50 rounded-md p-3">
                                <CreditCard className="h-6 w-6 text-red-500" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Offene Auszahlungen</dt>
                                    <dd className="text-2xl font-bold text-gray-900">1,240.50 €</dd>
                                    <dd className="text-xs text-red-500 font-medium">Handlungsbedarf</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* TOP 10 LEADERBOARD */}
                    <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                                <Award className="w-5 h-5 text-ep-gold" />
                                Top 10 Partner (Nach Umsatz)
                            </h3>
                            <button className="text-xs text-ep-blue hover:underline flex items-center">
                                Alle anzeigen <Search className="w-3 h-3 ml-1"/>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klicks</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abos</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provision (€)</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {MOCK_TOP_PARTNERS.map((partner, index) => (
                                        <tr key={partner.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                #{index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                                                        {partner.name.substring(0,2).toUpperCase()}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {partner.clicks}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                {partner.conversions}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                                                {partner.revenue.toFixed(2)} €
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Conversion Qualität</h3>
                        <p className="text-xs text-gray-500 mb-6">Vergleich Klicks vs. echte Abschlüsse nach Quelle</p>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={MOCK_PARTNER_CONVERSION_DATA} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11}} />
                                    <Tooltip cursor={{fill: 'transparent'}} />
                                    <Legend iconSize={10} wrapperStyle={{fontSize: '12px'}}/>
                                    <Bar dataKey="clicks" name="Klicks" fill="#E5E7EB" radius={[0, 4, 4, 0]} barSize={10} />
                                    <Bar dataKey="signups" name="Abos" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={10} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-100">
                            <strong>Insight:</strong> Blogs und Foren konvertieren 3x besser als Social Media Links, obwohl sie weniger Traffic liefern.
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* CONFIG VIEW */}
        {activeTab === 'config' && (
          <div className="bg-white shadow rounded-lg overflow-hidden animate-fade-in">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Database className="h-5 w-5 text-ep-blue" />
                  Externe Dienste Anbindung
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Hier verwaltest du die API Schlüssel für Payment, KI und Benachrichtigungen.
                </p>
              </div>
              <div className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full flex items-center">
                  <Key className="w-3 h-3 mr-1"/>
                  Wird lokal gespeichert (Demo)
              </div>
            </div>
            
            <form onSubmit={handleSaveConfig} className="px-4 py-5 sm:p-6 space-y-6">
              
              {/* AI Section */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Künstliche Intelligenz (Gemini)</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Google Gemini API Key</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="password"
                        name="geminiApiKey"
                        value={config.geminiApiKey}
                        onChange={handleChange}
                        className="flex-1 focus:ring-ep-blue focus:border-ep-blue block w-full min-w-0 rounded-md sm:text-sm border-gray-300 p-2 border"
                        placeholder="AIza..."
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Wird für Benachrichtigungstexte und Affiliate-Slogans genutzt.</p>
                  </div>
                </div>
              </div>

              {/* Stripe Section */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Zahlungen (Stripe)</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Publishable Key</label>
                    <input
                      type="text"
                      name="stripePublicKey"
                      value={config.stripePublicKey}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="pk_test_..."
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Secret Key</label>
                    <input
                      type="password"
                      name="stripeSecretKey"
                      value={config.stripeSecretKey}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="sk_test_..."
                    />
                  </div>

                  {/* NEU: PRICE ID & WEBHOOK SECRET */}
                   <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Stripe Price ID (Abo)</label>
                    <input
                      type="text"
                      name="stripePriceId"
                      value={config.stripePriceId || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="price_1P..."
                    />
                    <p className="mt-1 text-xs text-gray-500">ID des 1,99€ Produkts aus dem Stripe Dashboard.</p>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        Webhook Signing Secret <Lock className="w-3 h-3 text-gray-400"/>
                    </label>
                    <input
                      type="password"
                      name="stripeWebhookSecret"
                      value={config.stripeWebhookSecret || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="whsec_..."
                    />
                    <p className="mt-1 text-xs text-gray-500">Für sichere Zahlungsbestätigungen vom Server.</p>
                  </div>
                </div>
              </div>

              {/* Email (Resend) Section */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> E-Mail Versand (Resend.com)
                </h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Resend API Key</label>
                    <input
                      type="password"
                      name="resendApiKey"
                      value={config.resendApiKey || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="re_12345..."
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Absender Adresse (From Email)</label>
                    <input
                      type="email"
                      name="emailSenderAddress"
                      value={config.emailSenderAddress || ''}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="alarm@deine-domain.de"
                    />
                    <p className="mt-1 text-xs text-gray-500">Muss mit einer bei Resend verifizierten Domain übereinstimmen.</p>
                  </div>
                </div>
              </div>

              {/* SMS (Twilio) Section */}
              <div className="border-b border-gray-100 pb-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">SMS Versand (Twilio)</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Twilio Account SID</label>
                    <input
                      type="text"
                      name="twilioSid"
                      value={config.twilioSid}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Twilio Auth Token</label>
                    <input
                      type="password"
                      name="twilioAuthToken"
                      value={config.twilioAuthToken}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                    />
                  </div>
                </div>
              </div>
              
              {/* Scraping Section */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Web Scraper (Browse.ai / Apify)</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">API Key</label>
                    <input
                      type="password"
                      name="browseAiApiKey"
                      value={config.browseAiApiKey}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="API Key vom Scraper Tool"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Robot ID / Task ID</label>
                    <input
                      type="text"
                      name="browseAiRobotId"
                      value={config.browseAiRobotId}
                      onChange={handleChange}
                      className="mt-1 focus:ring-ep-blue focus:border-ep-blue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="ID des Überwachungs-Tasks"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setConfig(loadConfig())}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    Verwerfen
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ep-blue hover:bg-blue-900 focus:outline-none flex items-center gap-2"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Speichere...' : 'Einstellungen Speichern'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        
        {/* USERS VIEW */}
        {activeTab === 'users' && (
            <div className="bg-white shadow rounded-lg overflow-hidden animate-fade-in">
                 <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                       Registrierte Kunden
                    </h3>
                    <button className="text-xs text-ep-blue hover:underline">Liste exportieren (CSV)</button>
                </div>
                <ul className="divide-y divide-gray-200">
                    {MOCK_USERS_LIST.map(user => (
                        <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-ep-blue">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <div>
                                    {user.isSubscribed ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Premium</span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inaktiv</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}

      </div>
    </div>
  );
};