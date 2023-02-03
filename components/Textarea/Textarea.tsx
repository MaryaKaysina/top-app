import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { ITextareaProps } from "./Textarea.props";
import styles from './Textarea.module.css';

export const Textarea = forwardRef(
  ({ className, error, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const classList = cn(styles.textarea, { [styles.error] : error });

  return (
    <div className={cn(className, styles.textareaBlock)}>
      <textarea className={classList} ref={ref} {...props}/>
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});