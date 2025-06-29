
export default function LoadImagesButton({
  isLoading,
  cooldownActive,
  cooldownTime,
  onLoad,
}) {
  return (
    <button
      onClick={onLoad}
      disabled={isLoading || cooldownActive}
      className="px-3 py-2 rounded bg-emerald-700 dark:bg-emerald-600 text-sm text-white transition hover:brightness-130 disabled:opacity-50 disabled:cursor-not-allowed sm:px-4 sm:text-base"
    >
      {isLoading
        ? "Loading..."
        : cooldownActive
        ? `Wait ${cooldownTime}s`
        : "Load Images"}
    </button>
  );
}
