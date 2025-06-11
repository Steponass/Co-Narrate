import './App.css';
import PictureGrid from './components/PictureGrid';
import SpeakMatchComponent from './components/SpeakMatchComponent';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="w-full py-4 sm:py-6 bg-white dark:bg-gray-900 shadow flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 text-center w-full">
          Co-Narrate
        </h1>
        <div className="flex justify-center items-center h-full">
        </div>
      </header>
      {/* Change breakpoint to min-width 800px using custom breakpoint */}
      <main className="flex flex-col min-[800px]:flex-row flex-1 w-full max-w-7xl mx-auto p-4 gap-4 | dark:bg-gray-900">
        <div className="w-full min-[800px]:w-3/4">
          <PictureGrid />
        </div>
        <div className="w-full min-[800px]:w-1/4">
          <SpeakMatchComponent />
        </div>
      </main>
    </div>
  )
}

export default App
