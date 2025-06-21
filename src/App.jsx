import "./App.css";
import PictureGrid, { PictureGridActions } from "./components/PictureGrid";
import SpeakMatchComponent from "./components/SpeakMatchComponent";
import { ThemeProvider } from "./context/ThemeContext";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 shadow">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-400">
            Co-Narrate
          </h1>
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
        </header>

        <main className="flex-1 px-4 py-2 flex flex-col xl:flex-row gap-4 bg-white dark:bg-gray-900">
          <div className="flex-1 flex flex-col xl:flex-[2]">
            <h2 className="p-2 text-xl font-bold text-gray-900 dark:text-white">Story Images</h2>
            <div className="flex-1">
              <PictureGrid />
            </div>
          </div>
          <div className="w-full flex flex-col xl:w-86 ">
            <h2 className="p-2 text-xl font-bold text-gray-900 dark:text-white">Speak & Match</h2>
            <div className="flex-1">
              <SpeakMatchComponent />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;