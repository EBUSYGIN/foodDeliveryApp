import ProductCard from '../ProductCard/ProductCard';
import { ProductListProps } from './ProductList.props';

function ProductList({ products }: ProductListProps) {
  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      price={p.price}
      title={p.name}
      description={p.ingredients.join(', ')}
      rating={p.rating}
      image={p.image}
    />
  ));
}

export default ProductList;
