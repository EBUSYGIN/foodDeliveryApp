import styles from './Checkout.module.css';
import { CheckoutProps } from './Checkout.props';

function Checkout(props: CheckoutProps) {
  return (
    <div className={styles.checkout}>
      <div className={styles.info}>
        Итог
        <div className={styles.price}>
          {props.productPrice}&nbsp;<span>&#8381;</span>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.info}>
        Доставка
        <div className={styles.price}>
          {props.deliveryFee}&nbsp;<span>&#8381;</span>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.info}>
        <div>
          Итог <span>({props.count})</span>
        </div>
        <div className={styles.price}>
          {props.totalPrice}&nbsp;
          <span>&#8381;</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
