import cn from 'classnames';
import styles from './Up.module.css';
import ArrowIcon from './arrow.svg';
import { useScrollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = () => {
  const scrollY = useScrollY();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: scrollY / document.body.scrollHeight });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
      className={styles.up} 
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon appearance='primary' icon='up' onClick={scrollToTop}/>
    </motion.div>
  );
};