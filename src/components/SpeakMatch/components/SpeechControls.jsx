import LanguageSelector from "./LanguageSelector";
import ListeningButton from "./ListeningButton";
import ListeningIndicator from "./ListeningIndicator";
import MicrophoneSelector from "./MicrophoneSelector";
import ResetButton from "./ResetButton";

export default function SpeechControls({
  language,
  onLanguageChange,
  listening,
  onToggleListening,
  onReset,
  onDeviceChange,
}) {
  return (
    <div >
      <div className="flex gap-2  justify-between flex-row sm:items-center sm:gap-4">
        <LanguageSelector value={language} onChange={onLanguageChange} />
        <MicrophoneSelector onDeviceChange={onDeviceChange} />
      </div>

      <div className="flex gap-4 pt-4 flex-row items-center ">
        <ListeningButton listening={listening} onClick={onToggleListening} />
        <ListeningIndicator listening={listening} />
        <ResetButton onClick={onReset} />
      </div>

    </div>
  );
}
