import { IFooterProps } from "./Footer.props";
import cn from 'classnames';
import styles from './Footer.module.css';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: IFooterProps) => {

  const classList = cn(className, styles.footer);

  return (
    <footer className={classList} {...props}>
      <div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href="#" target="_blank">Пользовательское соглашение</a>
      <a href="#" target="_blank">Политика конфиденциальности</a>
    </footer>
  );
};