import { useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../Redux/store';

import Checkout from '../../components/Checkout/Checkout';

import styles from './Cart.module.css';
import { EmptyCart } from '../../components/Heading/EmptyCart/EmptyCart';

export function Cart() {
  const products = useSelector((s: RootState) => s.cart.products);

  return (
    <>
      <div className={styles.header}>
        <Heading>Корзина</Heading>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.checkout}>
          {products.length > 0 ? (
            <Checkout products={products} />
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </>
  );
}
