import cn from 'classnames';
import { ITagProps } from "./Tag.props";
import styles from './Tag.module.css';

export const Tag = (
  { 
    size = 'md', 
    children, 
    color = 'ghost', 
    href,
    className,
    ...props 
  }: ITagProps) => {
  const classList = cn(
    styles.tag,
    className,
    [styles[`${size}`]],
    [styles[`${color}`]]
  );

  return (
    <div className={classList} { ...props }>
      {href 
        ? <a href={href}>{children}</a>
        : <>{children}</>
      }
    </div>
  );
};