import cn from 'classnames';
import { ISortProps, SortEnum } from "./Sort.props";
import styles from './Sort.module.css';
import SortIcon from './sort.svg';

export const Sort = ({ sort = SortEnum.Rating, setSort, className, ...props }: ISortProps) => {
  return (
    <div className={cn(styles.sort, className)} { ...props }>
      <div id="sort" className={styles.sortName}>Сортировка</div>
      <button 
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({ [styles.active]: sort ===  SortEnum.Rating})}
        aria-selected={sort ===  SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу 
      </button>
      <button 
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        className={cn({ [styles.active]: sort ===  SortEnum.Price})}
        aria-selected={sort ===  SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};