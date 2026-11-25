import { useMemo, useState } from "react";
import Hero from "../components/Hero.jsx";
import Brands from "../components/Brands.jsx";
import Container from "../components/Ui-components/Container.jsx";
import Pagination from "../components/Ui-components/Pagination.jsx";
import ProductGrid from "../components/Ui-components/ProductGrid.jsx";
import useFetch from "../Hooks/useFetch.js";

const CLOTHING_CATEGORIES = [
  "mens-shirts",
  "tops",
  "womens-dresses",
  "mens-shoes",
  "womens-shoes",
];
const PAGE_SIZE = 8;

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch("/products?limit=0");
  const clothes = useMemo(
    () =>
      (data?.products || []).filter((product) =>
        CLOTHING_CATEGORIES.includes(product.category),
      ),
    [data],
  );
  const pageCount = Math.ceil(clothes.length / PAGE_SIZE);
  const visibleProducts = clothes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const headingStyle =
    "font-display text-3xl font-black tracking-tight sm:text-4xl";
  const sectionStyle = "scroll-mt-24 py-12 sm:py-16 lg:py-20";
  const headingRowStyle = "mb-6 flex items-end justify-between gap-4 sm:mb-8";
  const kickerStyle =
    "mb-2 text-[10px] font-bold tracking-[.2em] text-black/45 dark:text-white/45";
  const countStyle = "text-right text-xs text-black/50 dark:text-white/50 sm:text-sm";

  const changePage = (nextPage) => {
    setPage(nextPage);
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero />
      <Brands />
      <section id="products" className={sectionStyle}>
        <Container>
          <div className={headingRowStyle}>
            <div>
              <p className={kickerStyle}>CURATED FOR YOUR EVERYDAY</p>
              <h2 className={headingStyle}>OUR COLLECTION</h2>
            </div>
            <p className={countStyle}>
              {loading
                ? "Loading styles…"
                : `${clothes.length} clothing styles`}
            </p>
          </div>
          <ProductGrid
            products={visibleProducts}
            loading={loading}
            error={error}
          />
          {!loading && !error && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onChange={changePage}
            />
          )}
        </Container>
      </section>
    </>
  );
}
