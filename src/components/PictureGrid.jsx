import { useState, useEffect, useRef } from "react";
import { unsplashApi } from "../utils/unsplash";
import StoryStarters from "./StoryStarters";


export default function PictureGrid() {
  const [storyImages, setStoryImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [usedImages, setUsedImages] = useState(new Set());
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(15);
  const timerRef = useRef(null);

  const UNSPLASH_TOPICS = {
    PEOPLE: "towJZFskpGg",
    FILM: "hmenvQhUmxM",
    BUSINESS_WORK: "aeu6rL-j6ew",
    SPORTS: "Bn-DjrcBrwo",
  };

  useEffect(() => {
    if (cooldownActive && cooldownTime > 0) {
      timerRef.current = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setCooldownActive(false);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [cooldownTime, cooldownActive]);

  const handleLoadImages = async () => {
    setIsLoadingImages(true);
    setUsedImages(new Set());

    try {
      // Unsplash API call
      const result = await unsplashApi.photos.getRandom({
        orientation: "landscape",
        count: 9,
        topicIds: [
          UNSPLASH_TOPICS.PEOPLE,
          UNSPLASH_TOPICS.FILM,
          UNSPLASH_TOPICS.BUSINESS_WORK,
          UNSPLASH_TOPICS.SPORTS,
        ],
      });

      if (result.response) {
        setStoryImages(result.response);
        setCooldownActive(true); // Start cooldown after successful load
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  return (
    <section className="h-full flex flex-col bg-neutral-100  dark:bg-gray-800 rounded">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-0.5 pb-4">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              onClick={() =>
                storyImages[index] &&
                setUsedImages((prev) => {
                  const newSet = new Set(prev);
                  if (newSet.has(index)) {
                    newSet.delete(index);
                  } else {
                    newSet.add(index);
                  }
                  return newSet;
                })
              }
              className={`aspect-video flex items-center justify-center overflow-hidden relative rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 cursor-pointer sm:text-sm ${
                storyImages[index] ? "hover:brightness-50" : ""
              }`}
            >
              {storyImages[index] ? (
                <>
                  <img
                    src={storyImages[index].urls.small}
                    alt={storyImages[index].description || "Unsplash photo"}
                    className="w-full h-full object-cover"
                  />
                  {usedImages.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <svg
                        className="w-4 h-4 text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </>
              ) : (
                <h3 className="p-1 animate-pulse-slow text-center dark:text-gray-400 text-[10px] sm:text-xs">
                  Click "Load Images" ⬇️
                </h3>
              )}
            </div>
          ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleLoadImages}
          disabled={isLoadingImages || cooldownActive}
          className="px-3 py-2 rounded bg-emerald-700 dark:bg-emerald-600 text-sm text-white transition hover:brightness-130 disabled:opacity-50 disabled:cursor-not-allowed sm:px-4 sm:text-base"
        >
          {isLoadingImages
            ? "Loading..."
            : cooldownActive
            ? `Wait ${cooldownTime}s`
            : "Load Images"}
        </button>
        <div>
          <StoryStarters />
        </div>
      </div>
    </section>
  );
}