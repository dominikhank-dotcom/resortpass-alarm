import { loadConfig } from './configService';

/**
 * NOTIFICATION SERVICE
 */

export interface SendResult {
  success: boolean;
  message: string;
  timestamp: Date;
}

const simulateBackendCall = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendEmailAlert = async (email: string, content: string): Promise<SendResult> => {
  const config = loadConfig();
  
  if (!config.resendApiKey) {
      console.log(`[EMAIL] Simulation (Kein Resend Key): Sende an ${email}`);
  } else {
      console.log(`[EMAIL] ECHTER VERSAND VIA RESEND (Mock): Sende an ${email} von ${config.emailSenderAddress || 'default@app.com'}`);
      // Hier würde der echte fetch call an api.resend.com stehen
  }
  
  await simulateBackendCall(600);

  return {
    success: true,
    message: `Email erfolgreich an ${email} versendet.`,
    timestamp: new Date()
  };
};

export const sendSmsAlert = async (phoneNumber: string, content: string): Promise<SendResult> => {
  const config = loadConfig();
  
  if (!config.twilioSid || !config.twilioAuthToken) {
      console.warn("[SMS] Kein Twilio Key im Admin Panel gefunden. Simulation läuft.");
  } else {
      console.log("[SMS] Twilio Credentials vorhanden, sende echte SMS... (Mock)");
  }

  await simulateBackendCall(1000); 

  return {
    success: true,
    message: `SMS erfolgreich an ${phoneNumber} versendet.`,
    timestamp: new Date()
  };
};