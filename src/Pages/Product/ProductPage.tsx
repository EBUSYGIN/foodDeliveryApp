import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

function ProductPage() {
  const data = useLoaderData() as Product;
  return <>Product - {data.name}</>;
}

export default ProductPage;
