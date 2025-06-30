import "./App.css";
import PictureGrid from "./components/PictureGrid/PictureGrid";
import SpeakMatch from "./components/SpeakMatch/SpeakMatch";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import VisitTracker from "./components/VisitTracker";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-gray-900 text-black dark:text-white">
      <Header />
        <main className="flex-1 px-4 py-3 flex flex-col md:flex-row gap-4 bg-neutral-50 dark:bg-gray-900 min-h-0">
              <VisitTracker />
          <div className="basis-0 grow min-w-0 pb-4 sm:pb-0">
            <h2 className="section-heading">Story Images</h2>
            <PictureGrid />
          </div>
          <div className="basis-sm grow-1 | sm:max-w-fit md:mr-0 md:ml-auto ">
            <h2 className="section-heading">Speak & Match</h2>
            <SpeakMatch />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
