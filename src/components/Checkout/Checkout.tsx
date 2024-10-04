import { useNavigate } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import styles from './Checkout.module.css';
import { CheckoutProps } from './Checkout.props';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Button from '../Button/Button';
import { FormEvent, useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import Promo from '../Promo/Promo';

const DELIVERY_FEE = 169;
type PromoForm = {
  promo: {
    value: string;
  };
};

function Checkout(props: CheckoutProps) {
  const navigate = useNavigate();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const [cartItems, setCartItems] = useState<Product[]>();
  const [invalidPromo, setInvalidPromo] = useState<boolean>(false);

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

  useEffect(() => {
    loadProductInfo();
  }, [props.products]);

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

  const checkout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          products: props.products
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      navigate(`/success/${data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const loadProduct = async (id: number) => {
    const { data } = await axios.get<Product>(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return data;
  };

  const loadProductInfo = async () => {
    const info = await Promise.all(
      props.products.map((i) => loadProduct(i.id))
    );
    setCartItems(info);
  };

  const totalPrice = props.products
    .map((product) => {
      const item = cartItems?.find((i) => i.id === product.id);
      if (!item) return 0;
      return product.count * item.price;
    })
    .reduce((acc, value) => (acc += value), 0);

  const count = props.products.reduce(
    (acc, product) => (acc += product.count),
    0
  );

  return (
    <>
      <div>
        {props.products.map((product) => {
          const productInfo = cartItems?.find((p) => p.id === product.id);
          if (!productInfo) return;
          return (
            <CartItem key={product.id} count={product.count} {...productInfo} />
          );
        })}
      </div>
      <div className={styles.checkout}>
        <div className={styles.info}>
          Итог
          <div className={styles.price}>
            {totalPrice}&nbsp;<span>&#8381;</span>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.info}>
          Доставка
          <div className={styles.price}>
            {DELIVERY_FEE}&nbsp;<span>&#8381;</span>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.info}>
          <div>
            Итог <span>({count})</span>
          </div>
          <div className={styles.price}>
            {totalPrice + DELIVERY_FEE}&nbsp;
            <span>&#8381;</span>
          </div>
        </div>
      </div>
      <Promo
        placeholder='Промокод'
        sendPromo={sendPromo}
        name='promo'
        isValid={invalidPromo}
      />
      <Button appereance='big' onClick={checkout}>
        оформить
      </Button>
    </>
  );
}

export default Checkout;
