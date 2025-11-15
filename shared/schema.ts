import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Accessibility Score Response Schema (Task #16.1)
export const accessibilityScoreSchema = z.object({
  accessibilityScore: z.number().int().min(1).max(100),
  terrainType: z.enum(['Flat', 'Gentle Hills', 'Moderate Hills', 'Steep Terrain']),
  inclineDescription: z.string().min(20),
  benchFrequency: z.enum(['Abundant', 'Moderate', 'Sparse', 'Very Limited']),
  restSpotDetails: z.string().min(20),
});

export type AccessibilityScore = z.infer<typeof accessibilityScoreSchema>;

// Safety Rating Response Schema (Task #16.2)
export const safetyRatingSchema = z.object({
  safetyScore: z.number().int().min(1).max(100),
  safetyLevel: z.enum(['Very Safe', 'Safe', 'Moderate Caution', 'Caution Advised']),
  crimeProfile: z.string().min(30),
  recommendations: z.string().min(30),
});

export type SafetyRating = z.infer<typeof safetyRatingSchema>;

// Digital Nomad Readiness Response Schema (Task #17)
export const wifiReadinessSchema = z.object({
  readinessScore: z.number().int().min(60).max(99),
  internetSummary: z.string().min(40),
  bestProviderTip: z.string().min(10),
});

export type WifiReadiness = z.infer<typeof wifiReadinessSchema>;

export const socialVibeSchema = z.object({
  socialVibeScore: z.number().int().min(50).max(100),
  socialSceneJustification: z.string().min(50),
  bestMeetingSpots: z.string().min(20),
});

export type SocialVibe = z.infer<typeof socialVibeSchema>;

export const seasonalHazardSchema = z.object({
  hazardRiskScore: z.number().int().min(1).max(100),
  riskLevel: z.enum(['Low Risk', 'Moderate Risk', 'High Risk', 'Very High Risk']),
  seasonalitySummary: z.string().min(40),
  mitigationTip: z.string().min(30),
});

export type SeasonalHazard = z.infer<typeof seasonalHazardSchema>;
