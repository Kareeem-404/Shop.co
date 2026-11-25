import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export function discountPrice(product) {
  return product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;
}

export default function ProductCard({ product }) {
  // -------------------------- Styles --------------------------
  const cardStyle = "group flex min-w-0 flex-col";
  const imageWrapStyle =
    "relative aspect-[.94] overflow-hidden rounded-2xl bg-soft dark:bg-zinc-800";
  const imageStyle =
    "size-full object-cover transition duration-500 group-hover:scale-105";
  const titleStyle = "mt-3 truncate text-sm font-bold text-black dark:text-white sm:text-base";
  const ratingStyle = "mt-1 flex items-center gap-2 text-xs";
  const starsStyle = "flex gap-0.5 text-amber-400";
  const ratingMutedStyle = "text-black/40 dark:text-white/40";
  const priceStyle =
    "mt-1.5 flex flex-wrap items-center gap-2 text-sm sm:text-base";
  const oldPriceStyle = "text-black/35 line-through dark:text-white/35";
  const discountStyle =
    "rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-500 dark:bg-red-950 dark:text-red-300";
  // -------------------------- Styles --------------------------
  const oldPrice = discountPrice(product);

  return (
    <Link to={`/products/${product.id}`} className={cardStyle}>
      <div className={imageWrapStyle}>
        <img
          className={imageStyle}
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <h3 className={titleStyle}>{product.title}</h3>
      <div className={ratingStyle}>
        <span className={starsStyle} aria-label="Rated 5 stars">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={13} fill="currentColor" />
          ))}
        </span>
        <span>
          {Number(product.rating || 0).toFixed(1)}{" "}
          <span className={ratingMutedStyle}>/5</span>
        </span>
      </div>
      <div className={priceStyle}>
        <strong>${product.price}</strong>
        {oldPrice && (
          <>
            <del className={oldPriceStyle}>${oldPrice}</del>
            <span className={discountStyle}>
              -{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
