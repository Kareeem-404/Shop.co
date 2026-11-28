import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Container from '../components/Ui-components/Container.jsx'
import ProductCard from '../components/Ui-components/ProductCard.jsx'
import { useCartStore } from '../store/cartStore.js'

export default function Favorites() {
  const favorites = useCartStore((state) => state.favorites)

  // -------------------------- Styles --------------------------
  const pageStyle = 'py-10 sm:py-14'
  const headingRowStyle = 'mb-7 flex items-end justify-between gap-4'
  const titleStyle = 'font-display text-3xl font-black uppercase tracking-tight sm:text-4xl'
  const countStyle = 'text-xs text-black/50 dark:text-white/50 sm:text-sm'
  const gridStyle = 'grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4'
  const emptyStyle = 'rounded-2xl border border-dashed border-black/15 px-5 py-14 text-center dark:border-white/20'
  const emptyIconStyle = 'mx-auto mb-3 text-black/35 dark:text-white/35'
  const emptyTitleStyle = 'text-lg font-bold'
  const emptyCopyStyle = 'mt-2 text-sm text-black/55 dark:text-white/55'
  const buttonStyle = 'mt-5 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black'
  // -------------------------- Styles --------------------------

  return (
    <Container className={pageStyle}>
      <div className={headingRowStyle}>
        <h1 className={titleStyle}>Your Favorites</h1>
        <p className={countStyle}>{favorites.length} {favorites.length === 1 ? 'item' : 'items'}</p>
      </div>
      {favorites.length ? (
        <div className={gridStyle}>
          {favorites.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className={emptyStyle}>
          <Heart className={emptyIconStyle} size={30} />
          <h2 className={emptyTitleStyle}>Your favorites list is empty</h2>
          <p className={emptyCopyStyle}>Save the styles you love and find them here later.</p>
          <Link to="/#products" className={buttonStyle}>Explore clothes</Link>
        </div>
      )}
    </Container>
  )
}
