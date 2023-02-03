import cn from 'classnames';
import Image from 'next/image';
import { IProductProps } from "./Product.props";
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Title } from '../Title/Title';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helper';
import { Divider } from '../Divider/Divider';
import { Text } from '../Text/Text';
import { ColorEnum } from '../Card/Card.props';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className,...props }: IProductProps, ref: ForwardedRef<HTMLLIElement>) => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const variants = {
    visible: { opacity: 1, height: 'auto', zIndex: 1 },
    hidden: { opacity: 0, height: 0, zIndex: -1 }
  };

  const scrollToReview = () => {
    setIsReviewOpened(true);
    setTimeout(() => {
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      reviewRef.current?.focus();
    });
  };

  return (
    <li className={className} ref={ref} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={product.image.includes('http') ? '/no-image.svg' :`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
            alt={product.title}
            width={70} 
            height={70} 
          />
        </div>
        <div className={styles.title}><Title As='h3'>{product.title}</Title></div>
        <div className={styles.price}>
          <span><span className='visualyHidden'>цена </span>{priceRu(product.price)}</span>
          {product.oldPrice && (
            <Tag className={styles.sale} color='green' size='sm'>
              <span className='visualyHidden'>скидка </span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span><span className='visualyHidden'>в кредит </span>{priceRu(product.credit)}</span>
          <span className={styles.month}>/мес</span>
        </div>
        <div className={styles.rating}>
          <span className='visualyHidden'>{'рейтинг ' + (product.reviewAvg || product.initialRating)}</span>
          <Rating rating={product.reviewAvg || product.initialRating}/>
        </div>
        <div className={styles.tags}>
          {product.categories.map(tag => (
            <Tag className={styles.tag} key={tag} color='ghost' size='sm'>{tag}</Tag>
          ))}
        </div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>в кредит</div>
        <div className={styles.rateTitle}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>

        <Divider className={styles.hr}/>

        <Text className={styles.descr}>{product.description}</Text>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristic} key={c.name}>
              <span className={styles.name}>{c.name}</span>
              <span className={styles.dots}></span>
              <span className={styles.value}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <Title As='h4'>Преимущества</Title>
              <p className={styles.advText}>{product.advantages}</p>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <Title As='h4'>Недостатки</Title>
              <p className={styles.advText}>{product.disadvantages}</p>
            </div>
          )}
        </div>

        <Divider className={cn(styles.hr,styles.hr2)}/>

        <div className={styles.actions}>
          <Button className={styles.btn} appearance='primary'>Узнать подробнее</Button>
          <Button 
            className={styles.btn} 
            appearance='ghost' 
            arrow = {isReviewOpened ? 'down' : 'right'}
            onClick={() => setIsReviewOpened(!isReviewOpened)}
            aria-expanded={isReviewOpened}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <motion.div 
        className={styles.reviewWrap} 
        animate={isReviewOpened ? 'visible' : 'hidden'} 
        variants={variants} 
        initial='hidden'
      >
        <Card 
          ref={reviewRef} 
          color={ColorEnum.blue} 
          className={styles.reviews} 
          tabIndex={isReviewOpened ? 0 : -1}
        >
          {product.reviews.length > 0 && product.reviews.map(r => (
            <div key={r._id}>
              <Review review={r}/>
              <Divider/>
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </li>
  );
}));