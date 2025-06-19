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
        PEOPLE: 'towJZFskpGg',
        FILM: 'hmenvQhUmxM',
        BUSINESS_WORK: 'aeu6rL-j6ew',
        SPORTS: 'Bn-DjrcBrwo',
    };

    useEffect(() => {
        if (cooldownActive && cooldownTime > 0) {
            timerRef.current = setInterval(() => {
                setCooldownTime(prev => {
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
                orientation: 'landscape',
                count: 9,
                topicIds:
                    [
                        UNSPLASH_TOPICS.PEOPLE,
                        UNSPLASH_TOPICS.FILM,
                        UNSPLASH_TOPICS.BUSINESS_WORK,
                        UNSPLASH_TOPICS.SPORTS,
                    ]
            });

            if (result.response) {
                setStoryImages(result.response);
                setCooldownActive(true); // Start cooldown after successful load
            } else {
                console.error('Failed to fetch images');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoadingImages(false);
        }
    };

    return (
        <section>
            <div className="h-full grid grid-cols-3 gap-1 sm:gap-2 auto-rows-max">
                    {Array(9).fill(0).map((_, index) => (
                        <div
                            key={index}
                            onClick={() => storyImages[index] && setUsedImages(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(index)) {
                                    newSet.delete(index);
                                } else {
                                    newSet.add(index);
                                }
                                return newSet;
                            })}
                            className={`bg-gray-200 dark:bg-gray-700 rounded 
                            text-gray-500 dark:text-gray-400 
                            max-h-56
                            text-xs sm:text-sm flex items-center justify-center 
                            aspect-13/9 overflow-hidden relative cursor-pointer 
                            ${storyImages[index] ? 'hover:brightness-50' : ''}`}
                        >
                            {storyImages[index] ? (
                                <>
                                    <img
                                        src={storyImages[index].urls.small}
                                        alt={storyImages[index].description || 'Unsplash photo'}
                                        className="object-cover w-full h-full max-h-60"
                                    />
                                    {usedImages.has(index) && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <svg
                                                className="w-12 h-12 text-white"
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
                                <h3 className="animate-pulse-slow p-2 dark:text-gray-400">
                                    Click "Load Images" ⬇️
                                </h3>
                            )}
                        </div>
                    ))}

                <button
                    onClick={handleLoadImages}
                    disabled={isLoadingImages || cooldownActive}
                    className="mt-2 px-3 py-2 sm:px-4 sm:py-2 
                    hover:brightness-130 bg-emerald-700 dark:bg-emerald-600 
                    text-white text-sm sm:text-base rounded 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoadingImages ? 'Loading...' :
                        cooldownActive ? `Wait ${cooldownTime}s` :
                            'Load Images'}
                </button>
                <StoryStarters />
            </div>
        </section>
    );
};