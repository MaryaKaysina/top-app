import cn from 'classnames';
import { IInputProps } from "./Input.props";
import styles from './Input.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
  ({ className, error, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const classList = cn(styles.input, { [styles.error] : error });

  return (
    <div className={cn(className, styles.inputBlock)}>
      <input className={classList} ref={ref} {...props}/>
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});