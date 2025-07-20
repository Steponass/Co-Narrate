import { useEffect, useState } from "react";
import FirstVisitDialog from "./Help/FirstVisitDialog";

export default function VisitTracker({ setShowGuide }) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10);
    if (visitCount < 3) {
      setShowDialog(true);
      localStorage.setItem("visitCount", (visitCount + 1).toString());
    }
  }, []);

  if (!showDialog) return null;

  return (
    <FirstVisitDialog
      setShowGuide={setShowGuide}
      onClose={() => setShowDialog(false)}
    />
  );
}
