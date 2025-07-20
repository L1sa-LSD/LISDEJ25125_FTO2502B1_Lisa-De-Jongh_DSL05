# DJS05 – React Podcast App with Dynamic Show Detail Page

This project is a **React-based podcast browsing application** that allows users to explore podcasts with advanced features: search, sort, filter by genre, pagination, and now dynamic show detail pages with season navigation. It demonstrates dynamic routing, state management, and responsive UI.

## Core Functionality

- **Dynamic Routing & Show Detail Page**
  - Each podcast card links to a unique detail page (`/podcast/:id`).
  - The detail page fetches and displays all information for the selected show, including title, image, description, genres, last updated date, total seasons, and episodes.
  - Season navigation allows users to switch between seasons and view episodes for each season.
  - Handles loading, error, and empty states gracefully.

- **Preserved State**
  - Search, filter, and pagination state are preserved when navigating back from a show detail page to the homepage.

- **Search, Sort, Filter, Pagination**
  - Search podcasts by title (case-insensitive, live update)
  - Sort by newest, oldest, title (A→Z, Z→A), or default
  - Filter by genre using a dropdown (genre mapping is local for fast lookup)
  - Pagination adapts to screen size for optimal layout

## Project Structure

```
/src
│
├── /api
│   └── fetchPodcasts.js         # Fetch podcasts from the API
│
├── /components
│   ├── Header.jsx               # Top navigation bar
│   ├── PodcastCard.jsx          # Clickable podcast preview card (links to detail page)
│   ├── PodcastGrid.jsx          # Grid layout of podcast cards
│   ├── Podcast.jsx              # Podcast show detail page (dynamic, with season navigation)
│   ├── Pagination.jsx           # Pagination controls
│   ├── GenreFilter.jsx          # Genre filter dropdown
│   ├── SearchBar.jsx            # Search input
│   └── SortSelect.jsx           # Sort dropdown
│
├── /context
│   └── PodcastContext.jsx       # React context for global podcast state
│
├── /utils
│   └── formatDate.js            # Formats ISO date to readable format
│
├── data.js                      # Static genre mapping
├── App.jsx                      # Root app component (sets up routes)
└── main.jsx                     # React entry point (wraps app in router)
```

## How the New Code Works

- **Routing:**
  - The app uses `react-router-dom` for navigation.
  - The homepage (`/`) lists all podcasts with search, sort, filter, and pagination.
  - Clicking a podcast card navigates to `/podcast/:id`, showing the detail page for that show.

- **Show Detail Page:**
  - Fetches show data from `https://podcast-api.netlify.app/id/:id` using the ID from the URL.
  - Displays all show details, genres (mapped from IDs), last updated date, and a list of seasons.
  - Users can switch between seasons; episodes for the selected season are shown with episode number, title, image, and a shortened description.
  - Handles loading, error, and empty states for a smooth user experience.

- **State Preservation:**
  - The homepage state (search, filter, pagination) is managed by React Context and is preserved when navigating back from a detail page.

## How to Run

1. Open a terminal and navigate to the project directory:
   ```bash
   cd "C:\Users\Lee-Ann\Downloads\last try\DJS04-SOLUTION-main"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the app.

## Features Demonstrated
- Dynamic routing and data fetching by ID
- Graceful loading and error handling
- State management with React Context
- Responsive, modern UI
- Modular, well-documented code

---

**This project is a solution for DJS05: Show Detail Page with Routing and Navigation.**
