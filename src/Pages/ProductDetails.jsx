import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import Container from "../components/Ui-components/Container.jsx";
import ProductGallery from "../components/Ui-components/ProductGallery.jsx";
import ProductGrid from "../components/Ui-components/ProductGrid.jsx";
import useFetch from "../Hooks/useFetch.js";
import { useCartStore } from "../store/cartStore.js";
import {toast} from "react-hot-toast";


const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "tops",
  "womens-dresses",
  "mens-shoes",
  "womens-shoes",
];
function formatReviewDate(date) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(parsedDate);
}

export default function ProductDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState("Reviews");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("Olive");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { data: product, loading, error } = useFetch(`/products/${id}`);
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = useCartStore((state) =>
    state.favorites.some((item) => String(item.id) === id),
  );
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const {
    data: collection,
    loading: collectionLoading,
    error: collectionError,
  } = useFetch("/products?limit=0");
  const productReviews = Array.isArray(product?.reviews) ? product.reviews : [];
  const related = (collection?.products || [])
    .filter(
      (item) =>
        item.id !== product?.id && CLOTHING_CATEGORIES.includes(item.category),
    )
    .slice(0, 4);
  const originalPrice = product?.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  // -------------------------- Styles --------------------------
  const titleStyle =
    "font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl";
  const productTitleRowStyle = "flex items-start gap-3";
  const favoriteButtonStyle =
    "mt-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-black/10 text-black transition hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10";
  const favoriteActiveStyle = "text-red-500 dark:text-red-400";
  const loadingWrapStyle = "grid min-h-[45vh] place-items-center";
  const loadingTextStyle = "animate-pulse text-black/50 dark:text-white/50";
  const errorWrapStyle =
    "grid min-h-[45vh] place-items-center px-5 text-center";
  const errorTitleStyle = "text-2xl font-bold";
  const errorTextStyle = "my-3 text-sm text-black/55 dark:text-white/55";
  const backButtonStyle =
    "inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black";
  const pageStyle = "py-6 sm:py-8";
  const breadcrumbStyle =
    "mb-6 flex items-center gap-2 overflow-hidden text-xs text-black/45 dark:text-white/45";
  const breadcrumbCurrentStyle =
    "truncate capitalize text-black dark:text-white";
  const detailLayoutStyle = "grid gap-6 sm:grid-cols-2 sm:gap-9";
  const brandStyle =
    "text-[10px] font-bold uppercase tracking-[.2em] text-black/45 dark:text-white/45";
  const ratingStyle = "mt-3 flex items-center gap-2 text-sm";
  const ratingValueStyle = "text-black/40 dark:text-white/40";
  const starsStyle = "flex tracking-wider text-amber-400";
  const detailPriceStyle = "mt-3 flex items-center gap-3 text-2xl font-bold";
  const oldPriceStyle = "text-lg text-black/35 dark:text-white/35";
  const discountStyle = "rounded-full bg-red-50 px-3 py-1 text-xs text-red-500";
  const descriptionStyle =
    "my-4 border-b border-black/10 pb-5 text-sm leading-relaxed text-black/55 dark:border-white/15 dark:text-white/55";
  const availabilityStyle = "mb-4 text-xs text-black/55 dark:text-white/55";
  const availabilityDotStyle = `mr-2 inline-block size-2 rounded-full ${product?.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`;
  const optionLabelStyle =
    "mb-3 block text-sm text-black/50 dark:text-white/50";
  const optionGroupStyle = "border-t border-black/10 py-4 dark:border-white/15";
  const colorOptionsStyle = "flex gap-3";
  const colorButtonStyle =
    "grid cursor-pointer hover:ring-black size-9 place-items-center dark:hover:ring-white rounded-full ring-2 ring-offset-2 transition dark:ring-offset-zinc-950";
  const colorSelectionStyle = "ring-black dark:ring-white";
  const colorIdleStyle = "ring-transparent";
  const colorCheckStyle = "text-white";
  const colorOptions = [
    { name: "Olive", swatchStyle: "bg-[#55543e]" },
    { name: "Navy", swatchStyle: "bg-[#293345]" },
    { name: "Charcoal", swatchStyle: "bg-neutral-800" },
  ];
  const sizeOptionsStyle = "flex flex-wrap gap-2";
  const sizeBaseStyle = "rounded-full px-4 py-2.5 cursor-pointer text-xs";
  const sizeSelectedStyle = "bg-black text-white dark:bg-white dark:text-black";
  const sizeIdleStyle =
    "bg-soft text-black/55 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:text-white/55";
  const purchaseRowStyle = "mt-2 flex gap-3";
  const quantityStyle =
    "flex min-w-28 items-center justify-around rounded-full bg-soft px-2 dark:bg-zinc-800";
  const quantityButtonStyle =
    "p-2 cursor-pointer hover:bg-zinc-300 rounded-full disabled:cursor-not-allowed dark:hover:bg-zinc-900 disabled:opacity-35";
  const quantityLabelStyle = "text-sm";
  const addButtonStyle =
    "flex-1 rounded-full bg-black px-5 py-3 text-sm cursor-pointer font-semibold text-white dark:bg-white dark:text-black";
  const tabsStyle =
    "mt-12 grid grid-cols-3 border-b border-black/10 dark:border-white/15 sm:mt-16";
  const tabStyle = "border-b-2 px-1 py-4 text-xs sm:text-sm";
  const tabActiveStyle = "border-black font-semibold dark:border-white";
  const tabIdleStyle = "border-transparent text-black/50 dark:text-white/50";
  const reviewsSectionStyle = "py-6 sm:py-8";
  const reviewsHeadingStyle = "mb-5 flex flex-wrap items-center gap-2";
  const reviewsTitleStyle = "text-lg font-bold sm:text-xl";
  const mutedLabelStyle = "mt-1 text-xs text-black/45 dark:text-white/45";
  const sortButtonStyle =
    "flex items-center gap-2 rounded-full bg-soft px-3 py-2 text-xs text-black dark:bg-zinc-800 dark:text-white";
  const reviewActionStyle =
    "rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black";
  const reviewsGridStyle = "grid gap-3 sm:grid-cols-2";
  const reviewCardStyle =
    "rounded-2xl border border-black/10 p-4 dark:border-white/15 sm:p-5";
  const reviewNameStyle = "mt-2 text-sm font-bold";
  const reviewTextStyle =
    "my-3 text-xs leading-relaxed text-black/55 dark:text-white/55";
  const reviewDateStyle = "text-[10px] text-black/45 dark:text-white/45";
  const reviewsEmptyStyle =
    "rounded-2xl border border-dashed border-black/15 px-5 py-10 text-center text-sm text-black/55 dark:border-white/20 dark:text-white/55";
  const addButtonSuccessStyle = "bg-emerald-700 text-white dark:bg-emerald-600";
  const relatedSectionStyle = "py-8";
  const relatedHeadingStyle = "mb-5 text-center";
  const relatedKickerStyle =
    "text-[10px] font-bold tracking-[.2em] text-black/45 dark:text-white/45";
  const relatedTitleStyle = `${titleStyle} mt-2 text-2xl sm:text-3xl`;
  const titleMarginStyle = "mt-2";
  const reviewOverviewStyle = "mr-auto";
  const tabWrapperStyle =
    "my-6 rounded-2xl border border-black/10 p-5 text-sm leading-relaxed text-black/60 dark:border-white/15 dark:text-white/60";
  const reviewSummaryStyle =
    "text-sm font-normal text-black/45 dark:text-white/45";
  const sizeOptionsLabels = ["Small", "Medium", "Large", "X-Large"];
  // -------------------------- Styles --------------------------

  if (loading)
    return (
      <div className={loadingWrapStyle}>
        <p className={loadingTextStyle}>Loading product details…</p>
      </div>
    );
  if (error)
    return (
      <div className={errorWrapStyle}>
        <div>
          <h1 className={errorTitleStyle}>
            {error.response?.status === 404
              ? "Product not found"
              : "Couldn’t load this product"}
          </h1>
          <p className={errorTextStyle}>
            {error.response?.status === 404
              ? "This product is not available in our collection."
              : "Please check your connection and try again."}
          </p>
          <Link className={backButtonStyle} to="/">
            Back to home
          </Link>
        </div>
      </div>
    );
  if (!product) return null;
  if (!CLOTHING_CATEGORIES.includes(product.category))
    return (
      <div className={errorWrapStyle}>
        <div>
          <h1 className={errorTitleStyle}>Product not found</h1>
          <p className={errorTextStyle}>
            This item is not part of our clothing collection.
          </p>
          <Link className={backButtonStyle} to="/">
            Back to home
          </Link>
        </div>
      </div>
    );

  return (
    <Container className={pageStyle}>
      <div className={breadcrumbStyle}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/">Shop</Link>
        <ChevronRight size={14} />
        <span className={breadcrumbCurrentStyle}>
          {product.category.replaceAll("-", " ")}
        </span>
      </div>
      <section className={detailLayoutStyle}>
        <ProductGallery images={product.images} title={product.title} />
        <div>
          <p className={brandStyle}>
            {product.brand || product.category.replaceAll("-", " ")}
          </p>
          <div className={productTitleRowStyle}>
            <h1 className={`${titleStyle} ${titleMarginStyle} min-w-0 flex-1`}>
              {product.title}
            </h1>
            <button
              type="button"
              className={`${favoriteButtonStyle} ${isFavorite ? favoriteActiveStyle : ""}`}
              aria-label={
                isFavorite
                  ? `Remove ${product.title} from favorites`
                  : `Add ${product.title} to favorites`
              }
              aria-pressed={isFavorite}
              onClick={() => toggleFavorite(product)}
            >
              <Heart size={21} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          <div className={ratingStyle}>
            <span className={starsStyle} aria-label="Rated 5 stars">
              {Array.from({ length: product.rating }, (_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </span>
            <span>
              {Number(product.rating).toFixed(1)}{" "}
              <span className={ratingValueStyle}>/ 5</span>
            </span>
          </div>
          <div className={detailPriceStyle}>
            <strong>${product.price}</strong>
            {originalPrice && (
              <>
                <del className={oldPriceStyle}>${originalPrice}</del>
                <span className={discountStyle}>
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>
          <p className={descriptionStyle}>{product.description}</p>
          <p className={availabilityStyle}>
            <span className={availabilityDotStyle} />
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Currently unavailable"}
          </p>
          <div className={optionGroupStyle}>
            <span className={optionLabelStyle}>Select Color</span>
            <div className={colorOptionsStyle}>
              {colorOptions.map(({ name, swatchStyle }) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`Choose ${name} color`}
                  aria-pressed={selectedColor === name}
                  className={`${colorButtonStyle} ${swatchStyle} ${selectedColor === name ? colorSelectionStyle : colorIdleStyle}`}
                  onClick={() => {
                    setSelectedColor(name);
                    setAddedToCart(false);
                  }}
                >
                  {selectedColor === name && (
                    <Check size={14} className={colorCheckStyle} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={optionGroupStyle}>
            <span className={optionLabelStyle}>Choose Size</span>
            <div className={sizeOptionsStyle}>
              {sizeOptionsLabels.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  className={`${sizeBaseStyle} ${size === selectedSize ? sizeSelectedStyle : sizeIdleStyle}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setAddedToCart(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className={purchaseRowStyle}>
            <div className={quantityStyle}>
              <button
                aria-label="Decrease quantity"
                className={quantityButtonStyle}
                type="button"
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity((current) => Math.max(1, current - 1));
                  setAddedToCart(false);
                }}
              >
                <Minus size={15} />
              </button>
              <span className={quantityLabelStyle} aria-live="polite">
                {quantity}
              </span>
              <button
                aria-label="Increase quantity"
                className={quantityButtonStyle}
                type="button"
                disabled={product.stock > 0 && quantity >= product.stock}
                onClick={() => {
                  setQuantity((current) =>
                    Math.min(product.stock || current + 1, current + 1),
                  );
                  setAddedToCart(false);
                }}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className={`${addButtonStyle} ${addedToCart ? addButtonSuccessStyle : ""}`}
              type="button"
              disabled={product.stock <= 0}
              onClick={() => {
                addItem(product, selectedSize, selectedColor, quantity);
                setAddedToCart(true);
                toast.success(`${product.title} added to your cart`);
              }}
            >
              {product.stock <= 0
                ? "Out of Stock"
                : addedToCart
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>
      <div className={tabsStyle}>
        {["Product Details", "Reviews", "FAQs"].map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            aria-selected={tab === name}
            className={`${tabStyle} ${tab === name ? tabActiveStyle : tabIdleStyle}`}
          >
            {name}
            {name === "Reviews" ? ` (${productReviews.length})` : ""}
          </button>
        ))}
      </div>
      {tab === "Reviews" ? (
        <section className={reviewsSectionStyle}>
          <div className={reviewsHeadingStyle}>
            <div className={reviewOverviewStyle}>
              <h2 className={reviewsTitleStyle}>
                All Reviews{" "}
                <span className={reviewSummaryStyle}>
                  ({productReviews.length})
                </span>
              </h2>
              <p className={mutedLabelStyle}>
                Customer reviews for this product
              </p>
            </div>
            <button className={sortButtonStyle}>
              Latest <ChevronDown size={14} />
            </button>
            <button className={reviewActionStyle}>Write a Review</button>
          </div>
          {productReviews.length ? (
            <div className={reviewsGridStyle}>
              {productReviews.map((review, index) => (
                <article
                  className={reviewCardStyle}
                  key={`${review.reviewerEmail || review.reviewerName}-${review.date}-${index}`}
                >
                  <span
                    className={starsStyle}
                    aria-label={`Rated ${review.rating} out of 5 stars`}
                  >
                    {Array.from(
                      { length: Math.max(0, Math.round(review.rating || 0)) },
                      (_, starIndex) => (
                        <Star key={starIndex} size={15} fill="currentColor" />
                      ),
                    )}
                  </span>
                  <h3 className={reviewNameStyle}>
                    {review.reviewerName || "Customer"}
                  </h3>
                  <p className={reviewTextStyle}>“{review.comment}”</p>
                  <span className={reviewDateStyle}>
                    {formatReviewDate(review.date)}
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <p className={reviewsEmptyStyle}>
              No reviews have been added for this product yet.
            </p>
          )}
        </section>
      ) : (
        <div className={tabWrapperStyle}>
          {tab === "FAQs" ? (
            "Questions about this product? Review the product details above or browse our collection."
          ) : (
            <>
              {product.description}{" "}
              {product.brand && `Designed by ${product.brand}.`} Category:{" "}
              {product.category.replaceAll("-", " ")}.
            </>
          )}
        </div>
      )}
      <section className={relatedSectionStyle}>
        <div className={relatedHeadingStyle}>
          <p className={relatedKickerStyle}>MORE TO LOVE</p>
          <h2 className={relatedTitleStyle}>YOU MIGHT ALSO LIKE</h2>
        </div>
        <ProductGrid
          products={related}
          loading={collectionLoading}
          error={collectionError}
        />
      </section>
    </Container>
  );
}
