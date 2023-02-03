import cn from 'classnames';
import { ColorEnum, ICardProps } from "./Card.props";
import styles from './Card.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(
  ({ color = ColorEnum.white, children, className, ...props }: ICardProps, ref: ForwardedRef<HTMLDivElement>) => {
  const classList = cn(
    styles.card,
    className,
    [styles[`${color}`]]
  );

  return (
    <div ref={ref} className={classList} { ...props }>
      {children}
    </div>
  );
});