import { ArrowUpRight, Star } from "lucide-react";
import Container from "./Ui-components/Container.jsx";

export default function Hero() {
  // -------------------------- Styles --------------------------
  const heroStyle = "overflow-hidden bg-[#f2f0f1] dark:bg-zinc-900";
  const innerStyle =
    "grid min-h-0 items-end gap-0 pt-9 sm:min-h-[500px] sm:grid-cols-[1.05fr_.95fr] sm:pt-10 lg:min-h-[555px]";
  const kickerStyle =
    "mb-4 flex items-center gap-2 text-[9px] font-bold tracking-[.2em] text-black/55 dark:text-white/55 sm:text-[10px]";
  const headingStyle =
    "font-display text-[clamp(40px,10.8vw,58px)] font-black leading-[.98] tracking-[-.065em] sm:text-[clamp(46px,5.25vw,70px)]";
  const copyStyle =
    "mb-5 mt-4 max-w-[500px] text-[13px] leading-relaxed text-black/55 dark:text-white/55 sm:mb-6 sm:mt-5 sm:text-[15px]";
  const buttonStyle =
    "inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/85 sm:w-auto sm:min-w-48";
  const statsStyle = "mt-6 flex justify-between sm:mt-10 sm:justify-start";
  const statStyle =
    "flex flex-1 flex-col gap-1 border-r border-black/10 px-2 first:pl-0 last:border-0 dark:border-white/15 sm:flex-none sm:px-6";
  const copyBlockStyle = "relative z-10 pb-0 sm:pb-8 lg:pb-10";
  const kickerRuleStyle = "h-px w-5 bg-black dark:bg-white";
  const statNumberStyle = "text-xl tracking-tight sm:text-[30px]";
  const statLabelStyle = "text-[9px] leading-tight text-black/50 dark:text-white/50 sm:text-xs";
  const visualStyle =
    "relative mx-auto mt-3 flex h-[285px] w-full items-end justify-center sm:mt-0 sm:h-[500px] sm:justify-end lg:h-[520px]";
  const heroCircleStyle =
    "absolute right-[calc(50%-115px)] top-8 size-[230px] rounded-full bg-black/10 dark:bg-white/5 sm:right-12 sm:top-16 sm:size-[370px]";
  const imageStyle =
    "relative h-full w-[90%] dark:brightness-60 object-cover object-[center_30%] sm:w-full";
  const largeSparkleStyle =
    "absolute right-1 top-8 text-5xl leading-none sm:right-3 sm:top-10 sm:text-7xl";
  const smallSparkleStyle =
    "absolute left-2 top-1/2 text-3xl leading-none sm:left-2";
  const captionStyle =
    "absolute bottom-4 right-0 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[8px] font-semibold tracking-widest text-black dark:bg-zinc-800 dark:text-white sm:bottom-7 sm:text-[9px]";
  // -------------------------- Styles --------------------------
  const stats = [
    ["200+", "International Brands"],
    ["2,000+", "High-Quality Products"],
    ["30,000+", "Happy Customers"],
  ];
  return (
    <section className={heroStyle}>
      <Container className={innerStyle}>
        <div className={copyBlockStyle}>
          <p className={kickerStyle}>
            <span className={kickerRuleStyle} /> THE NEW SEASON IS HERE
          </p>
          <h1 className={headingStyle}>
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>
          <p className={copyStyle}>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <a className={buttonStyle} href="#products">
            Shop Now <ArrowUpRight size={17} />
          </a>
          <div className={statsStyle}>
            {stats.map(([number, label]) => (
              <div className={statStyle} key={number}>
                <strong className={statNumberStyle}>{number}</strong>
                <span className={statLabelStyle}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={visualStyle}>
          <div className={heroCircleStyle} />
          <img
            className={imageStyle}
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1050&q=85"
            alt="Models wearing contemporary streetwear"
          />
          <span className={largeSparkleStyle}>✦</span>
          <span className={smallSparkleStyle}>✦</span>
          <span className={captionStyle}>
            <Star size={13} fill="currentColor" /> STYLE YOUR WAY
          </span>
        </div>
      </Container>
    </section>
  );
}
