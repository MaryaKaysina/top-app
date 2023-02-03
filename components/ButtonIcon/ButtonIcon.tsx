import styles from './ButtonIcon.module.css';
import { IButtonIconProps, icons } from './ButtonIcon.props';
import cn from 'classnames';

export const ButtonIcon = ({ appearance, icon,className, ...props}: IButtonIconProps) => {
  const IconComponent = icons[icon];

  const classList = cn(
    styles.btn,
    className,
    { [styles.primary]: appearance === 'primary' },
    { [styles.white]: appearance === 'white' }
  );

  return (
    <button className={classList} { ...props }>
      <IconComponent/>
    </button>
  );
};