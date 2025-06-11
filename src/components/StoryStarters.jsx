import { useState } from "react";
import { storyStarters } from "../data/StoriesArray";

export default function StoryStarters() {
    
    const [currentStarter, setCurrentStarter] = useState("");
    
    const generateStoryStarter = () => {
        const randomIndex = Math.floor(Math.random() * storyStarters.length);
        setCurrentStarter(storyStarters[randomIndex]);
    };
    
    return (
        <>        
            <button
                onClick={generateStoryStarter}
                className="min-h-16 mt-2 sm:mt-4 px-3 py-2 sm:px-4 sm:py-2 hover:brightness-130 bg-blue-600 text-white text-sm sm:text-base rounded"
                >Random story starter
            </button>
                <div className="col-span-2 flex-1 mt-2 sm:mt-4 p-2 bg-gray-100 rounded text-sm sm:text-base">
                    {currentStarter || "Click for a story prompt"}
                </div>
        </>
    )
}