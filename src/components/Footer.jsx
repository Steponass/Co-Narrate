export default function Footer({ setShowGuide }) {
  return (
    <footer className="min-h-12 p-4 bg-white dark:bg-gray-900 shadow | flex items-center justify-between">
      <div className="flex gap-4 items-center">
      <p>Need help?</p>
            <button
        className="px-2 py-1 bg-orange-400 text-white rounded shadow"
        onClick={() => setShowGuide(true)}
      >
        Show Guide
      </button>
      </div>
      <p>Designed & built by <strong><a href="https://www.linkedin.com/in/steponasd/">S.D.</a></strong></p>

    </footer>
  )
}