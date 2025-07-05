import { useEffect, useState } from "react";
import FirstVisitDialog from "./Help/FirstVisitDialog";

export default function VisitTracker({setShowGuide}) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowDialog(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (!showDialog) return null;

  return <FirstVisitDialog setShowGuide={setShowGuide} onClose={() => setShowDialog(false)} />;
}