
export enum AvailabilityStatus {
  SOLD_OUT = 'SOLD_OUT',
  AVAILABLE = 'AVAILABLE',
  ERROR = 'ERROR'
}

export interface AffiliateProfile {
  firstName: string; // Neu
  lastName: string;  // Neu
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  country: string;
  companyName?: string;
  vatId?: string;
  paypalEmail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string; // Neu hinzugefügt
  isSubscribed: boolean;
  isAffiliate: boolean;
  isAdmin?: boolean;
  joinedDate?: Date;
  affiliateProfile?: AffiliateProfile;
  referredBy?: string; // Neu: Tracking
  lastTestedPhoneNumber?: string; // Neu: Um Test-Missbrauch zu verhindern
}

export interface AffiliateStat {
  month: string;
  clicks: number;
  conversions: number;
  earnings: number;
}

export interface NotificationLog {
  id: string;
  timestamp: Date;
  type: 'EMAIL' | 'SMS';
  content: string;
}

export interface SystemConfig {
  geminiApiKey: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  stripePriceId: string;       // Neu: ID des Abo-Preises
  stripeWebhookSecret: string; // Neu: Für Webhook Sicherheit
  twilioSid: string;
  twilioAuthToken: string;
  resendApiKey: string;      
  emailSenderAddress: string; 
  browseAiApiKey: string;
  browseAiRobotId: string;
  affiliateCommissionPercentage: number; 
}

export interface AdminStatData {
  name: string;
  users: number;
  revenue: number;
}
