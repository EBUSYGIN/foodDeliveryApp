import { Await, Link, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Heading from '../../components/Heading/Heading';
import styles from './ProductPage.module.css';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { cartActions } from '../../Redux/cart.slice';
import RatingCard from '../../components/RatingCard/RatingCard';
import IngridientsList from '../../components/IngridientsList/IngridientsList';

function ProductPage() {
  const data = useLoaderData() as { data: Product };
  const dispatch = useDispatch<AppDispatch>();

  const addProduct = (id: number) => {
    dispatch(cartActions.addProduct(id));
  };

  return (
    <Suspense fallback={<>Загрузка</>}>
      <Await resolve={data.data}>
        {({ data }: { data: Product }) => (
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.left}>
                <Link to={'/'} className={styles.back}>
                  <img src='/back.svg' alt='Иконка ссылки назад' />
                </Link>
                <Heading>{data.name}</Heading>
              </div>

              <Button
                appereance='small'
                className={styles.cart}
                onClick={() => addProduct(data.id)}
              >
                <img src='/cart.svg' className={styles.icon} /> В корзину
              </Button>
            </div>

            <div className={styles.product}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url('${data.image}')` }}
              ></div>
              <div className={styles.info}>
                <div className={styles.price}>
                  Цена{' '}
                  <span>
                    {data.price}&nbsp;
                    <span className={styles.currency}>&#8381;</span>
                  </span>
                </div>
                <hr className={styles.line} />

                <div className={styles.price}>
                  Рейтинг
                  <span>
                    <RatingCard rating={data.rating} />
                  </span>
                </div>

                <div className={styles.ingridients}>
                  <IngridientsList ingredients={data.ingredients} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default ProductPage;
