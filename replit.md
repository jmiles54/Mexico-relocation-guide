# Mexico Relocation Guide

## Overview

A comprehensive web application designed to help prospective expats evaluate and compare Mexican cities and neighborhoods for relocation. The platform provides data-driven insights across multiple dimensions including cost of living, safety, climate, expat community presence, and local amenities. Built with a focus on neighborhood-level granularity, the application features interactive comparison tools, a neighborhood matching quiz, activity discovery for specific demographics, and relocation checklists.

The application serves as a relocation decision-support tool, emphasizing transparent data sourcing, real-time information feeds, and scannable data hierarchies to help users make informed choices about where to live in Mexico.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**November 15, 2025 - Task #18: Social & Singles Vibe Index**

Added personalized social scene analysis feature to neighborhood detail pages:

- **Backend API** (`/api/social_vibe`): POST endpoint using Groq LLM (llama-3.3-70b-versatile) with explicit JSON structure to generate age-personalized social viability scores (50-100), 3-sentence justifications of social density/openness, and curated lists of best meeting spots. Includes Zod validation with fallback data.

- **Frontend UI**: Pink-themed interactive card with Heart icon in Overview tab. Features age input form (18-99, default 55) and manual submission trigger. Results display includes large score visualization (XX/100), italic social scene justification, and highlighted meeting spots recommendations. Grid layout: 2/5 for form, 3/5 for results.

- **User Experience**: User-triggered analysis (not auto-loading) that clears previous results on new submission. Allows multiple age comparisons to evaluate social fit for different life stages (e.g., age 35 vs. 65).

- **Test Coverage**: Full E2E validation with multiple age inputs (35→85/100, 65→72/100). All data-testids verified: card-social-vibe, input-social-age, button-get-social-vibe, text-social-score, text-social-justification, text-meeting-spots, button-retry-social.

**AI Integration Pattern**: 
- Uses Groq API key from GROQ_API_KEY environment variable
- Explicit JSON structure prompting to prevent validation errors
- Schema validation via Zod (socialVibeScore 50-100, min character requirements)
- Graceful fallback data on LLM failures
- Error handling with try-catch and user-facing retry mechanisms

**November 15, 2025 - Task #17: Digital Nomad Readiness Score**

Added comprehensive Digital Nomad Readiness feature to neighborhood detail pages:

- **Backend API** (`/api/wifi_readiness`): POST endpoint using Groq LLM (llama-3.3-70b-versatile) with explicit JSON structure prompt to generate readiness scores (60-99), internet infrastructure summaries, and provider tips. Includes Zod validation with fallback data on failures.

- **Frontend UI**: Indigo-themed card component in Overview tab featuring circular readiness score display, 3-sentence internet summary, and provider recommendation tip. Auto-loads on page mount with loading/error/retry states.

- **Share Feature**: Fixed-position Share & Screen-Share button (bottom-right) using navigator.share API with clipboard fallback for URL sharing.

- **Critical Bug Fixes**:
  - Improved Groq prompt specificity to prevent json_validate_failed errors
  - Added try-catch around Mapbox initialization in HealthcareMap to handle WebGL failures gracefully in headless browsers (prevents page crashes during E2E testing)

- **Test Coverage**: Full E2E validation with data-testid attributes on all interactive and display elements (card-nomad-readiness, text-readiness-score, text-internet-summary, text-provider-tip, button-share-report).

**AI Integration Pattern**: 
- Uses Groq API key from GROQ_API_KEY environment variable
- Response format: `{ type: "json_object" }` for structured output
- Schema validation via Zod (z.safeParse) with typed fallback data
- Error handling with try-catch and user-facing retry mechanisms

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight React router. Routes include:
- Home page with neighborhood search and featured listings
- Individual neighborhood detail pages
- Neighborhood comparison tool
- Interactive neighborhood matcher quiz
- Activity/venue discovery
- Relocation checklist

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global client state management library - component-level state with React hooks.

