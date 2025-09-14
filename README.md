# Users Search Frontend (React + Vite)

## 🚀 Quick Start

1. **Install Node.js**  
   Ensure Node.js v16+ (v18 recommended).  
   ```bash
   node -v
   npm -v

    Install dependencies

npm install

Run in development

npm run dev

Open http://localhost:5173

in your browser.

Build for production

    npm run build
    npm run preview

🛠 Features

    Google-like search bar (≥3 chars) for user free-text search.

    Fetch users from backend API or fallback to local mock dataset.

    Responsive grid display of results with user info:

        Avatar, full name, age, role, company title, email, city/country, masked SSN.

    Client-side sorting (age asc/desc).

    Client-side filtering (by role).

    Single Page App with React Router.

    Lazy loading of routes and components.

    Unit tests with Vitest + React Testing Library.

⚙️ Environment

Copy .env.example → .env and configure:

VITE_API_URL=https://api.example.com
VITE_APP_NAME=UsersSearch

If VITE_API_URL is left blank, the app uses the mock dataset at src/mocks/users.json.
🧪 Testing

Run all tests:

npm run test

Run tests with UI:

npm run test:ui

📂 Project Structure

src/
  components/   # UI components (atomic design: atoms, molecules, organisms)
  routes/       # Pages (Home, Users)
  features/     # State (search store)
  services/     # API client
  mocks/        # Local dummy users.json
  utils/        # Helpers (debounce, sorters)
  tests/        # Unit tests

📖 Notes

    Built with React 18 + Vite + Tailwind.

    State management via Zustand.

    Configs externalized in .env.

    Fully responsive design.
