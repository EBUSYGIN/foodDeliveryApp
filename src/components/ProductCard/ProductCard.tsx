import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { cartActions } from '../../Redux/cart.slice';
import { MouseEvent } from 'react';

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const addProduct = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.addProduct(props.id));
  };

  return (
    <Link className={styles.link} to={`/product/${props.id}`}>
      <div className={styles.card}>
        <div
          className={styles.head}
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <div className={styles.price}>
            {props.price}&nbsp;<span className={styles.currency}>&#8381;</span>
          </div>
          <button className={styles.add} onClick={addProduct}>
            <img src='/add-button-icon.svg' alt='Иконка добавления в корзину' />
          </button>
          <div className={styles.rating}>
            {props.rating}
            <img src='/star-icon.svg' alt='Иконка звезды' />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.description}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
