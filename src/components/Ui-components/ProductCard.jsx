import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "../../store/cartStore.js";
import {toast} from "react-hot-toast";

export function discountPrice(product) {
  return product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;
}

export default function ProductCard({ product }) {
  const isFavorite = useCartStore((state) =>
    state.favorites.some((item) => item.id === product.id),
  );
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);

  // -------------------------- Styles --------------------------
  const cardStyle = "flex min-w-0 flex-col";
  const imageWrapStyle =
    "group relative aspect-[.94] overflow-hidden rounded-2xl bg-soft dark:bg-zinc-800";
  const imageLinkStyle = "block size-full";
  const imageStyle =
    "size-full object-cover transition duration-500 group-hover:scale-105";
  const favoriteButtonStyle =
    "absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/95 cursor-pointer text-black shadow-sm transition hover:scale-105 dark:bg-zinc-900/95 dark:text-white";
  const titleStyle =
    "mt-3 truncate text-sm font-bold text-black dark:text-white sm:text-base";
  const ratingStyle = "mt-1 flex items-center gap-2 text-xs";
  const starsStyle = "flex gap-0.5 text-amber-400";
  const ratingMutedStyle = "text-black/40 dark:text-white/40";
  const priceStyle =
    "mt-1.5 flex flex-wrap items-center gap-2 text-sm sm:text-base";
  const oldPriceStyle = "text-black/35 line-through dark:text-white/35";
  const discountStyle =
    "rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-500 dark:bg-red-950 dark:text-red-300";
  const addButtonStyle =
    "mt-3 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full bg-white ring-2 ring-black dark:ring-zinc-600 px-3 py-2.5 text-xs font-semibold text-black transition dark:bg-black dark:text-white sm:text-sm";
  // -------------------------- Styles --------------------------
  const oldPrice = discountPrice(product);

  return (
    <article className={cardStyle}>
      <div className={imageWrapStyle}>
        <Link to={`/products/${product.id}`} className={imageLinkStyle}>
          <img
            className={imageStyle}
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
          />
        </Link>
        <button
          type="button"
          className={favoriteButtonStyle}
          aria-label={
            isFavorite
              ? `Remove ${product.title} from favorites`
              : `Add ${product.title} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product)}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <Link to={`/products/${product.id}`} className={titleStyle}>
        {product.title}
      </Link>
      <div className={ratingStyle}>
        <span
          className={starsStyle}
          aria-label={`Rated ${product.rating} out of 5 stars`}
        >
          {Array.from(
            { length: Math.round(product.rating || 0) },
            (_, index) => (
              <Star key={index} size={13} fill="currentColor" />
            ),
          )}
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
      <button
        type="button"
        className={addButtonStyle}
        title="Adds the default size Large in Olive"
        onClick={() => {
          addItem(product, "Large", "Olive", 1);
          toast.success(`${product.title} added to your cart`);
        }}
      >
        <ShoppingCart size={15} /> Add to Cart
      </button>
    </article>
  );
}
