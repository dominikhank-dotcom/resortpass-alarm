import { SystemConfig } from '../types';

const STORAGE_KEY = 'resortpass_admin_config';

const defaultConfig: SystemConfig = {
  geminiApiKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  stripePriceId: '',        // Standard: Leer
  stripeWebhookSecret: '',  // Standard: Leer
  twilioSid: '',
  twilioAuthToken: '',
  resendApiKey: '',
  emailSenderAddress: '',
  browseAiApiKey: '',
  browseAiRobotId: '',
  affiliateCommissionPercentage: 50 // Standardwert: 50%
};

export const saveConfig = (config: SystemConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Could not save config", e);
  }
};

export const loadConfig = (): SystemConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Could not load config", e);
  }
  return defaultConfig;
};

// Helper to get a single key efficiently without loading full object everywhere if needed
export const getApiKey = (keyName: keyof SystemConfig): string => {
  const config = loadConfig();
  const val = config[keyName];
  return val !== undefined ? String(val) : process.env[keyName.toUpperCase()] || '';
};