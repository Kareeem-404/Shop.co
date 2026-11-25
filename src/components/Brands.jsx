import Container from "./Ui-components/Container.jsx";

export default function Brands() {
  // -------------------------- Styles --------------------------
  const sectionStyle = "bg-black text-white";
  const listStyle =
    "flex min-h-28 flex-wrap items-center justify-center gap-x-7 gap-y-5 py-6 sm:min-h-24 sm:justify-between sm:gap-6";
  const brandStyle =
    "whitespace-nowrap font-serif text-[22px] tracking-tight sm:text-[29px]";
  const brandStyles = [
    brandStyle,
    `${brandStyle} font-bold tracking-widest`,
    brandStyle,
    `${brandStyle} font-bold tracking-widest`,
    "whitespace-nowrap font-sans text-lg font-light tracking-tight sm:text-2xl",
  ];
  // -------------------------- Styles --------------------------
  const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];
  return (
    <section id="brands" className={sectionStyle} aria-label="Featured brands">
      <Container className={listStyle}>
        {brands.map((brand, index) => (
          <span key={brand} className={brandStyles[index]}>
            {brand}
          </span>
        ))}
      </Container>
    </section>
  );
}
