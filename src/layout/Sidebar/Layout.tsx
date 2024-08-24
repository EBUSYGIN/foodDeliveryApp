import { Link, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src='/avatar.png' alt='Аватар' />
          <div className={styles.name}>Имя фамилия</div>
          <div className={styles.email}>@gmail.com</div>
        </div>
        <div className={styles.menu}>
          <Link to={'/menu'} className={styles.link}>
            <img src='menu-icon.svg' alt='Иконка меню' />
            Меню
          </Link>
          <Link to={'/cart'} className={styles.link}>
            <img src='cart-icon.svg' alt='Иконка меню' />
            Корзина
          </Link>
        </div>
        <Button appereance='small' className={styles.exit}>
          <img src='exit-icon.svg' alt='Иконка выхода' />
          Выйти
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
