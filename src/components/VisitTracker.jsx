import { useEffect, useState } from "react";
import FirstVisitDialog from "./Help/FirstVisitDialog";

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

  return <FirstVisitDialog onClose={() => setShowDialog(false)} />;
}