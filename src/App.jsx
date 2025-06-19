import './App.css';
import PictureGrid from './components/PictureGrid';
import SpeakMatchComponent from './components/SpeakMatchComponent';
import { ThemeProvider } from './context/ThemeContext';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="w-full px-[1.5rem] py-4 sm:py-6 bg-white dark:bg-gray-900 shadow flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-400 text-center">
            Co-Narrate
          </h1>
          <div className="flex justify-center items-center h-full">
            <DarkModeToggle />
          </div>
        </header>

        <main className="h-full flex flex-col min-[800px]:flex-row w-full p-3 gap-3 dark:bg-gray-900  max-w-6xl m-auto ">
          <div>
            <PictureGrid />
          </div>
          <div>
            <SpeakMatchComponent />
          </div>
        </main>

        <footer className="min-h-12 bg-white dark:bg-gray-900 shadow | p-2 | flex items-center justify-between">
          <p>Need help? <strong>Too bad.</strong></p>
          <p>Designed & built by <a href="https://www.linkedin.com/in/steponasd/">S.D.</a></p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
