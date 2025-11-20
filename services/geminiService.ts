import { GoogleGenAI } from "@google/genai";
import { getApiKey } from './configService';

// Wir initialisieren die AI Instanz erst bei Bedarf oder fangen Fehler ab, 
// falls der Key erst zur Laufzeit gesetzt wird.
const getAiInstance = () => {
  const apiKey = getApiKey('geminiApiKey');
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateAlertMessage = async (productName: string, availability: boolean): Promise<string> => {
  const ai = getAiInstance();
  if (!ai) return "Demo-Modus: API Key fehlt im Admin Panel. Bitte konfigurieren!";

  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = availability 
      ? `Schreibe eine sehr kurze, dringende und freudige Benachrichtigung (max 2 Sätze) für einen Europa Park Fan. Der "${productName}" ist endlich wieder verfügbar! Fordere zum sofortigen Handeln auf. Nutze Emojis.`
      : `Schreibe eine kurze Statusmeldung (1 Satz), dass der "${productName}" leider noch ausverkauft ist, wir aber weiter suchen.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Status-Update verfügbar.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Automatischer Alarm: ${productName} Status geändert!`;
  }
};

export const generateMarketingCopy = async (targetGroup: string): Promise<string> => {
  const ai = getAiInstance();
  if (!ai) return "Werde Partner und verdiene Geld mit deiner Fanseite! (KI nicht konfiguriert)";

  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = `Erstelle einen kurzen, knackigen Marketing-Slogan (1 Satz) für ein Partnerprogramm, das sich an "${targetGroup}" richtet. Es geht um ein Tool, das benachrichtigt, wenn Europa Park Jahreskarten verfügbar sind.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Jetzt Partner werden und profitieren.";
  } catch (error) {
    return "Exklusives Partnerprogramm für Europa Park Fans.";
  }
};