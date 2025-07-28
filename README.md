# **Movie Browser \- Technical Assessment**

This project is a feature-rich web application built to fulfill a technical assessment. It allows users to browse movies by category, view detailed information, and manage a personal wishlist. The application is built from the ground up using modern tools like React, Vite, and TypeScript, with a strong emphasis on code quality, testing, and Server-Side Rendering (SSR).

---

## **✨ Features**

- **Homepage with Carousels**: The main page displays three distinct carousels, each representing a different movie genre.
- **Detailed Movie Pages**: Clicking on any movie card navigates the user to a dedicated details page.
- **Dynamic Theming**: The movie detail page dynamically changes its appearance (fonts, button styles, and background) based on the movie's primary genre, providing a unique user experience.
- **Wishlist Functionality**: Users can add or remove movies from a personal wishlist. This state is preserved across sessions using `localStorage`.
- **Dedicated Wishlist Page**: A separate page displays all the movies the user has added to their wishlist, with options for sorting and pagination.
- **Server-Side Rendering (SSR)**: The application is fully server-side rendered for improved SEO and initial page load performance.

---

## **🛠️ Tech Stack & Architecture**

This project was handcrafted without using frameworks like Next.js or Create React App to demonstrate a deep understanding of the build process and application architecture.

- **Core**:
  - **React 19**: For building the user interface.
  - **TypeScript**: For robust, scalable, and maintainable code with static typing.
  - **Vite**: As the build tool, chosen for its incredible development speed and powerful, native SSR support.
  - **React Router v6**: For all client-side and server-side routing, including data loading via `loader` functions.
- **Backend & SSR**:
  - **Node.js \+ Express**: A minimal Express server is used to handle server-side rendering in both development and production environments.
- **Styling**:
  - **SCSS**: Used for all styling, following a structured, component-based approach without relying on CSS-in-JS or utility-first frameworks as per requirements.
- **Testing**:
  - **Vitest**: The testing framework, chosen for its seamless integration with Vite and its Jest-compatible API.
  - **React Testing Library**: For writing user-centric component tests that are resilient to implementation changes.
  - **MSW (Mock Service Worker)**: To intercept API requests and provide reliable mock data, ensuring tests are fast and isolated from network dependencies.
  - **`@testing-library/user-event`**: To simulate real user interactions in tests.
- **Code Quality**:
  - **ESLint & Prettier**: For maintaining a consistent and high-quality codebase.

---

## **🚀 Getting Started**

Follow these steps to get the project running on your local machine.

### **1\. Prerequisites**

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### **2\. Clone the Repository**

```
git clone https://github.com/davideoliveri/MovieBrowserMT.git
cd moviebrowsermt
```

### **3\. Install Dependencies**

Install all the necessary packages defined in `package.json`.

```
npm install
```

### **4\. Set Up Environment Variables**

The application requires an API key from TheMovieDatabase (TMDB).

1. Copy the example environment file:

```
cp .env.example .env
```

2. Sign up for a free TMDB account and get your API key from your [API settings page](https://www.themoviedb.org/settings/api).

3. Open the newly created `.env` file and replace `<your_tmdb_api_key>` with your actual key.

```
VITE_TMDB_API_KEY="your-actual-api-key-goes-here"
```

### **5\. Run the Development Server**

This command starts the Express server with Vite's middleware, enabling both Server-Side Rendering and Hot-Module Replacement (HMR) for a smooth development experience.

```
npm run dev
```

The application will be available at **http://localhost:3000**.

---

## What to do next?

If you want to build for production and test how it would perform with a live nodejs server you can run the following command:

```
npm run build:server && npm run serve
```

Another cool feature of this project is the possibility check test coverage and reports using Vite UI.
To do that you would simply run

```
npm run test:ui
```

This will launch a tiny server that serves the dashboarsd from which you can see which tests are passing, which are not, dependenices of each test and the coverage for the whole project.

Find below a summary of the scripts you can run.

---

## **📜 Available Scripts**

This project comes with a set of useful scripts defined in `package.json`:

- **`npm run dev`**: Starts the SSR development server with HMR.
- **`npm run dev:vite`**: Starts **pure vite** development server with HMR.
- **`npm run build`**: Builds the entire application for production. It creates an optimized client bundle and a server bundle.
- **`npm run serve`**: Runs the production-ready application using the pre-built files.
- **`npm test`**: Runs the entire test suite in watch mode, re-running tests on file changes.
- **`npm run test:once`**: Runs all tests a single time. Ideal for CI/CD environments.
- **`npm run test:ui`**: Launches the Vitest UI, an interactive interface for viewing and running tests, including coverage reports.
- **`npm run lint`**: Lints all TypeScript and TSX files in the `src` directory.
- **`npm run format`**: Formats the entire codebase using Prettier.
