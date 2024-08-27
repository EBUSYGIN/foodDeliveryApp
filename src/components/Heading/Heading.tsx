import { HeadingProps } from './Heading.props';
import styles from './Heading.module.css';
import cn from 'classnames';

function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h1 {...props} className={cn(className, styles.heading)}>
      {children}
    </h1>
  );
}

export default Heading;
