import EmptyCell from "./EmptyCell";
import UsedOverlay from "./UsedOverlay";

export default function ImageCell({ image, isUsed, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`aspect-video flex items-center justify-center relative rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 cursor-pointer sm:text-sm ${
        image ? "hover:brightness-50" : ""
      }`}
    >
      {image ? (
        <>
          <img
            src={image.urls.small}
            alt={image.description || "Unsplash photo"}
            className="w-full h-full object-cover"
          />
          {isUsed && <UsedOverlay />}
        </>
      ) : (
        <EmptyCell />
      )}
    </div>
  );
}
