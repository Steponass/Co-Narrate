export default function Footer({ setShowGuide }) {
  return (
    <footer className="w-full py-2 pl-4 md:pl-7 pr-4 bg-neutral-100  dark:bg-gray-900 shadow | flex items-center justify-between">
      <div>
        {" "}
        <button
          className="min-w-32 px-4 py-1.5 bg-blue-800 hover:bg-blue-700 text-white rounded shadow"
          onClick={() => setShowGuide(true)}
        >
          Show Guide
        </button>
      </div>
      <p className="">
        Designed & built by{" "}
          <a className="underline hover:decoration-0" href="https://github.com/Steponass">S.D.</a>
      </p>
    </footer>
  );
}
