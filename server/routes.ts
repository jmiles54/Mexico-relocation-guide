import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Groq from "groq-sdk";
import { accessibilityScoreSchema, safetyRatingSchema, wifiReadinessSchema } from "../shared/schema";

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

  // Tours, Events & Seasonal Content API endpoint (Task #10)
  app.post('/api/seasonal_content', async (req, res) => {
    try {
      const { city } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      // Initialize Groq client
      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are an expert concierge and travel guide for Mexico. " +
        "Your task is to generate one compelling, real-time cultural event, " +
        "tour, or seasonal highlight for the provided city. The output should be realistic, " +
        "attraction-focused, and encourage booking. Output ONLY a JSON object with two fields: " +
        "'headline' (short, exciting event name or tour title) and " +
        "'description' (a 2-3 sentence pitch including relevance to expats and a call to action)."
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `What is the best current event or tour in ${city} right now? (Current month is ${new Date().toLocaleString('en-US', { month: 'long' })})` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || "{}";
      const eventData = JSON.parse(jsonResponseText);

      return res.json(eventData);

    } catch (error: any) {
      console.error('Seasonal Content API Error:', error);
      return res.status(500).json({ error: 'AI event synthesis failed to process request.' });
    }
  });

  // Precision Filters / Recommendation Engine API endpoint (Task #11)
  app.post('/api/recommendation', async (req, res) => {
    try {
      const { age, budget, mobility, interests } = req.body;

      if (!age || !budget || !mobility || !interests) {
        return res.status(400).json({ error: "Missing one or more required preference parameters." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are an expert relocation specialist for Mexico. Your knowledge base includes Puerto Vallarta, Mérida, San Miguel de Allende, and Cancún. " +
        "Based ONLY on the user's detailed profile, select the SINGLE BEST CITY for them. " +
        "Your output must be a JSON object with two fields: 'city' (The name of the recommended city) and 'justification' (A concise 3-sentence explanation of why it fits the profile)."
      );
      
      const userProfile = (
        `The user's profile is:\n` +
        `- Age: ${age} years old\n` +
        `- Monthly Budget: $${budget}\n` +
        `- Mobility: ${mobility} (e.g., uses a cane/walker, fully mobile)\n` +
        `- Interests: ${interests} (e.g., beaches, colonial history, food, nightlife)\n\n` +
        `Which of the four cities (Puerto Vallarta, Mérida, San Miguel de Allende, Cancún) is the absolute best match?`
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userProfile }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || "{}";
      const recommendationData = JSON.parse(jsonResponseText);

      return res.json(recommendationData);

    } catch (error: any) {
      console.error('Recommendation API Error:', error);
      return res.status(500).json({ error: 'AI recommendation service failed to process request.' });
    }
  });

  // Neighborhood Sub-Heroes API endpoint (Task #13)
  app.post('/api/neighborhood_hero', async (req, res) => {
    try {
      const { city, neighborhoodName } = req.body;

      if (!city || !neighborhoodName) {
        return res.status(400).json({ error: "Missing city or neighborhoodName parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are an expert real estate agent and relocation consultant specializing in Mexican sub-neighborhoods. " +
        "Your task is to write a compelling 'Sub-Hero' summary for the specified neighborhood. " +
        "Focus on the unique real estate vibe, primary demographics (e.g., retirees, digital nomads, families), " +
        "and one unique local highlight. Output ONLY a JSON object with two fields: " +
        "'subHeadline' (A short, catchy phrase summarizing the neighborhood) and " +
        "'insight' (A 3-4 sentence detailed summary)."
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate the Sub-Hero content for ${neighborhoodName} in ${city}.` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || "{}";
      const heroData = JSON.parse(jsonResponseText);

      return res.json(heroData);

    } catch (error: any) {
      console.error('Neighborhood Hero API Error:', error);
      return res.status(500).json({ error: 'AI neighborhood synthesis failed to process request.' });
    }
  });

  // Live Expat Sentiment Index API endpoint (Task #14)
  app.post('/api/expat_sentiment', async (req, res) => {
    try {
      const { city } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are a social media analyst that tracks expat sentiment for Mexican cities. " +
        "Based on recent (last 30 days) community discussions, generate a 'Live Expat Sentiment Score' out of 100 for the provided city. " +
        "Score higher for positive vibes, lower for recurring complaints (e.g., bureaucracy, rising costs, safety). " +
        "Output ONLY a JSON object with two fields: 'score' (an integer from 60 to 99) and 'summary' (A 3-sentence justification of the score based on perceived recent trends)."
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate the current Live Expat Sentiment Score for ${city}.` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || '{"score": 80, "summary": "Could not determine recent sentiment."}';
      const sentimentData = JSON.parse(jsonResponseText);

      return res.json(sentimentData);

    } catch (error: any) {
      console.error('Expat Sentiment API Error:', error);
      return res.status(500).json({ error: 'AI sentiment analysis failed to process request.' });
    }
  });

  // Crime Safety Rating API endpoint (Task #16.2)
  app.post('/api/safety_rating', async (req, res) => {
    try {
      const { city, neighborhood } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are a public safety analyst specializing in crime statistics and expat safety for Mexican cities. " +
        "Analyze the crime profile, safety conditions, and security considerations for the given city/neighborhood. " +
        "Consider property crime, violent crime, tourist safety, police presence, and typical safety concerns. " +
        "Output ONLY a JSON object with these fields: " +
        "'safetyScore' (integer 1-100, where 100 is extremely safe), " +
        "'safetyLevel' (string: MUST be exactly one of: 'Very Safe', 'Safe', 'Moderate Caution', or 'Caution Advised'), " +
        "'crimeProfile' (2-3 sentence description of typical crime patterns, what crimes are most common, and target areas), " +
        "'recommendations' (2-3 sentence practical safety tips for expats living in or visiting this area)."
      );

      const locationContext = neighborhood 
        ? `Analyze the safety profile of ${neighborhood}, ${city}, Mexico for expats and long-term residents.`
        : `Analyze the safety profile of ${city}, Mexico for expats and long-term residents.`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: locationContext }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim();
      
      if (!jsonResponseText) {
        throw new Error('Empty response from LLM');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(jsonResponseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from LLM');
      }

      // Validate with Zod schema
      const validationResult = safetyRatingSchema.safeParse(parsedData);
      
      if (!validationResult.success) {
        console.error('Validation error:', validationResult.error);
        // Return safe fallback on validation failure
        return res.json({
          safetyScore: 75,
          safetyLevel: 'Safe',
          crimeProfile: 'Safety analysis temporarily unavailable. Please consult local authorities and embassy resources for current safety information.',
          recommendations: 'Exercise standard travel precautions: be aware of your surroundings, secure valuables, and stay informed about local conditions through official channels.'
        });
      }

      return res.json(validationResult.data);

    } catch (error: any) {
      console.error('Safety Rating API Error:', error);
      return res.status(500).json({ 
        error: 'AI safety analysis failed to process request.',
        details: error.message 
      });
    }
  });

  // Digital Nomad Readiness Score API endpoint (Task #17)
  app.post('/api/wifi_readiness', async (req, res) => {
    try {
      const { city } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are a remote work consultant and digital nomad expert. " +
        "Analyze the specified city for its digital infrastructure. " +
        "Based on the city's known average broadband speed, power reliability, and co-working/cafe culture, " +
        "generate a 'Digital Nomad Readiness Score' out of 100. " +
        "You MUST output ONLY valid JSON with EXACTLY these three fields (no additional fields): " +
        "{ \"readinessScore\": <integer 60-99>, \"internetSummary\": \"<3 sentences about speed, reliability, and work areas>\", \"bestProviderTip\": \"<provider tip>\" }"
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate the Digital Nomad Readiness Score for ${city}.` }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim();
      
      if (!jsonResponseText) {
        throw new Error('Empty response from LLM');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(jsonResponseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from LLM');
      }

      // Validate with Zod schema
      const validationResult = wifiReadinessSchema.safeParse(parsedData);
      
      if (!validationResult.success) {
        console.error('Validation error:', validationResult.error);
        // Return safe fallback on validation failure
        return res.json({
          readinessScore: 75,
          internetSummary: 'Digital infrastructure data currently unavailable for this location. Most major Mexican cities have reliable fiber optic connections, especially in expat-heavy neighborhoods. Co-working spaces typically offer backup generators and premium internet.',
          bestProviderTip: 'Ask local expat forums for the most reliable provider in your specific neighborhood.'
        });
      }

      return res.json(validationResult.data);

    } catch (error: any) {
      console.error('Digital Nomad API Error:', error);
      return res.status(500).json({ 
        error: 'AI digital nomad service failed to process request.',
        details: error.message 
      });
    }
  });

  // Incline & Benches Index - Accessibility Score API endpoint (Task #16.1)
  app.post('/api/accessibility_score', async (req, res) => {
    try {
      const { city, neighborhood } = req.body;

      if (!city) {
        return res.status(400).json({ error: "Missing city parameter." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are an urban mobility specialist focusing on pedestrian accessibility for seniors and individuals with mobility challenges. " +
        "Analyze the terrain, street inclines, sidewalk quality, and availability of rest spots (benches, shaded areas) for the given city/neighborhood. " +
        "Output ONLY a JSON object with these fields: " +
        "'accessibilityScore' (integer 1-100, where 100 is perfectly flat with abundant benches), " +
        "'terrainType' (string: MUST be exactly one of: 'Flat', 'Gentle Hills', 'Moderate Hills', or 'Steep Terrain'), " +
        "'inclineDescription' (2-sentence description of typical street slopes and walking difficulty), " +
        "'benchFrequency' (string: MUST be exactly one of: 'Abundant', 'Moderate', 'Sparse', or 'Very Limited'), " +
        "'restSpotDetails' (2-sentence description of shaded rest areas, seating availability, and public spaces for breaks)."
      );

      const locationContext = neighborhood 
        ? `Analyze the pedestrian accessibility of ${neighborhood}, ${city}, Mexico.`
        : `Analyze the pedestrian accessibility of ${city}, Mexico.`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: locationContext }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim();
      
      if (!jsonResponseText) {
        throw new Error('Empty response from LLM');
      }

      let parsedData;
      try {
        parsedData = JSON.parse(jsonResponseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from LLM');
      }

      // Validate with Zod schema
      const validationResult = accessibilityScoreSchema.safeParse(parsedData);
      
      if (!validationResult.success) {
        console.error('Validation error:', validationResult.error);
        // Return safe fallback on validation failure
        return res.json({
          accessibilityScore: 70,
          terrainType: 'Moderate Hills',
          inclineDescription: 'Terrain analysis temporarily unavailable. Please try again later.',
          benchFrequency: 'Moderate',
          restSpotDetails: 'Rest spot information temporarily unavailable. Please try again later.'
        });
      }

      return res.json(validationResult.data);

    } catch (error: any) {
      console.error('Accessibility Score API Error:', error);
      return res.status(500).json({ 
        error: 'AI accessibility analysis failed to process request.',
        details: error.message 
      });
    }
  });

  // Hyper-Local Climate Fit Score API endpoint (Task #15)
  app.post('/api/climate_fit', async (req, res) => {
    try {
      const { city, maxTemp, minTemp, humidityPreference } = req.body;

      if (!city || !maxTemp || !minTemp || !humidityPreference) {
        return res.status(400).json({ error: "Missing one or more required climate parameters." });
      }

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ error: "Groq API key not found." });
      }

      const groq = new Groq({ apiKey });

      const systemPrompt = (
        "You are a climate data scientist specializing in long-term relocation weather patterns. " +
        "Based on the user's specific ideal climate criteria, calculate a 'Climate Fit Percentage' (out of 100) for the given city. " +
        "Assume you have access to 30 years of historical monthly data for temperature and humidity. " +
        "The output must ONLY be a JSON object with two fields: 'fitScore' (an integer from 50 to 100) and 'justification' (A concise 3-sentence explanation of why the city fits that percentage, highlighting the best and worst months relative to their criteria)."
      );
      
      const userCriteria = (
        `The user's ideal climate is:\n` +
        `- Max Monthly Average Temperature: ${maxTemp}°F\n` +
        `- Min Monthly Average Temperature: ${minTemp}°F\n` +
        `- Humidity Preference: ${humidityPreference} (e.g., low, moderate, no preference)\n\n` +
        `Calculate the Climate Fit Percentage for ${city} against these criteria.`
      );

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userCriteria }
        ],
        response_format: { type: "json_object" }
      });

      const jsonResponseText = completion.choices[0].message.content?.trim() || '{"fitScore": 70, "justification": "Could not calculate fit based on historical data model."}';
      const climateData = JSON.parse(jsonResponseText);

      return res.json(climateData);

    } catch (error: any) {
      console.error('Climate Fit API Error:', error);
      return res.status(500).json({ error: 'AI climate analysis failed to process request.' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
