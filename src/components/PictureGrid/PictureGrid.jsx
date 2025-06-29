import React, { useState } from "react";
import { useCooldownTimer } from "./hooks/useCooldownTimer";
import { useImageLoader } from "./hooks/useImageLoader";
import ImageGrid from "./components/ImageGrid";
import LoadImagesButton from "./components/LoadImagesButton";
import StoryStarters from "./StoryStarters/StoryStarters";

export default function PictureGrid() {
  const [usedImages, setUsedImages] = useState(new Set());
  const { cooldownActive, cooldownTime, startCooldown } = useCooldownTimer();
  const { storyImages, isLoadingImages, loadImages } = useImageLoader();

  const handleLoadImages = async () => {
    const success = await loadImages();
    if (success) {
      setUsedImages(new Set());
      startCooldown();
    }
  };

  const handleImageToggle = (index) => {
    setUsedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="w-full flex flex-col bg-neutral-100 dark:bg-gray-800 rounded">
      <ImageGrid
        storyImages={storyImages}
        usedImages={usedImages}
        onImageToggle={handleImageToggle}
      />

      <div className="flex flex-col sm:flex-row gap-2">
        <LoadImagesButton
          isLoading={isLoadingImages}
          cooldownActive={cooldownActive}
          cooldownTime={cooldownTime}
          onLoad={handleLoadImages}
        />
        <StoryStarters />
      </div>
    </section>
  );
}
