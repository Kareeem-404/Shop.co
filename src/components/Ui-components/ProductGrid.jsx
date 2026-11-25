import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, loading, error }) {
  // -------------------------- Styles --------------------------
  const gridStyle =
    "grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4";
  const skeletonStyle = "aspect-[.94] animate-pulse rounded-2xl bg-soft dark:bg-zinc-800";
  const skeletonTitleStyle = "mt-3 h-4 w-3/4 animate-pulse rounded bg-soft dark:bg-zinc-800";
  const skeletonMetaStyle = "mt-2 h-3 w-1/3 animate-pulse rounded bg-soft dark:bg-zinc-800";
  const stateStyle = "col-span-full rounded-2xl bg-soft px-6 py-14 text-center dark:bg-zinc-900";
  const stateTitleStyle = "text-lg font-bold text-black dark:text-white";
  const stateTextStyle = "mt-2 text-sm text-black/55 dark:text-white/55";
  // -------------------------- Styles --------------------------
  if (loading)
    return (
      <div className={gridStyle} aria-label="Loading clothes">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <div className={skeletonStyle} />
            <div className={skeletonTitleStyle} />
            <div className={skeletonMetaStyle} />
          </div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className={stateStyle} role="alert">
        <h3 className={stateTitleStyle}>Couldn’t load products</h3>
        <p className={stateTextStyle}>
          Please check your connection and try again.
        </p>
      </div>
    );
  if (!products?.length)
    return (
      <div className={stateStyle}>
        <h3 className={stateTitleStyle}>No clothing products found</h3>
        <p className={stateTextStyle}>Please check back later.</p>
      </div>
    );
  return (
    <div className={gridStyle}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
