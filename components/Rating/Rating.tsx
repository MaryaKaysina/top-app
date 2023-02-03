/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { KeyboardEvent, useEffect, useState, ForwardedRef, forwardRef, useRef } from 'react';
import cn from 'classnames';
import { IRatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import StarIcon from './star.svg';

const NOOP = (i: number) => {};

export const Rating = forwardRef(({ error, isEditable = false, rating, setRating = NOOP, tabIndex, ...props }: IRatingProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleHoverRating = (i: number) => {
    if (!isEditable) return;
    constructRating(i);
  };

  const handleClickRating = (i: number) => {
    if (!isEditable) return;
    setRating(i);
  };

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) return -1;
    if (!rating && i === 0) return tabIndex ?? 0;
    if (r === i + 1) return tabIndex ?? 0;
    return -1;
  };

  const handleKey = (i: number, e: KeyboardEvent) => {
    if (!isEditable || !setRating) return;
    
    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      if(!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
    // if (e.code === 'Space') setRating(i);
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      const classList = cn(
        styles.star,
        { [styles.filled]: i < currentRating },
        { [styles.editable]: isEditable }
      );
      return (
        <span
          className={classList} 
          onMouseEnter={() => handleHoverRating(i + 1)}
          onMouseLeave={() => handleHoverRating(rating)}
          onClick={() => handleClickRating(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={(e: KeyboardEvent) => handleKey(i + 1, e)}
          ref={r => ratingArrayRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-label={isEditable ? 'Укажите рейтинг стрелками вверх или вниз' : ('рейтинг' + rating)}
          aria-valuenow={rating}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-invalid={error ? true : false}
        >
          <StarIcon />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  return (
    <div ref={ref} { ...props } className={cn(styles.ratingBlock, { [styles.error] : error })} >
      {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});