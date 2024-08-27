import Heading from '../../components/Heading/Heading';

import { Search } from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <Heading>Меню</Heading>
        <Search placeholder='Введите блюдо или состав' />
      </div>
    </div>
  );
}
