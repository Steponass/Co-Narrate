import { useState, memo } from "react";
import { storyStarters } from "./data/StoriesArray";

function StoryStarters() {
  const [currentStarter, setCurrentStarter] = useState("");

  const generateStoryStarter = () => {
    const randomIndex = Math.floor(Math.random() * storyStarters.length);
    setCurrentStarter(storyStarters[randomIndex]);
  };

  return (
    <>
      <div id="story_starters" className="w-full  min-w-0 ">
        <div className="flex flex-row gap-2">
          <button
            onClick={generateStoryStarter}
            className="px-4 py-2 text-wrap min-w-28 max-w-54
                      hover:bg-blue-600 bg-blue-700 dark:bg-blue-700 
                      text-white transition-colors text-sm sm:text-base rounded"
          >
            Story starter
          </button>
          <div
            className="
                  p-2 bg-gray-100 dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 
                  rounded text-sm sm:text-base"
          >
            {currentStarter || ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(StoryStarters);
