import { useEffect, useState } from "react";

export default function VisitTracker() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowDialog(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (!showDialog) return null;

  return (
    <div >
      <div
        className=" z-10 max-h-fit max-w-max fixed inset-0 w-11/12 m-auto p-4 bg-neutral-50 dark:bg-gray-800 rounded-lg shadow-2xl backdrop:bg-black/50 sm:p-6">

        <div className="pb-4">
          <h1>Hey 👋</h1>
          <p>It might be your first time here.
            <br></br>
            Want to see a quick tutorial?</p>
        </div>

        <div className="flex gap-6 justify-between"
        >
          <button
            className="px-8 py-2 rounded bg-emerald-700 text-white font-semibold transition hover:brightness-120"
            onClick={() => setShowDialog(false)}>
            Yeah
          </button>

          <button
            className="px-8 py-2 rounded bg-amber-400 text-black font-semibold transition hover:brightness-120"
            onClick={() => setShowDialog(false)}>
            Nah</button>
        </div>
      </div>
    </div>
  )
}