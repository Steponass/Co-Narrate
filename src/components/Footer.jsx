export default function Footer({ setShowGuide }) {
  return (
    <footer className="w-full py-2 pl-7 pr-4 bg-neutral-100  dark:bg-gray-900 shadow | flex items-center justify-between">
      <div>
        {" "}
        <button
          className="px-2 py-1 bg-orange-400 hover:brightness-110 text-white rounded shadow"
          onClick={() => setShowGuide(true)}
        >
          Show Guide
        </button>
      </div>
      <p className="">
        Designed & built by{" "}
          <a className="underline hover:decoration-0" href="https://www.linkedin.com/in/steponasd/">S.D.</a>
      </p>
    </footer>
  );
}
