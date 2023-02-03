import cn from 'classnames';
import { IReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props }: IReviewFormProps) => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const classList = cn(
    styles.reviewForm,
    className
  );

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так...');
      }
    } catch(err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classList} { ...props }>
        <Input 
          placeholder='Имя' 
          className={styles.input} 
          { ...register('name', { required: { value: true, message: 'Заполните имя' } }) }
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input 
          placeholder='Заголовок отзыва' 
          className={styles.input} 
          { ...register('title', { required: { value: true, message: 'Заполните заголовок' } }) }
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller 
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating 
                ref={field.ref} 
                rating={field.value} 
                isEditable 
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea 
          placeholder='Текст отзыва' 
          className={styles.descr} 
          { ...register('description', { required: { value: true, message: 'Отзыв не может быть пустым' } }) }
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='Введите текст отзыва'
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button 
            appearance='primary' 
            tabIndex={isOpened ? 0 : -1} 
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role='alert'>
          <p className={styles.panelTitle}>Ваш отзыв отправлен</p>
          <p>Спасибо! Ваш отзыв будет опубликован после проверки.</p>
          <button 
            className={styles.close} 
            onClick={() => setIsSuccess(false)}
            aria-label='Закрыть уведомление'
          >
            <CloseIcon/>
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.panel, styles.error)} role='alert'>
          <p className={styles.panelTitle}>Что-то пошло не так, попробуйте обновить страницу</p>
          <button 
            className={styles.close} 
            onClick={() => setError(undefined)}
            aria-label='Закрыть уведомление'
          >
            <CloseIcon/>
          </button>
        </div>
      )}
    </form>
  );
};