import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Groq from "groq-sdk";

export async function registerRoutes(app: Express): Promise<Server> {
  // Senior Comfort Score API endpoint
  app.post('/api/senior_score', async (req, res) => {
    try {
      const { city } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter in request body." });
      }

      // Debug: Log all environment variable keys that contain 'GROQ' or 'groq'
      const groqKeys = Object.keys(process.env).filter(key => 
        key.toLowerCase().includes('groq')
      );
      console.log('Environment keys containing "groq":', groqKeys);
      console.log('GROQ_API_KEY exists?', !!process.env.GROQ_API_KEY);
      console.log('GROQ_API_KEY value length:', process.env.GROQ_API_KEY?.length || 0);

      // Check if API key is available
      if (!process.env.GROQ_API_KEY) {
        return res.status(503).json({ 
          error: "GROQ_API_KEY is not configured. Available env keys with 'groq': " + JSON.stringify(groqKeys)
        });
      }

      // Initialize Groq client (lazy initialization)
      const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
      });

      const systemPrompt = (
        "You are an expert relocation consultant for seniors (55-80) moving to Mexico. " +
        "Your task is to score the given city for 'Senior Comfort, Accessibility & Safety' " +
        "based on publicly available data (walkability, crime, hospital proximity, expatriate " +
        "support). Output ONLY a JSON object with two fields: 'score' (integer 0-100) and " +
        "'justification' (short 2-sentence explanation)."
      );

      const completion = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Score ${city} for Senior Comfort, Accessibility & Safety.` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || "{}";
      const scoreData = JSON.parse(jsonResponseText);

      return res.json(scoreData);

    } catch (error: any) {
      console.error('Groq API Error:', error);
      return res.status(500).json({ 
        error: error.message || 'AI service failed to process request.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
