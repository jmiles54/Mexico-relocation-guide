# Mexico Relocation Guide - Design Guidelines

## Design Approach
**Selected Approach**: Design System Foundation (Material Design)
**Rationale**: Data-dense relocation tool requiring clear information hierarchy, comparison tables, live data feeds, and complex filtering. Material Design provides robust components for data visualization, cards, tables, and real-time updates while maintaining clarity and scannability.

**Key Design Principles**:
1. Information clarity over visual flourish
2. Scannable data hierarchies for quick comparison
3. Transparent data sourcing (timestamps, links to sources)
4. Neighborhood-level granularity as primary navigation paradigm
5. Real-time data integration without UI disruption

---

## Core Design Elements

### A. Typography

**Font Stack**:
- Primary: Roboto (via Google Fonts CDN)
- Monospace (for data/prices): Roboto Mono

**Hierarchy**:
- **H1 (Page Titles)**: Roboto 2.5rem/700 - City/neighborhood names
- **H2 (Section Headers)**: Roboto 2rem/600 - Major category headers
- **H3 (Subsection)**: Roboto 1.5rem/600 - Data category labels
- **H4 (Card Titles)**: Roboto 1.25rem/500 - Neighborhood cards, venue names
- **Body Large**: Roboto 1.125rem/400 - Primary descriptive text
- **Body Regular**: Roboto 1rem/400 - Standard content
- **Body Small**: Roboto 0.875rem/400 - Metadata, timestamps, sources
- **Caption**: Roboto 0.75rem/400 - Data source citations
- **Data Display**: Roboto Mono 1.125rem/500 - Prices, metrics, numbers

---

### B. Layout System

**Spacing Primitives**: Use Tailwind units of **4, 8, 12, 16, 20** as primary spacing scale
- Component padding: p-4, p-8
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-4, gap-8
- Margin separation: mb-8, mb-12

**Grid System**:
- Container max-width: max-w-7xl (1280px)
- Comparison tables: max-w-full with horizontal scroll on mobile
- Data dashboard: CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

**Responsive Breakpoints**:
- Mobile: base (single column stacking)
- Tablet: md (2-column layouts for comparisons)
- Desktop: lg (3-4 column data grids, side-by-side comparisons)

---

### C. Component Library

#### 1. Navigation
**Primary Navigation**:
- Sticky top navigation bar with elevation shadow
- Logo/brand left-aligned
- Main navigation items: Cities, Neighborhoods, Compare, Resources, Community
- Search bar with autocomplete (prominent, 40% width on desktop)
- Mobile: Hamburger menu transforming to drawer

**Secondary Navigation**:
- Breadcrumb trail for drill-down paths (City > Neighborhood > Section)
- Tab navigation within neighborhood pages (Overview, Costs, Social, Safety, Webcams)

#### 2. Core UI Elements

**Cards**:
- Elevated cards with subtle shadow: `shadow-md hover:shadow-lg`
- Neighborhood summary cards: Image header (16:9 aspect), title, 3-4 key metrics, CTA
- Metric cards: Icon, large number display, label, trend indicator
- Comparison cards: Side-by-side layout with data alignment

**Data Tables**:
- Striped rows for scannability (alternating row treatment)
- Sticky headers on scroll
- Sortable columns with indicator icons
- Source link icon in each cell (clickable to view data source)
- Timestamp displayed in table footer
- Responsive: Stack to cards on mobile

**Webcam Integration**:
- 16:9 aspect ratio video containers
- Live indicator badge (top-right corner with pulsing dot)
- Location label overlay (bottom with semi-transparent background)
- Refresh/quality toggle controls
- Fallback placeholder for offline feeds
- Multiple webcam grid: 2 columns tablet, 3 columns desktop

**Metric Displays**:
- Large number with unit (e.g., "$850 MXN")
- Label below number
- Comparison indicator (percentage difference vs. average)
- Data source link (small text with icon)
- Visual treatment indicators: outlined box styling differentiates data quality (verified, estimated, user-submitted)

**Interactive Map**:
- Full-width embedded map section
- Location pins for neighborhoods (clustered at city level, expand on zoom)
- Sidebar overlay with neighborhood quick info on pin click
- Filter controls (price range, climate, expat density) above map
- Legend showing pin categories

#### 3. Forms & Inputs

**Filter Controls**:
- Multi-select dropdowns for cities, neighborhoods
- Range sliders for affordability (min/max), climate preferences
- Toggle switches for features (beach proximity, expat community, safety tier)
- Checkbox groups for amenities (wine bars, medical facilities, markets)

**User Contribution Forms**:
- Price update submission: Venue name, item, price, date, optional photo upload
- Review submission: Star rating, written review, visit date
- Validation with inline error messaging

**Search**:
- Autocomplete with category headers (Cities, Neighborhoods, Venues)
- Recent searches display
- No results state with suggestions

#### 4. Data Displays

