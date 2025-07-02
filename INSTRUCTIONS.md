## 🎮 Game Catalog Application
A React-based game catalog application for browsing and rating games. Built with TypeScript, TailwindCSS, and Storybook for component documentation.

## 📦 Prerequisites
- Node.js v20.15.1 (recommended — use nvm to manage versions)
- Node package manager (npm)

## 🚀 Installation
Clone the repository

Go to games-api folder an execute:

```
npm install
```
Go to root folder an execute:

```
npm install
```

🖥️ Running the Application
Start the development server:

Go to games-api folder an execute:
```
npm start
```

Go to root folder an execute:

```
npm start
```

App available at: http://localhost:3000

📚 Storybook
Storybook is used to document and showcase UI components in isolation.

Start Storybook:

```
npm run storybook
``` 

Storybook will be available at: http://localhost:6006

🧪 Testing
✅ Unit Tests (Jest)
Run unit tests:

```
npm run test
```

Run with coverage:

```
npm run test:coverage
```

🔁 End-to-End Tests (Cypress)

Open Cypress Test Runner:

```
npm run cypress:open
```

Run tests headlessly:

```
npm run cypress:run
```

🗂️ Project Structure
```
/src
/components
/atoms        # Basic UI components
/molecules    # Composed of atoms
/organisms    # Composed of molecules and atoms
/templates    # Page layout templates
/pages        # Full pages
/hooks          # Custom React hooks
/contexts       # React context providers
/services       # API services
/utils          # Utility functions
/i18n           # Internationalization
/assets         # Static assets
```

🌍 Internationalization
Uses i18next for multi-language support. Translation files are located in:

`/src/i18n/locales/[language-code]/translation.json`

To add a new language:

Create a translation file.

Register it in `/src/i18n/i18n.ts`

🎮 Game API
To start the backend API:
```
cd game-api
npm install
npm start
```

`API available at: http://localhost:3001`

📌 Dependency Notes
This project uses:

TypeScript 4.9.5

React 19.1.0

i18next 21.10.0 & react-i18next 11.18.6 (downgraded for TS compatibility)

Storybook 9.0.15

TailwindCSS 3.4.17