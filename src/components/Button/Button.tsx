import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, appereance, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.big]: appereance === 'big',
        [styles.small]: appereance === 'small'
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
