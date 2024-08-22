import { forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.props';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(styles.input, className, {
        [styles.invalid]: !isValid
      })}
    ></input>
  );
});

export default Input;
