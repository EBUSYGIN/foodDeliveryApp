import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../Redux/store';
import CartItem from '../../components/CartItem/CartItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import Checkout from '../../components/Checkout/Checkout';
import Button from '../../components/Button/Button';
import styles from './Cart.module.css';

const DELIVERY_FEE = 169;

export function Cart() {
  const products = useSelector((s: RootState) => s.cart.products);
  const jwt = useSelector((s: RootState) => s.user.jwt);
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

  const productPrice = products
    .map((product) => {
      const item = cartItems?.find((i) => i.id === product.id);
      if (!item) return 0;
      return product.count * item.price;
    })
    .reduce((acc, value) => (acc += value), 0);

  const checkout = async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          products: products
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.checkout}>
      <Heading>Корзина</Heading>
      {products.map((product) => {
        const productInfo = cartItems?.find((p) => p.id === product.id);
        if (!productInfo) return;
        return (
          <CartItem key={product.id} count={product.count} {...productInfo} />
        );
      })}
      <Checkout
        productPrice={productPrice}
        deliveryFee={DELIVERY_FEE}
        totalPrice={productPrice + DELIVERY_FEE}
        count={2}
      />
      <div className={styles.button}>
        <Button appereance='big' onClick={checkout}>
          оформить
        </Button>
      </div>
    </div>
  );
}
