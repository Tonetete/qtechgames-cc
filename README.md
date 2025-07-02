# 🎮 GameHub Mini – ReactJS Developer Challenge

Welcome to the take-home technical challenge for frontend candidates at our gaming aggregator platform.

Your mission is to build a mini frontend app called **GameHub**, a simplified portal to explore a catalog of games. This test aims to assess your React skills, UI implementation, and ability to manage application state and structure.

Please use as source of data `public/games.json`

## 📦 Requirements

### 1. Game Catalog Page (`/`)

- ✅ Display a list of games fetched from (`/public/games.json`), you can create a backend or consume from the file directly.
- ✅ Show: game **title**, **studio**, **thumbnail**, and **rating** (0–5 stars)
- ✅ Add a **search bar** to filter games by title or studio name
- ✅ Add a **toggle** to view only favorite games

### 2. Game Detail Page (`/games/:id`)

- ✅ Show full **description**, **studio**, and **rating**
- ✅ Include a **"Play" button** (can be non-functional)
- ✅ Add a **"Favorite" / "Unfavorite" button** that updates a local favorites list
- ✅ Add any information which you consider relevant in the file `public/games.json`
- ✅ Add ratting system

### 3. Favorites System

- ✅ Use `localStorage` to persist favorite games between sessions

### 4. Routing

- ✅ Use `React Router` for page navigation:
- ✅ `/` for the catalog
- ✅ `/games/:id` for game details

### 5. UI/UX

- ✅ Use any styling method or UI framework (e.g., **Tailwind**, **Chakra UI**, **MUI**, or custom CSS)
- ✅ Design must be **responsive** and **mobile-friendly**

## 🎯 Bonus Features (Optional)

Feel free to include any of the following if you have time:

### 🌟 Advanced Frontend Challenges (Pick One or More)

These are optional and intended for candidates who want to go further:

- **🔌 Web Components**  
  ✅ Implement the game card or favorite toggle as a standalone Web Component using the Web Components API or a framework like [Lit](https://lit.dev/). Demonstrate it can be reused independently.

- **🧠 Custom React Hook**  
  ✅ Create a custom hook (e.g., `useFavorites`, `useFetch`, or `useLocalStorage`) to encapsulate reusable logic in a clean and testable way.

- **🚀 Lazy Loading / Code Splitting**  
  ✅ Implement route-based or component-based code splitting using `React.lazy` and `Suspense`.

- **📈 Performance Profiling**  
  ✅ Add `React.Profiler` to inspect renders. Include notes in your README on areas of improvement you found.

- **🧪 Testing**  
  ✅ Add unit or component tests using **Jest**, **React Testing Library**, or **Cypress** for UI flows.

- **🧩 Component Library Integration**  
  ✅ Show how one game component (e.g. GameCard) could be made into a reusable UI library using Storybook.

- **🌍 i18n**  
  ✅ Add basic internationalization support (e.g., English + Spanish) using `react-i18next` or similar.



