import { useState, useEffect, Suspense } from "react";
import { unsplashApi } from "../utils/unsplash";
import StoryStarters from "./StoryStarters";

export default function PictureGrid() {
    const [storyImages, setStoryImages] = useState([]);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [usedImages, setUsedImages] = useState(new Set());
    const [cooldownActive, setCooldownActive] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(15);


    const UNSPLASH_TOPICS = {
        PEOPLE: 'towJZFskpGg',
        FILM: 'hmenvQhUmxM',
        BUSINESS_WORK: 'aeu6rL-j6ew',
        SPORTS: 'Bn-DjrcBrwo',
    };

    useEffect(() => {
        let timer;
        if (cooldownActive && cooldownTime > 0) {
            timer = setInterval(() => {
                setCooldownTime(prev => prev - 1);
            }, 1000);
        } else if (cooldownTime === 0) {
            setCooldownActive(false);
            setCooldownTime(15);
        }
        return () => clearInterval(timer);
    }, [cooldownActive, cooldownTime]);

    const handleLoadImages = async () => {
        setIsLoadingImages(true);
        setUsedImages(new Set());

        try {
            const result = await unsplashApi.photos.getRandom({
                orientation: 'landscape',
                count: 8,
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
        <section className="h-full">
            <div className="w-full p-2 sm:p-3 grid grid-cols-2 min-[1000px]:grid-cols-4 gap-2 sm:gap-3">
                <Suspense fallback={
                    <div className="col-span-2 min-[1000px]:col-span-4 flex items-center justify-center h-32 
                    text-gray-600 dark:text-gray-400">
                        Loading images...
                    </div>
                }>
                    {Array(8).fill(0).map((_, index) => (
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
                            text-xs sm:text-sm flex items-center justify-center 
                            aspect-square overflow-hidden relative cursor-pointer 
                            ${storyImages[index] ? 'hover:brightness-75' : ''}`}
                        >
                            {storyImages[index] ? (
                                <>
                                    <img
                                        src={storyImages[index].urls.small}
                                        alt={storyImages[index].description || 'Unsplash photo'}
                                        className="object-cover w-full h-full"
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
                                <h3 className="animate-pulse-slow dark:text-gray-400">
                                    Click "Load Images" below
                                </h3>
                            )}
                        </div>
                    ))}
                </Suspense>

                <button
                    onClick={handleLoadImages}
                    disabled={isLoadingImages || cooldownActive}
                    className="mt-2 sm:mt-4 px-3 py-2 sm:px-4 sm:py-2 
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