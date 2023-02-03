import cn from 'classnames';
import { IDividerProps } from "./Divider.props";
import styles from './Divider.module.css';

export const Divider = ({ className, ...props }: IDividerProps) => {
  const classList = cn(styles.hr,className);

  return (
    <hr className={classList} {...props}/>
  );
};