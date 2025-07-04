import ImageCell from "./ImageCell";

export default function ImageGrid({ storyImages, usedImages, onImageToggle }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 pb-4">
      {Array(9)
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
