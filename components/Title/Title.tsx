import cn from 'classnames';
import { ITitleProps } from "./Title.props";
import styles from './Title.module.css';

export const Title = ({ As = 'h1', children, className, ...props }: ITitleProps) => {
  const classList = cn(
    className,
    [styles[`title--${As}`]]
  );

  return (
    <As className={classList} {...props}>
      {children}
    </As>
  );
};