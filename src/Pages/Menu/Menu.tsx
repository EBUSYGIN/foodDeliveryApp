import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';

import { Search } from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <Heading>Меню</Heading>
        <Search placeholder='Введите блюдо или состав' />
      </div>
      <div className={styles.menu}>
        <ProductCard
          price={300}
          title='Наслаждение'
          description='Салями, руккола, помидоры, оливки'
          rating={4.5}
          image={'/product-demo.png'}
        />
      </div>
    </div>
  );
}
