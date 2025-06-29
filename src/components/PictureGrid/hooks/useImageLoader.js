import { useState } from "react";
import { unsplashApi } from "../utils/unsplash";

const UNSPLASH_TOPICS = {
  PEOPLE: "towJZFskpGg",
  FILM: "hmenvQhUmxM",
  BUSINESS_WORK: "aeu6rL-j6ew",
  SPORTS: "Bn-DjrcBrwo",
};

export function useImageLoader() {
  const [storyImages, setStoryImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const loadImages = async () => {
    setIsLoadingImages(true);

    try {
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
        return true; // Success
      } else {
        console.error("Failed to fetch images");
        return false;
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      return false;
    } finally {
      setIsLoadingImages(false);
    }
  };

  return { storyImages, isLoadingImages, loadImages };
}
