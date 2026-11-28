import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Container from "../components/Ui-components/Container.jsx";
import { useCartStore } from "../store/cartStore.js";
import { toast } from "react-hot-toast";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  // -------------------------- Styles --------------------------
  const pageStyle = "py-10 sm:py-14";
  const titleStyle =
    "font-display text-3xl font-black uppercase tracking-tight sm:text-4xl";
  const layoutStyle = "mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]";
  const listStyle =
    "divide-y divide-black/10 rounded-2xl border border-black/10 px-4 dark:divide-white/10 dark:border-white/10 sm:px-6";
  const itemStyle = "flex gap-4 py-5 sm:gap-6";
  const imageStyle =
    "size-24 shrink-0 rounded-xl bg-soft object-cover dark:bg-zinc-800 sm:size-32";
  const itemTitleStyle = "line-clamp-2 text-sm font-bold sm:text-base w-fit";
  const metaStyle = "mt-2 text-xs text-black/55 dark:text-white/55";
  const priceStyle = "mt-3 text-lg font-bold";
  const removeStyle =
    "ml-auto self-start rounded-full cursor-pointer p-2 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/50";
  const quantityWrapStyle =
    "mt-3 inline-flex items-center gap-3 rounded-full bg-soft px-2 py-1 dark:bg-zinc-800";
  const quantityButtonStyle =
    "grid size-7 place-items-center cursor-pointer rounded-full transition hover:bg-black/10 dark:hover:bg-white/10";
  const quantityStyle = "min-w-4 text-center text-sm font-semibold";
  const summaryStyle =
    "h-fit rounded-2xl border border-black/10 p-5 dark:border-white/10 sm:p-6";
  const summaryTitleStyle = "text-xl font-bold";
  const summaryRowStyle =
    "mt-5 flex justify-between text-sm text-black/55 dark:text-white/55";
  const totalStyle =
    "mt-4 flex justify-between border-t border-black/10 pt-4 text-base font-bold dark:border-white/10";
  const continueStyle =
    "mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4";
  const emptyStyle =
    "mt-7 rounded-2xl border border-dashed border-black/15 px-5 py-14 text-center dark:border-white/20";
  const emptyTitleStyle = "text-lg font-bold";
  const emptyTextStyle = "mt-2 text-sm text-black/55 dark:text-white/55";
  const shopButtonStyle =
    "mt-5 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black";
  const itemInfoStyle = "min-w-0 flex-1";
  const sizeValueStyle = "font-medium text-black dark:text-white";
  const colorMetaStyle = "mt-1 text-xs text-black/55 dark:text-white/55";
  const colorValueStyle = "font-medium text-black dark:text-white";
  // -------------------------- Styles --------------------------

  return (
    <Container className={pageStyle}>
      <h1 className={titleStyle}>Your Cart</h1>
      {items.length === 0 ? (
        <div className={emptyStyle}>
          <h2 className={emptyTitleStyle}>Your cart is empty</h2>
          <p className={emptyTextStyle}>
            Looks like you haven’t found your style yet.
          </p>
          <Link to="/" className={shopButtonStyle}>
            {" "}
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={layoutStyle}>
          <section className={listStyle} aria-label="Cart items">
            {items.map(({ product, size, color = "Olive", quantity }) => (
              <article
                className={itemStyle}
                key={`${product.id}-${size}-${color}`}
              >
                <Link
                  to={`/products/${product.id}`}
                  aria-label={`View ${product.title}`}
                >
                  <img
                    className={imageStyle}
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </Link>
                <div className={itemInfoStyle}>
                  <Link
                    to={`/products/${product.id}`}
                    className={itemTitleStyle}
                  >
                    {product.title}
                  </Link>
                  <p className={metaStyle}>
                    Size: <span className={sizeValueStyle}>{size}</span>
                  </p>
                  <p className={colorMetaStyle}>
                    Color: <span className={colorValueStyle}>{color}</span>
                  </p>
                  <p className={priceStyle}>${product.price.toFixed(2)}</p>
                  <div className={quantityWrapStyle}>
                    <button
                      type="button"
                      className={quantityButtonStyle}
                      aria-label={`Decrease quantity of ${product.title}`}
                      onClick={() =>
                        setQuantity(product.id, size, color, quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <span className={quantityStyle} aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className={quantityButtonStyle}
                      aria-label={`Increase quantity of ${product.title}`}
                      onClick={() =>
                        setQuantity(product.id, size, color, quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className={removeStyle}
                  aria-label={`Remove ${product.title} from cart`}
                  onClick={() => {
                    removeItem(product.id, size, color);
                    toast.error(`${product.title} removed from your cart`)
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </section>
          <aside className={summaryStyle}>
            <h2 className={summaryTitleStyle}>Order Summary</h2>
            <p className={summaryRowStyle}>
              <span>Items</span>
              <span>{count}</span>
            </p>
            <p className={summaryRowStyle}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </p>
            <div className={totalStyle}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/" className={continueStyle}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </Container>
  );
}
