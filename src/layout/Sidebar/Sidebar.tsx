import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { userActions } from '../../Redux/user.slice';

function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((s: RootState) => s.user.profile);

  const logout = () => {
    dispatch(userActions.removeJwt());
    navigate('/auth/login');
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebarContainer}>
        <nav className={styles.sidebar}>
          <div className={styles.user}>
            <img className={styles.avatar} src='/avatar.png' alt='Аватар' />
            <div className={styles.name}>{profile?.name}</div>
            <div className={styles.email}>{profile?.email}</div>
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
          <Button appereance='small' className={styles.exit} onClick={logout}>
            <img src='exit-icon.svg' alt='Иконка выхода' />
            Выйти
          </Button>
        </nav>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
