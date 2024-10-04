import { useNavigate } from 'react-router-dom';
import styles from './EmptyCart.module.css';
import Button from '../../Button/Button';

export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        Ваша корзина <span>пуста</span>
      </div>
      <img
        className={styles.image}
        src='/empty-cart.svg'
        alt='Иконка пустой корзины'
      />
      <Button appereance='small' onClick={() => navigate('/')}>
        Назад за едой
      </Button>
    </div>
  );
};
