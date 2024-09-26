import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../Redux/store';
import CartItem from '../../components/CartItem/CartItem';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import Checkout from '../../components/Checkout/Checkout';
import Button from '../../components/Button/Button';
import styles from './Cart.module.css';
import Promo from '../../components/Promo/Promo';

const DELIVERY_FEE = 169;

type PromoForm = {
  promo: {
    value: string;
  };
};

export function Cart() {
  const products = useSelector((s: RootState) => s.cart.products);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const [cartItems, setCartItems] = useState<Product[]>();
  const [invalidPromo, setInvalidPromo] = useState<boolean>(false);

  useEffect(() => {
    loadProductInfo();
  }, [products]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (invalidPromo) {
      timeoutId = setTimeout(() => {
        setInvalidPromo(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [invalidPromo]);

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
    } catch (e) {
      console.log(e);
    }
  };

  const sendPromo = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & PromoForm;
    const { promo } = target;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/${promo}`
      );
      console.log(data);
    } catch (e) {
      setInvalidPromo(true);
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
      <Promo
        placeholder='Промокод'
        sendPromo={sendPromo}
        name='promo'
        isValid={invalidPromo}
      />
      <div className={styles.button}>
        <Button appereance='big' onClick={checkout}>
          оформить
        </Button>
      </div>
    </div>
  );
}
