import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import cn from 'classnames';
import { AppDispatch } from '../../Redux/store';
import { cartActions } from '../../Redux/cart.slice';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const removeProduct = () => {
    dispatch(cartActions.removeProduct(props.id));
  };

  const addProduct = () => {
    dispatch(cartActions.addProduct(props.id));
  };

  const decreaseProduct = () => {
    dispatch(cartActions.decreaseProduct(props.id));
  };

  return (
    <div className={styles.item}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.price}>{props.price} &#8381;</div>
      </div>
      <div className={styles.actions}>
        <button
          className={cn(styles.decrease, styles.button)}
          onClick={decreaseProduct}
        >
          <img src='/decrease.svg' alt='Иконка уменьшения товара' />
        </button>
        <div className={styles.count}>{props.count}</div>
        <button
          className={cn(styles.button, styles.increase)}
          onClick={addProduct}
        >
          <img src='/increase.svg' alt='Иконка увеличения товара' />
        </button>
        <button
          className={cn(styles.remove, styles.button)}
          onClick={removeProduct}
        >
          <img src='/remove.svg' alt='Иконка удаления товара' />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