**UI Component System**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling. Uses the "New York" style variant with a Material Design foundation per design guidelines. Custom theme system with CSS variables for light/dark mode support.

**Styling Approach**: 
- Tailwind CSS utility-first framework
- Custom design tokens via CSS variables defined in index.css
- Roboto font family (primary) and Roboto Mono (for data display)
- Spacing based on 4px scale (4, 8, 12, 16, 20)
- Responsive breakpoints at 768px (mobile)

**Key UI Patterns**:
- Reusable card-based layouts for neighborhoods, venues, costs
- Data visualization through metric cards with icon, label, value, and trend
- Comparison tables with horizontal scroll on mobile
- Interactive filters with sliders and checkboxes
- Weather widgets and live webcam feeds
- Google Street View integration for neighborhood exploration

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful API with routes prefixed under `/api`. Currently minimal backend implementation - routes registered in `server/routes.ts` but application appears to be primarily frontend-driven with mock data.

**Development Server**: Custom Vite middleware integration for HMR (Hot Module Replacement) in development. Production build serves static assets from `dist/public`.

**Data Layer**: Storage abstraction interface (`IStorage`) with in-memory implementation (`MemStorage`). Supports basic CRUD operations for users. Designed to be swappable with database-backed implementation.

### Data Storage

**Database**: PostgreSQL configured via Drizzle ORM and Neon serverless driver (`@neondatabase/serverless`).

**Schema Definition**: Centralized in `shared/schema.ts` using Drizzle's schema builder. Currently defines:
- Users table with UUID primary keys
- Zod validation schemas via `drizzle-zod`

**Migration Strategy**: Drizzle Kit for schema migrations, output to `./migrations` directory. Push-based workflow via `db:push` script.

**Connection**: Database URL via `DATABASE_URL` environment variable, required at startup.

**Current State**: Database infrastructure configured but minimal schema. Application primarily uses mock/hardcoded data in components. Storage interface suggests future database integration planned.

### Authentication & Authorization

No authentication system currently implemented. User schema exists but no login/session management in routes. Session infrastructure via `express-session` with `connect-pg-simple` for PostgreSQL session storage is installed but not configured in codebase.

### External Dependencies

**Maps & Geolocation**:
- Google Maps JavaScript API for Street View panoramas
- TypeScript types via `@types/google.maps`
- API key via `VITE_GOOGLE_MAPS_API_KEY` environment variable
- **Required Google Cloud APIs**: Maps JavaScript API, Street View Static API

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components (accordion, dialog, dropdown, etc.)
- Embla Carousel for image carousels
- cmdk for command palette patterns
- Lucide React for icon system

**Styling & Design**:
- Tailwind CSS with custom configuration
- PostCSS with Autoprefixer
- class-variance-authority for variant-based component styling
- clsx and tailwind-merge for className utilities

**Forms & Validation**:
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for validation integration

**Data Fetching**:
- TanStack Query for async state and caching
- Native Fetch API for HTTP requests

**Date Handling**:
- date-fns for date manipulation and formatting

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- tsx for TypeScript execution in development
- esbuild for production server bundling

**Database & ORM**:
- Drizzle ORM with PostgreSQL dialect
- Neon serverless PostgreSQL client
- drizzle-zod for type-safe schema validation

### Asset Management

Static assets stored in `attached_assets/` directory with Vite alias `@assets`. Includes stock images for neighborhoods, venues, and beaches. Image imports use Vite's asset handling for optimization and cache-busting.

### Build & Deployment

**Development**: `npm run dev` - runs tsx server with Vite middleware
**Production Build**: 
1. Vite builds client to `dist/public`
2. esbuild bundles server to `dist/index.js` (ESM format, external packages)

**Production Start**: Node.js runs bundled server from `dist/index.js`

**Type Checking**: Standalone `npm run check` script using TypeScript compiler