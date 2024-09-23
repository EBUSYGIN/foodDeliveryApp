import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../Redux/store';
import CartItem from '../../components/CartItem/CartItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';

export function Cart() {
  const products = useSelector((s: RootState) => s.cart.products);
  const [cartItems, setCartItems] = useState<Product[]>();

  useEffect(() => {
    loadProductInfo();
  }, [products]);

  const loadProduct = async (id: number) => {
    const { data } = await axios.get<Product>(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return data;
  };

  const loadProductInfo = async () => {
    const info = await Promise.all(products.map((i) => loadProduct(i.id)));
    setCartItems(info);
  };

  return (
    <div>
      <Heading>Корзина</Heading>
      {products.map((product) => {
        const productInfo = cartItems?.find((p) => p.id === product.id);
        if (!productInfo) return;
        return (
          <CartItem key={product.id} count={product.count} {...productInfo} />
        );
      })}
    </div>
  );
}
