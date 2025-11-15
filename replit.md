# Mexico Relocation Guide

## Overview

A comprehensive web application designed to help prospective expats evaluate and compare Mexican cities and neighborhoods for relocation. The platform provides data-driven insights across multiple dimensions including cost of living, safety, climate, expat community presence, and local amenities. It offers interactive comparison tools, a neighborhood matching quiz, activity discovery, and relocation checklists. The application serves as a relocation decision-support tool, emphasizing transparent data sourcing, real-time information, and scannable data hierarchies for informed choices. Key capabilities include a "Two-City Logistics Engine" for seasonal living planning, city-specific "Emergency Preparedness & Evacuation Resources," "Seasonal Hazard & Hurricane Risk Index," and "Digital Nomad Readiness Score," and a "Social & Singles Vibe Index" for personalized social scene analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite.
**Routing**: Client-side routing with Wouter.
**State Management**: TanStack Query for server state; component-level state with React hooks for client state.
**UI Component System**: Shadcn/ui (based on Radix UI) with Tailwind CSS, using a "New York" style variant and Material Design foundation. Custom theme for light/dark mode.
**Styling**: Tailwind CSS, custom design tokens via CSS variables, Roboto font family, 4px spacing scale, responsive breakpoints at 768px.
**Key UI Patterns**: Reusable card-based layouts, data visualization with metric cards, comparison tables, interactive filters, weather widgets, and Google Street View integration.

### Backend Architecture

**Server Framework**: Express.js on Node.js with TypeScript.
**API Structure**: RESTful API with `/api` prefix.
**Data Layer**: Abstracted storage interface (`IStorage`) with an in-memory implementation, designed for future database integration.

### Data Storage

**Database**: PostgreSQL configured via Drizzle ORM and Neon serverless driver.
**Schema Definition**: Centralized in `shared/schema.ts` using Drizzle's schema builder, defining user schemas with Zod validation.
**Migration Strategy**: Drizzle Kit for schema migrations.
**Authentication & Authorization**: Currently none implemented, though user schema and session infrastructure (express-session with connect-pg-simple) are present for future development.

### AI Integration Pattern
Utilizes Groq LLM (llama-3.3-70b-versatile) for various features, following a consistent pattern:
- Uses `GROQ_API_KEY` environment variable.
- Employs explicit JSON structure prompting for structured output.
- Implements Zod for schema validation with defined types and constraints.
- Includes graceful fallback data for LLM/validation failures.
- Incorporates error handling with try-catch blocks and user-facing retry mechanisms.

## External Dependencies

**Maps & Geolocation**:
- Google Maps JavaScript API, Street View Static API (via `VITE_GOOGLE_MAPS_API_KEY`).
**UI Component Libraries**:
- Radix UI, Embla Carousel, cmdk, Lucide React (icons).
**Styling & Design**:
- Tailwind CSS, PostCSS, class-variance-authority, clsx, tailwind-merge.
**Forms & Validation**:
- React Hook Form, Zod, @hookform/resolvers.
**Data Fetching**:
- TanStack Query, Native Fetch API.
**Date Handling**:
- date-fns.
**Development Tools**:
- Replit-specific plugins, tsx, esbuild.
**Database & ORM**:
- Drizzle ORM, Neon serverless PostgreSQL client, drizzle-zod.