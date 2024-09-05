import { Outlet } from 'react-router-dom';

import styles from './AuthLayout.module.css';

function Sidebar() {
  return (
    <div className={styles.layout}>
      <div className={styles.image}>
        <img src='/logo.svg' alt='Логотип приложения' />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
