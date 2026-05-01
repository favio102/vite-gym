# Titan Strength

> **Your ultimate fitness companion for discovering and mastering exercises**

A modern, responsive fitness web application that helps users explore, search, and learn about various exercises with detailed information, video tutorials, and muscle-specific recommendations.

## 🎯 Project Description

Titan Strength is a comprehensive exercise discovery platform built with React and Vite. It gives users access to a vast database of exercises, with search by name, target muscle, equipment, or body part. Each exercise comes with detailed information, animated GIFs, related YouTube tutorial videos, and similar-exercise recommendations.

### ✨ Key Features

- 🔍 **Smart Exercise Search** - Search exercises by name, target muscle, equipment, or body part
- 🎯 **Body Part Filter** - Browse exercises by specific body parts using an intuitive horizontal scrollbar
- 📊 **Detailed Exercise Information** - View comprehensive details including target muscles, required equipment, and animated demonstrations
- 🎥 **Video Tutorials** - Watch related YouTube tutorial videos for each exercise
- 💡 **Smart Recommendations** - Get similar exercises based on target muscle or equipment
- 📱 **Responsive Design** - Fully optimized for desktop and mobile devices
- 🔄 **Pagination** - Browse through exercises efficiently with built-in pagination
- ⚡ **Fast Performance** - Lightning-fast load times powered by Vite

## 🛠️ Tech Stack

### Core Technologies
- **React** `^18.2.0` - JavaScript library for building user interfaces
- **Vite** `^8.0.10` - Next-generation frontend build tool
- **React Router DOM** `^6.3.0` - Declarative routing for React applications

### UI Framework & Styling
- **Material-UI (MUI)** `^5.6.1` - React component library
  - `@mui/material` - Core MUI components
  - `@mui/icons-material` - Material Design icons
  - `@emotion/react` `^11.9.0` - CSS-in-JS styling
  - `@emotion/styled` `^11.8.1` - Styled components
- **PostCSS** `^8.4.39` - CSS transformation tool
- **Autoprefixer** `^10.4.19` - CSS vendor prefixing

### Additional Libraries
- **react-horizontal-scrolling-menu** `^2.7.1` - Horizontal scrolling component for body part selection
- **react-loader-spinner** `^6.0.0-0` - Loading animations
- **dotenv** `^16.4.5` - Environment variable management

### Development Tools
- **ESLint** `^8.57.0` - JavaScript linting
  - `eslint-plugin-react` `^7.34.1`
  - `eslint-plugin-react-hooks` `^4.6.0`
  - `eslint-plugin-react-refresh` `^0.4.6`
- **TypeScript Types** - Type definitions for React and React DOM

## 📁 Project Structure

```
vite-gym/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/
│   ├── assets/            # Images and icons
│   │   ├── icons/         # UI icons (body-part, target, equipment, arrows)
│   │   └── images/        # Application images (banner, logo)
│   ├── components/        # React components
│   │   ├── BodyPart.jsx          # Body part selection card
│   │   ├── Detail.jsx            # Exercise detail display
│   │   ├── ExerciseCard.jsx      # Individual exercise card
│   │   ├── Exercises.jsx         # Exercise list with pagination
│   │   ├── ExerciseVideos.jsx    # YouTube video tutorials
│   │   ├── Footer.jsx            # Application footer
│   │   ├── HeroBanner.jsx        # Homepage hero section
│   │   ├── HorizontalScrollbar.jsx  # Scrollable body part selector
│   │   ├── Loader.jsx            # Loading spinner
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── SearchExercises.jsx   # Search and filter interface
│   │   └── SimilarExercises.jsx  # Similar exercise recommendations
│   ├── pages/             # Page components
│   │   ├── Home.jsx              # Homepage with search and exercises
│   │   └── ExerciseDetail.jsx    # Detailed exercise view
│   ├── utils/             # Utility functions
│   │   └── fetchData.js          # API fetching logic and configuration
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── postcss.config.js      # PostCSS configuration
├── .eslintrc.cjs          # ESLint configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **RapidAPI Account** - Required for accessing exercise data and YouTube videos

### Environment Variables

This application requires a RapidAPI key to function. You'll need to:

1. Sign up for a free account at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the following APIs:
   - [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) - Exercise data
   - [YouTube Search and Download](https://rapidapi.com/h0p3rwe/api/youtube-search-and-download) - Video tutorials

3. Create a `.env` file in the root directory:

```bash
VITE_APP_RAPID_API_KEY=your_rapidapi_key_here
```

**Note:** The `.env` file is gitignored and should never be committed to version control.

### Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

```bash
git clone https://github.com/favio102/vite-gym.git
cd vite-gym
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add your RapidAPI key (see Environment Variables section above).

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is in use).

5. **Build for production**

```bash
npm run build
```

The optimized production build will be created in the `dist/` directory.

6. **Preview production build**

```bash
npm run preview
```

## 📖 Usage & Examples

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

Access the application at `http://localhost:5173/`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

### Application Features Usage

1. **Search for Exercises**
   - Use the search bar on the homepage to find exercises by name, target muscle, equipment, or body part
   - Click "Search" or press Enter to view results

2. **Filter by Body Part**
   - Scroll through the body part categories below the search bar
   - Click on any body part to filter exercises

3. **View Exercise Details**
   - Click on any exercise card to view detailed information
   - See animated GIF demonstrations, target muscles, and required equipment
   - Watch related YouTube tutorial videos
   - Explore similar exercises based on target muscle or equipment

4. **Navigate**
   - Use the pagination controls to browse through multiple pages of exercises
   - Click the "Home" link in the navigation bar to return to the homepage

## ⚙️ Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Key configurations in `vite.config.js`:

- **Output Directory:** `dist/`
- **Path Alias:** `@` points to `/src` for cleaner imports
- **Base Path:** `./` for relative asset paths

### ESLint

ESLint is configured with React-specific rules:
- React 18.2 compatibility
- React Hooks rules enforcement
- React Refresh for fast HMR

### API Configuration

API endpoints are configured in `src/utils/fetchData.js`:
- **ExerciseDB API:** `https://exercisedb.p.rapidapi.com`
- **YouTube Search API:** `https://youtube-search-and-download.p.rapidapi.com`

Error handling includes:
- Rate limiting detection (429 errors)
- HTTP error status handling
- User-friendly error messages

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help improve Titan Strength:

1. **Open an Issue or Feature Request**
   - Before making changes, open an issue to discuss your proposed changes
   - Describe the bug you want to fix or the feature you want to add
   - Wait for maintainer feedback and approval

2. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page
   - Clone your forked repository to your local machine

3. **Add fixes or features**
   - Create a new branch for your changes: `git checkout -b feature/your-feature-name`
   - Make your changes following the existing code style
   - Test your changes thoroughly
   - Ensure the code passes ESLint: `npm run lint`
   - Commit your changes with clear, descriptive messages

4. **Make a Pull Request (PR)**
   - Push your changes to your fork: `git push origin feature/your-feature-name`
   - Open a Pull Request from your fork to the main repository
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for code review and address any feedback

### Development Guidelines

- Follow the existing code style and component structure
- Use meaningful variable and function names
- Write clear commit messages
- Test your changes before submitting
- Update documentation if you add new features
- Ensure all components are responsive

## 📝 License

This project is open source and available for educational and personal use.

## 🙏 Acknowledgments

- Exercise data provided by [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
- Video content sourced via [YouTube Search API](https://rapidapi.com/h0p3rwe/api/youtube-search-and-download)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- UI components from [Material-UI](https://mui.com/)

---

**Powered by Titan Strength** - *Unleash your inner titan*