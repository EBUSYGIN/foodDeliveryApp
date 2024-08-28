import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Sidebar.module.css';
import cn from 'classnames';

function Sidebar() {
  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src='/avatar.png' alt='Аватар' />
          <div className={styles.name}>Имя фамилия</div>
          <div className={styles.email}>@gmail.com</div>
        </div>
        <div className={styles.menu}>
          <NavLink
            to={'/menu'}
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive
              })
            }
          >
            <img src='menu-icon.svg' alt='Иконка меню' />
            Меню
          </NavLink>
          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive
              })
            }
          >
            <img src='cart-icon.svg' alt='Иконка меню' />
            Корзина
          </NavLink>
        </div>
        <Button appereance='small' className={styles.exit}>
          <img src='exit-icon.svg' alt='Иконка выхода' />
          Выйти
        </Button>
      </nav>
      <Outlet />
    </div>
  );
}

export default Sidebar;
