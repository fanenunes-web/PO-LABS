import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production build, ensure API_KEY is handled securely.
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.warn("Gemini API Key missing or invalid.");
}

export const generateVideoSummary = async (videoTitle: string, channelContext: string): Promise<string> => {
  if (!ai) return "Resumo indisponível (API Key não configurada).";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Gere um resumo curto, envolvente e atrativo (máximo de 3 linhas) para um novo vídeo do YouTube com o título "${videoTitle}" do canal "${channelContext}". O tom deve ser profissional e instigante.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Confira este novo episódio incrível!";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Confira este novo episódio incrível! (Erro ao gerar resumo IA)";
  }
};
