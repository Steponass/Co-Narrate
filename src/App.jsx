import "./App.css";
import PictureGrid from "./components/PictureGrid/PictureGrid";
import SpeakMatch from "./components/SpeakMatch/SpeakMatch";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import VisitTracker from "./components/VisitTracker";
import Footer from "./components/Footer";
import GuideOverlay from "./components/Help/GuideOverlay";
import { useState } from "react";

function App() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-gray-900 text-black dark:text-white">
        <Header/>
        <main className="flex-1 px-4 py-3 flex flex-col md:flex-row gap-4 bg-neutral-50 dark:bg-gray-900 min-h-0">
          <VisitTracker setShowGuide={setShowGuide}/>
          <div id="picture-grid" className="basis-0 grow min-w-0 max-sm:pb-4 shadow">
            <h2 className="section-heading px-3">Story Images</h2>
            <PictureGrid />
          </div>
          <div id="speak-match" className="basis-sm grow-1 | md:w-full md:max-w-fit md:mr-0 md:ml-auto shadow">
            <h2 className="section-heading px-3">Speak & Match</h2>
            <SpeakMatch />
          </div>
        </main>
        <Footer setShowGuide={setShowGuide}/>
        {showGuide && <GuideOverlay onClose={() => setShowGuide(false)} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
