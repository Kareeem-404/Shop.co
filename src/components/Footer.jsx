import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import Container from "./Ui-components/Container.jsx";

const columns = [
  { title: "Company", items: ["About", "Features", "Works", "Career"] },
  {
    title: "Help",
    items: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    items: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    items: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];
const socials = [
  { label: "Twitter", Icon: Twitter },
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "Github", Icon: Github },
];
const payments = ["VISA", "Mastercard", "PayPal", "Pay", "G Pay"];

function Footer() {

  // -------------------------- Styles --------------------------
  const footerStyle = "bg-soft pb-20 pt-[125px] dark:bg-zinc-900 sm:pb-8 sm:pt-28";
  const topStyle =
    "grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]";
  const logoStyle =
    "font-display text-[29px] font-black leading-none tracking-[-.08em] lg:text-[33px]";
  const taglineStyle =
    "mt-4 max-w-[250px] text-sm leading-relaxed text-black/60 dark:text-white/60";
  const socialsStyle = "mt-6 flex gap-3";
  const socialButtonStyle =
    "grid size-8 place-items-center rounded-full border border-black/20 bg-white transition hover:bg-black hover:text-white dark:border-white/20 dark:bg-zinc-800 dark:text-white dark:hover:bg-white dark:hover:text-black";
  const columnsStyle =
    "grid grid-cols-2 gap-x-6 gap-y-8 sm:col-span-2 sm:grid-cols-4 lg:col-span-4";
  const columnTitleStyle = "text-xs font-medium uppercase tracking-[.15em]";
  const listStyle =
    "mt-4 flex flex-col gap-2.5 text-xs text-black/60 dark:text-white/60 sm:mt-6 sm:gap-3";
  const bottomStyle =
    "mt-8 flex flex-col items-center gap-4 border-t border-black/10 pt-5 dark:border-white/15 sm:flex-row sm:justify-between";
  const copyrightStyle = "text-center text-xs text-black/60 dark:text-white/60 sm:text-left";
  const paymentsStyle = "flex flex-wrap justify-center gap-2";
  const paymentBadgeStyle =
    "rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[10px] font-bold text-black/70 dark:border-white/10 dark:bg-zinc-800 dark:text-white/70";
  // -------------------------- Styles --------------------------
  
  return (
    <footer className={footerStyle}>
      <Container>
        <div className={topStyle}>
          <div>
            <p className={logoStyle}>SHOP.CO</p>
            <p className={taglineStyle}>
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className={socialsStyle}>
              {socials.map(({ label, Icon }) => (
                <button
                  type="button"
                  key={label}
                  className={socialButtonStyle}
                  aria-label={label}
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className={columnsStyle}>
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className={columnTitleStyle}>{column.title}</h4>
                <ul className={listStyle}>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={bottomStyle}>
          <p className={copyrightStyle}>
            Shop.co © 2000-{new Date().getFullYear()}, All Rights Reserved
          </p>
          <div className={paymentsStyle}>
            {payments.map((name) => (
              <span key={name} className={paymentBadgeStyle}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
