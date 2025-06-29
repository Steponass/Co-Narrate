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
      <div className="flex flex-wrap items-center gap-2">
        <LanguageSelector value={language} onChange={onLanguageChange} />

        <MicrophoneSelector onDeviceChange={onDeviceChange} />



        <ResetButton onClick={onReset} />
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2">

            <ListeningButton listening={listening} onClick={onToggleListening} />
            <ListeningIndicator listening={listening} />
    </div>

    </div>
  );
}
