import { forwardRef } from 'react';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';

export const Search = forwardRef<HTMLInputElement, SearchProps>(function (
  { isValid, className, ...props },
  ref
) {
  return (
    <div className={styles['search-container']}>
      <input
        ref={ref}
        className={cn(className, styles.search, {
          [styles.invalid]: !isValid
        })}
        {...props}
      ></input>
      <img className={styles.icon} src='search-icon.svg' alt='Иконка поиска' />
    </div>
  );
});
