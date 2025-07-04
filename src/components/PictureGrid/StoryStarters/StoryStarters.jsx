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
      <div id="story_starters" className="w-full sm:w-auto min-w-0 ">
        <div className="flex flex-row">
          <button
            onClick={generateStoryStarter}
            className="px-3 py-2 text-wrap max-w-54
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
      </div>
    </>
  );
}

export default memo(StoryStarters);
