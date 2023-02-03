/* eslint-disable @typescript-eslint/no-empty-function */
import { ITopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Advantages, HhData, Product, Sort, Tag, Title } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { useEffect, useReducer } from 'react';
import { SortReducer } from './sort.reduser';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, products, firstCategory }: ITopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
    SortReducer, { products, sort: SortEnum.Rating }
  );
  const shouldReduceMotion = useReducedMotion();

  const handleSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  useEffect(() => {
    dispathSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Title>{page.title}</Title>
        {products && (
          <Tag color='gray' aria-label={products.length + ' элементов'}>{products.length}</Tag>
        )}
        <Sort sort={sort} setSort={handleSort}/>
      </div>

      <ul className={styles.products}>
        {sortedProducts && sortedProducts.map(p => (
          <Product layout={shouldReduceMotion ? false : true} product={p} key={p._id} />
        ))}
      </ul>

      <div className={styles.hhTitle}>
        <Title As='h2'>Вакансии - {page.category}</Title>
        <Tag color='red' href='https://hh.ru'>hh.ru</Tag>
      </div>

      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <div className={styles.hhdata}>
          <HhData {...page.hh}/>
        </div>
      )}

      {page.advantages && page.advantages.length > 0 && (
        <div className={styles.advantages}>
          <Title As='h2'>Преимущества</Title>
          <Advantages advantages={page.advantages}/>
        </div>
      )}

      {page.seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{__html: page.seoText}} />}

      <div className={styles.tags}>
        <Title As='h2'>Получаемые навыки</Title>
        {page.tags.map(tag => (
          <Tag className={styles.tag} key={tag} color='primary' size='sm'>{tag}</Tag>
        ))}
      </div>
    </div>
  );
};