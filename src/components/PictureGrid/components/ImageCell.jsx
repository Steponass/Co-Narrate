import EmptyCell from "./EmptyCell";
import UsedOverlay from "./UsedOverlay";

export default function ImageCell({ image, isUsed, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`sm:min-h-54 sm:max-h-56 flex items-center justify-center relative rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 cursor-pointer sm:text-sm transition ${
        image ? "hover:brightness-70" : "hover:brightness-98"
      }`}
    >
      {image ? (
        <>
          <img
            src={image.urls.small}
            alt={image.description || "Unsplash photo"}
            className="w-full h-full object-cover rounded"
          />
          {isUsed && <UsedOverlay />}
        </>
      ) : (
        <EmptyCell />
      )}
    </div>
  );
}