**Cost Breakdown Tables**:
- Category rows (Housing, Food, Transport, Utilities, Entertainment)
- Sub-item indentation (1BR rent, studio, 2BR under Housing)
- Price column with currency
- Comparison column (% vs. city average, vs. US equivalent)
- Data source column (icon linking to source)
- Last updated timestamp row at bottom

**Proximity Dashboard**:
- Distance matrix showing walking/transit time to key locations
- Visual indicators: Walking distance icons, transit icons
- Map thumbnail with route overlay
- Expandable detail showing exact address and Google Maps link

**Social Venue Directory**:
- Filterable list/grid of venues
- Each listing: Name, category icon, address, price range indicator, crowd demographic tag, photo
- Embedded mini-map showing venue location
- Expandable details: Hours, contact, typical events, user reviews

**Affordability Index Breakdown**:
- Overall score display (large number, 0-100 scale)
- Component breakdown: Horizontal bar chart showing contribution of each cost category
- "What's included" expandable section explaining methodology
- Comparison to other neighborhoods (smaller index cards)

#### 5. Overlays & Modals

**Data Source Modal**:
- Triggered by source link icons
- Display: Source name, date collected, collection method, reliability indicator
- Link to original source (if available)
- User report correction button

**Image Lightbox**:
- For venue photos, neighborhood images
- Navigation arrows, close button, caption display

**Comparison Overlay**:
- Side-by-side neighborhood comparison (up to 3 neighborhoods)
- Aligned data rows for direct comparison
- Highlight differences above/below threshold

---

### D. Page Layouts

#### Homepage
- Hero section: Large heading, subheading, primary CTA, search bar integration
- Featured cities grid (3-4 cards with images, key stats preview)
- Interactive map preview with popular neighborhoods highlighted
- Recent updates feed (latest price updates, new venues added)
- Testimonials from relocators

#### City Overview Page
- City hero with key stats ribbon (population, average cost, climate summary)
- Neighborhood comparison table (sortable, top 8-10 neighborhoods)
- City-wide metrics dashboard (4-column grid of metric cards)
- Map showing all neighborhoods with color-coded affordability
- Getting around section (transportation options, costs)

#### Neighborhood Detail Page
- Breadcrumb navigation
- Neighborhood header: Name, location badge, overall score
- Tabbed navigation (6 tabs):
  1. **Overview**: Summary metrics, map, description
  2. **Cost of Living**: Detailed breakdown tables, comparison charts
  3. **Social Scene**: Venue directory, expat groups, events calendar
  4. **Safety & Healthcare**: Crime stats, hospital proximity, emergency info
  5. **Webcams**: Live feeds grid (2-4 feeds), location map
  6. **Community Reviews**: User reviews, ratings, submission form
- Each tab: Full-width content with consistent padding (p-8)

#### Comparison Tool Page
- Neighborhood selector (dropdowns, max 3 selections)
- Side-by-side comparison table (full width, horizontally scrollable)
- Visual comparison charts (bar charts for costs, radar chart for lifestyle factors)
- Export comparison button

---

## Images

**Required Images**:
1. **Hero Section** (Homepage): Large hero image showing vibrant Mexican beach town, colorful architecture. Overlay with semi-transparent background for heading/CTA contrast. Image should span full viewport width, 60vh height.

2. **City Cards** (Homepage): Each city card needs representative image (16:9 aspect ratio) - beach for coastal cities, colonial architecture for inland cities. Images should be vibrant, showing lifestyle appeal.

3. **Neighborhood Cards**: Thumbnail images (16:9) showing character of each neighborhood - street scenes, beaches, plazas. Used in comparison grids and search results.

4. **Venue Listings**: Each social venue (wine bars, restaurants) should display 1-2 photos showing interior/exterior, crowd atmosphere.

5. **Webcam Placeholders**: When webcam offline, display static representative image of the view with "Offline" overlay badge.

---

## Animation Guidelines

**Use sparingly, purpose-driven only**:
- Live webcam indicator: Pulsing dot animation (2s loop)
- Card hover: Subtle elevation increase (shadow transition 0.3s)
- Tab switching: Fade transition (0.2s)
- Data update: Brief highlight flash on changed values
- **No scroll animations, no parallax, no complex transitions**

---

## Accessibility

- High contrast text on all backgrounds (WCAG AA minimum)
- Form inputs with visible labels and focus states
- Interactive elements minimum 44px touch target
- Alt text for all images (neighborhood names, venue names)
- Keyboard navigation for all interactive elements
- Skip links for data tables
- ARIA labels for icon-only buttons

---

## Icons

**Icon Library**: Material Icons (via Google Fonts CDN)
- Navigation: menu, search, close, arrow_back
- Metrics: home, restaurant, directions_bus, local_hospital, security, beach_access
- Data: trending_up, trending_down, info, link, calendar_today
- Actions: compare, filter_list, share, bookmark
- Live indicator: fiber_manual_record (for webcam dot)

**Icon Usage**: 24px standard size, 20px for compact contexts (table cells), 32px for feature highlights