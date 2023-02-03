import cn from 'classnames';
import { ISearchProps } from './Search.props';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import SearchIcon from './search.svg';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';

export const Search = ({ className,...props }: ISearchProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  
  const classList = cn(styles.search,className);

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') goToSearch();
  };

  return (
    <form className={classList} { ...props } role='search'>
      <Input 
        className={styles.input}
        placeholder='Поиск...' 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        appearance='primary' 
        arrow = 'none' 
        className={styles.btn}
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <SearchIcon/>
      </Button>
    </form>
  );
};