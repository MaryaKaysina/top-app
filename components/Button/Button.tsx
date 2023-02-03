import styles from './Button.module.css';
import { IButtonProps } from './Button.props';
import cn from 'classnames';
import ArrowIcon from './arrow.svg';
import { motion } from 'framer-motion';

export const Button = (
  { 
    appearance, 
    arrow = 'none',
    children, 
    className,
    ...props
  }: IButtonProps) => {

  const classList = cn(
    styles.btn,
    className,
    { [styles.primary]: appearance === 'primary' },
    { [styles.ghost]: appearance === 'ghost' }
  );
  const classListArrow = cn(
    styles.arrow,
    { [styles.down]: arrow === 'down' },
    { [styles.right]: arrow === 'right' }
  );

  return (
    <motion.button 
    whileHover={{ scale: 1.05 }}
      className={classList} 
      { ...props }
    >
      {children}
      {arrow !== 'none' && (
        <span className={classListArrow}>
          <ArrowIcon/>
        </span>
      )}
    </motion.button>
  );
};