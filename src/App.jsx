import './App.css'
import PictureGrid from './components/PictureGrid'
import SpeakMatchComponent from './components/SpeakMatchComponent'


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 sm:py-6 bg-white shadow">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 text-center">
          Co-Narrate
        </h1>
      </header>
      <main className="flex flex-col xl:flex-row flex-1 w-full max-w-8xl mx-auto p-4 gap-4">
        <div className="w-full xl:w-3/4">
          <PictureGrid />
        </div>
        <div className="w-full xl:w-1/4">
          <SpeakMatchComponent />
        </div>
      </main>

    </div>
  )
}

export default App
