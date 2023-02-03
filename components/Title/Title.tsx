import { ITitleProps } from "./Title.props";
import styles from './Title.module.css';

export const Title = ({ As = 'h1', children }: ITitleProps) => {
  return (
    <As className={styles[`title--${As}`]}>{children}</As>
  );
};