
export default function LoadImagesButton({
  isLoading,
  cooldownActive,
  cooldownTime,
  onLoad,
}) {
  return (
    <button
      id="load_images_btn"
      onClick={onLoad}
      disabled={isLoading || cooldownActive}
      className="min-w-32 px-3 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-sm text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed sm:px-4 sm:text-base"
    >
      {isLoading
        ? "Loading..."
        : cooldownActive
        ? `Reload? Wait ${cooldownTime}s`
        : "Load Images"}
    </button>
  );
}
