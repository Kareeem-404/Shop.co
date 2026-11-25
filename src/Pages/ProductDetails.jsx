import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronDown, ChevronRight, Minus, Plus } from "lucide-react";
import Container from "../components/Ui-components/Container.jsx";
import ProductGallery from "../components/Ui-components/ProductGallery.jsx";
import ProductGrid from "../components/Ui-components/ProductGrid.jsx";
import useFetch from "../Hooks/useFetch.js";

const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "tops",
  "womens-dresses",
  "mens-shoes",
  "womens-shoes",
];
const reviews = [
  {
    name: "Samantha D.",
    date: "August 14, 2023",
    text: "I absolutely love this style! The quality feels great and it is a lovely addition to my wardrobe.",
  },
  {
    name: "Alex M.",
    date: "August 15, 2023",
    text: "The fit is excellent and the quality is top-notch. This has quickly become a favorite.",
  },
  {
    name: "Ethan R.",
    date: "August 16, 2023",
    text: "The colors look even better in person. A comfortable piece that is easy to style.",
  },
  {
    name: "Olivia P.",
    date: "August 17, 2023",
    text: "A great fit with lovely details. I am very happy with the material and finish.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState("Reviews");
  const { data: product, loading, error } = useFetch(`/products/${id}`);
  const {
    data: collection,
    loading: collectionLoading,
    error: collectionError,
  } = useFetch("/products?limit=0");
  const related = (collection?.products || [])
    .filter(
      (item) =>
        item.id !== product?.id && CLOTHING_CATEGORIES.includes(item.category),
    )
    .slice(0, 4);
  const originalPrice = product?.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;
  const titleStyle =
    "font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl";

  // -------------------------- Styles --------------------------
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
  const breadcrumbCurrentStyle = "truncate capitalize text-black dark:text-white";
  const detailLayoutStyle = "grid gap-6 sm:grid-cols-2 sm:gap-9";
  const brandStyle =
    "text-[10px] font-bold uppercase tracking-[.2em] text-black/45 dark:text-white/45";
  const ratingStyle = "mt-3 flex items-center gap-2 text-sm";
  const ratingValueStyle = "text-black/40 dark:text-white/40";
  const starsStyle = "tracking-wider text-amber-400";
  const detailPriceStyle = "mt-3 flex items-center gap-3 text-2xl font-bold";
  const oldPriceStyle = "text-lg text-black/35 dark:text-white/35";
  const discountStyle = "rounded-full bg-red-50 px-3 py-1 text-xs text-red-500";
  const descriptionStyle =
    "my-4 border-b border-black/10 pb-5 text-sm leading-relaxed text-black/55 dark:border-white/15 dark:text-white/55";
  const availabilityStyle = "mb-4 text-xs text-black/55 dark:text-white/55";
  const availabilityDotStyle = `mr-2 inline-block size-2 rounded-full ${product?.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`;
  const optionLabelStyle = "mb-3 block text-sm text-black/50 dark:text-white/50";
  const optionGroupStyle = "border-t border-black/10 py-4 dark:border-white/15";
  const colorOptionsStyle = "flex gap-3";
  const colorOliveStyle =
    "grid size-8 place-items-center rounded-full bg-[#55543e] text-white ring-1 ring-black ring-offset-2 dark:ring-white";
  const colorNavyStyle = "size-8 rounded-full bg-[#293345]";
  const colorCharcoalStyle = "size-8 rounded-full bg-neutral-800";
  const sizeOptionsStyle = "flex flex-wrap gap-2";
  const sizeBaseStyle = "rounded-full px-4 py-2.5 text-xs";
  const sizeSelectedStyle = "bg-black text-white dark:bg-white dark:text-black";
  const sizeIdleStyle = "bg-soft text-black/55 dark:bg-zinc-800 dark:text-white/55";
  const purchaseRowStyle = "mt-2 flex gap-3";
  const quantityStyle =
    "flex min-w-28 items-center justify-around rounded-full bg-soft px-2 dark:bg-zinc-800";
  const quantityButtonStyle = "p-2";
  const quantityLabelStyle = "text-sm";
  const addButtonStyle =
    "flex-1 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black";
  const tabsStyle = "mt-12 grid grid-cols-3 border-b border-black/10 dark:border-white/15 sm:mt-16";
  const tabStyle = "border-b-2 px-1 py-4 text-xs sm:text-sm";
  const tabActiveStyle = "border-black font-semibold dark:border-white";
  const tabIdleStyle = "border-transparent text-black/50 dark:text-white/50";
  const reviewsSectionStyle = "py-6 sm:py-8";
  const reviewsHeadingStyle = "mb-5 flex flex-wrap items-center gap-2";
  const reviewsTitleStyle = "text-lg font-bold sm:text-xl";
  const reviewCountStyle = "text-sm font-normal text-black/45 dark:text-white/45";
  const mutedLabelStyle = "mt-1 text-xs text-black/45 dark:text-white/45";
  const sortButtonStyle =
    "flex items-center gap-2 rounded-full bg-soft px-3 py-2 text-xs text-black dark:bg-zinc-800 dark:text-white";
  const reviewActionStyle =
    "rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black";
  const reviewsGridStyle = "grid gap-3 sm:grid-cols-2";
  const reviewCardStyle = "rounded-2xl border border-black/10 p-4 dark:border-white/15 sm:p-5";
  const reviewStarsStyle = "text-lg tracking-widest text-amber-400";
  const reviewNameStyle = "mt-2 text-sm font-bold";
  const verifiedStyle =
    "inline-grid size-4 place-items-center rounded-full bg-emerald-500 align-middle text-white";
  const reviewTextStyle = "my-3 text-xs leading-relaxed text-black/55 dark:text-white/55";
  const reviewDateStyle = "text-[10px] text-black/45 dark:text-white/45";
  const loadReviewsStyle =
    "mx-auto mt-5 block rounded-full border border-black/10 px-5 py-3 text-xs font-semibold dark:border-white/15";
  const relatedSectionStyle = "py-8";
  const relatedHeadingStyle = "mb-5 text-center";
  const relatedKickerStyle =
    "text-[10px] font-bold tracking-[.2em] text-black/45 dark:text-white/45";
  const relatedTitleStyle = `${titleStyle} mt-2 text-2xl sm:text-3xl`;
  const titleMarginStyle = "mt-2";
  const reviewOverviewStyle = "mr-auto";
  const tabWrapperStyle =
    "my-6 rounded-2xl border border-black/10 p-5 text-sm leading-relaxed text-black/60 dark:border-white/15 dark:text-white/60";
  const reviewSummaryStyle = "text-sm font-normal text-black/45 dark:text-white/45";
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
          <h1 className={`${titleStyle} ${titleMarginStyle}`}>
            {product.title}
          </h1>
          <div className={ratingStyle}>
            <span className={starsStyle}>★★★★★</span>
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
              <button aria-label="Olive" className={colorOliveStyle}>
                <Check size={14} />
              </button>
              <button aria-label="Navy" className={colorNavyStyle} />
              <button aria-label="Charcoal" className={colorCharcoalStyle} />
            </div>
          </div>
          <div className={optionGroupStyle}>
            <span className={optionLabelStyle}>Choose Size</span>
            <div className={sizeOptionsStyle}>
              {sizeOptionsLabels.map((size) => (
                <button
                  key={size}
                  className={`${sizeBaseStyle} ${size === "Large" ? sizeSelectedStyle : sizeIdleStyle}`}
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
              >
                <Minus size={15} />
              </button>
              <span className={quantityLabelStyle}>1</span>
              <button
                aria-label="Increase quantity"
                className={quantityButtonStyle}
              >
                <Plus size={15} />
              </button>
            </div>
            <button className={addButtonStyle}>Add to Cart</button>
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
            {name === "Reviews" ? ` (${Math.round(product.rating * 90)})` : ""}
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
                  ({Math.round(product.rating * 90)})
                </span>
              </h2>
              <p className={mutedLabelStyle}>
                Showing customer feedback about this style
              </p>
            </div>
            <button className={sortButtonStyle}>
              Latest <ChevronDown size={14} />
            </button>
            <button className={reviewActionStyle}>Write a Review</button>
          </div>
          <div className={reviewsGridStyle}>
            {reviews.map((review) => (
              <article className={reviewCardStyle} key={review.name}>
                <p className={reviewStarsStyle}>★★★★★</p>
                <h3 className={reviewNameStyle}>
                  {review.name}{" "}
                  <span className={verifiedStyle}>
                    <Check size={11} />
                  </span>
                </h3>
                <p className={reviewTextStyle}>“{review.text}”</p>
                <span className={reviewDateStyle}>Posted on {review.date}</span>
              </article>
            ))}
          </div>
          <button className={loadReviewsStyle}>Load More Reviews</button>
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
