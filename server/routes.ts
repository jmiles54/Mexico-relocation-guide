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

      // Get API key from Replit secret
      const apiKey = process.env.GROQ_API_KEY;

      // Check if API key is available
      if (!apiKey) {
        return res.status(503).json({ 
          error: "Groq API key not found. Please add 'GROQ_API_KEY' secret in the Secrets panel."
        });
      }

      // Initialize Groq client (lazy initialization)
      const groq = new Groq({
        apiKey: apiKey
      });

      const systemPrompt = (
        "You are an expert relocation consultant for seniors (55-80) moving to Mexico. " +
        "Your task is to score the given city for 'Senior Comfort, Accessibility & Safety' " +
        "based on publicly available data (walkability, crime, hospital proximity, expatriate " +
        "support). Output ONLY a JSON object with two fields: 'score' (integer 0-100) and " +
        "'justification' (short 2-sentence explanation)."
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
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

  // City Sentiment API endpoint for Home Page Social Proof
  app.post('/api/city_sentiment', async (req, res) => {
    try {
      const { city } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter in request body." });
      }

      // Get API key from Replit secret
      const apiKey = process.env.GROQ_API_KEY;

      // Check if API key is available
      if (!apiKey) {
        return res.status(503).json({ 
          error: "Groq API key not found. Please add 'GROQ_API_KEY' secret in the Secrets panel."
        });
      }

      // Initialize Groq client (lazy initialization)
      const groq = new Groq({
        apiKey: apiKey
      });

      const systemPrompt = (
        "You are an expert social media analyst. Output ONLY a JSON object with a single field: " +
        "'label' (a short, exciting, three-word phrase summarizing the city's expat reputation, e.g., 'Vibrant Food Scene', 'Relaxed Beach Vibe', 'Historic Culture Hub')."
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Summarize the expat reputation of ${city}.` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || '{"label": "Local Favorite"}';
      const sentiment = JSON.parse(jsonResponseText);

      return res.json(sentiment);

    } catch (error: any) {
      console.error('City Sentiment API Error:', error);
      return res.status(500).json({ 
        error: 'AI sentiment service failed.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
