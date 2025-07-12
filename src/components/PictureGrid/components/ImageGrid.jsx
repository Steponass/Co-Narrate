import { useState, useEffect } from "react";

import ImageCell from "./ImageCell";

export default function ImageGrid({ storyImages, usedImages, onImageToggle }) {
  const [itemsToShow, setItemsToShow] = useState(9);

useEffect(() => {
    function updateItems() {
      if (window.innerWidth <= 768) {
        setItemsToShow(8);
      } else {
        setItemsToShow(9);
      }
    }

    updateItems(); // Run once on mount
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);



  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pb-4">
      {Array(itemsToShow)
        .fill(0)
        .map((_, index) => (
          <ImageCell
            key={index}
            image={storyImages[index]}
            isUsed={usedImages.has(index)}
            onToggle={() => onImageToggle(index)}
          />
        ))}
    </div>
  );
}
