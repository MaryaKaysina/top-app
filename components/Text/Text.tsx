import cn from 'classnames';
import { ITextProps } from "./Text.props";
import styles from './Text.module.css';

export const Text = ({ size = 'md', children, className,...props }: ITextProps) => {
  const classList = cn(
    styles.text,
    className,
    [styles[`${size}`]]
  );

  return (
    <p className={classList} { ...props }>
      {children}
    </p>
  );
};