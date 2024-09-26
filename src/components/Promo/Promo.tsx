import { forwardRef } from 'react';
import { PromoProps } from './Promo.props';
import Button from '../Button/Button';
import styles from './Promo.module.css';
import cn from 'classnames';

const Promo = forwardRef<HTMLInputElement, PromoProps>(function (
  { isValid, className, sendPromo, ...props },
  ref
) {
  return (
    <form className={styles.promo} onSubmit={sendPromo}>
      <input
        ref={ref}
        {...props}
        className={cn(styles.input, {
          [styles.invalid]: isValid
        })}
      />
      <Button appereance='small' className={styles.button}>
        Применить
      </Button>
    </form>
  );
});

export default Promo;
