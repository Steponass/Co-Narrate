import { useState, useEffect } from "react";

export default function MicrophoneSelector({ onDeviceChange }) {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        // Request microphone permission to get device list
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Get all audio input devices
        const audioDevices = await navigator.mediaDevices.enumerateDevices();
        const inputDevices = audioDevices.filter(
          (device) => device.kind === "audioinput"
        );

        setDevices(inputDevices);
        setSelectedDevice(inputDevices[0]?.deviceId || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Error accessing microphone devices:", error);
        setIsLoading(false);
      }
    };

    getAudioDevices();

    // Listen for device changes
    const handleDeviceChange = async () => {
      const audioDevices = await navigator.mediaDevices.enumerateDevices();
      const inputDevices = audioDevices.filter(
        (device) => device.kind === "audioinput"
      );
      setDevices(inputDevices);
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, []);

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
    onDeviceChange(deviceId);
  };

  if (isLoading) {
    return (
      <select
        disabled
        className="p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option>Loading...</option>
      </select>
    );
  }

  if (devices.length === 0) {
    return (
      <select
        disabled
        className="p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option>No mics</option>
      </select>
    );
  }

  return (
    <div id="microphone_selector">
    <select
      value={selectedDevice}
      onChange={(e) => handleDeviceSelect(e.target.value)}
      className="max-w-52 p-3 sm:p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      title="Select microphone"
    >
      {devices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label || `Mic ${device.deviceId.slice(0, 6)}...`}
        </option>
      ))}
    </select>
    </div>
  );
}
