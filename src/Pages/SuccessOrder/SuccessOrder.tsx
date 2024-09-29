import { useNavigate, useParams } from 'react-router-dom';
import styles from './SuccessOrder.module.css';
import Button from '../../components/Button/Button';

function SuccessOrder() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <img src='/pizza.png' alt='Изображение пиццы' />
      <div className={styles.success}>Ваш заказ успешно оформлен!</div>
      <div>Номер заказа: {id}</div>
      <Button appereance='big' onClick={() => navigate('/')}>
        Сделать новый
      </Button>
    </div>
  );
}

export default SuccessOrder;
