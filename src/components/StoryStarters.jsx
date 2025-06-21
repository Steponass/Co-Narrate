import { useState, memo } from "react";
import { storyStarters } from "../data/StoriesArray";

function StoryStarters() {
  const [currentStarter, setCurrentStarter] = useState("");

  const generateStoryStarter = () => {
    const randomIndex = Math.floor(Math.random() * storyStarters.length);
    setCurrentStarter(storyStarters[randomIndex]);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={generateStoryStarter}
          className="flex-shrink-0 px-2 py-2
                    hover:brightness-130 bg-blue-600 dark:bg-blue-700 
                    text-white text-sm sm:text-base rounded"
        >
          Random story starter
        </button>
        <div
          className="
                p-2 bg-gray-100 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                rounded text-sm sm:text-base"
        >
          {currentStarter || "Need an idea? Click the blue button!"}
        </div>
      </div>
    </>
  );
}

export default memo(StoryStarters);
