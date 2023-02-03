import cn from 'classnames';
import { IAdvantagesProps } from "./Advantages.props";
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages }: IAdvantagesProps) => {

  return (
    <>
      {advantages.map(a => (
        <div key={a._id} className={styles.advantage}>
          <CheckIcon/>
          <h4 className={styles.title}>{a.title}</h4>
          <hr className={styles.vline}/>
          <p>{a.description}</p>
        </div>
      ))}
    </>
  );
};