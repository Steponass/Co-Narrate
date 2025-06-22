import "./App.css";
import PictureGrid from "./components/PictureGrid";
import SpeakMatchComponent from "./components/SpeakMatchComponent";
import { ThemeProvider } from "./context/ThemeContext";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
    <ThemeProvider>
      <div className=" bg-neutral-50 dark:bg-gray-900 text-black dark:text-white">
        <header className="w-full px-4 py-4 flex items-center justify-between bg-neutral-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-500">
            Co-Narrate
          </h1>
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
        </header>

        <main className="px-4 py-2 flex flex-col md:flex-row md:max-h-screen flex-wrap gap-4 bg-neutral-50 dark:bg-gray-900">
          <div className="basis-[0] grow-[999]">
            <h2 className="section-heading">Story Images</h2>
              <PictureGrid />
          </div>
          <div className="basis-sm grow-1 | ">
            <h2 className="section-heading">Speak & Match</h2>
              <SpeakMatchComponent />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;