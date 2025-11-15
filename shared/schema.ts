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
