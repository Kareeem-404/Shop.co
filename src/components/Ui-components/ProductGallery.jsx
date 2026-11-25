import { useState } from "react";

export default function ProductGallery({ images = [], title }) {
  const [selected, setSelected] = useState(0);
  // -------------------------- Styles --------------------------
  const galleryStyle = "grid gap-3 sm:grid-cols-[88px_minmax(0,1fr)]";
  const thumbnailsStyle =
    "order-2 grid grid-cols-4 gap-2 sm:order-1 sm:grid-cols-1 sm:content-start sm:gap-3";
  const thumbStyle =
    "aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-soft dark:bg-zinc-800 sm:rounded-2xl";
  const selectedThumbStyle = "border-black dark:border-white";
  const imageStyle = "size-full object-cover";
  const mainStyle =
    "order-1 aspect-[.94] overflow-hidden rounded-2xl bg-soft dark:bg-zinc-800 sm:order-2";
  // -------------------------- Styles --------------------------
  return (
    <div className={galleryStyle}>
      <div className={thumbnailsStyle}>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            className={`${thumbStyle} ${selected === index ? selectedThumbStyle : ""}`}
            onClick={() => setSelected(index)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={selected === index}
          >
            <img src={image} className={imageStyle} alt="" />
          </button>
        ))}
      </div>
      <div className={mainStyle}>
        {images[selected] && (
          <img src={images[selected]} className={imageStyle} alt={title} />
        )}
      </div>
    </div>
  );
}
