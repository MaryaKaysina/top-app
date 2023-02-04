import { GetStaticProps } from 'next';
import { Text, Title } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import styles from './app.module.css';
import { firstLevelMenu } from '../helpers/helper';
import Link from 'next/link';

function Home() {
  return (
    <>
      <Title className={styles.title}>Лучшие курсы онлайн</Title>
      <Text size='sm' className={styles.text}>Подборки лучших курсов и рейтинги, основанные на реальных отзывах.</Text>
      <ul className={styles.list}>
      {firstLevelMenu.map(item => (
        <li key={item.id} className={styles.item}>
          <span className={styles.itemIcon}>{item.icon}</span>
          <span className={styles.itemName}>{item.name}</span>
          <span className={styles.itemLink}>
            <Link href={`/${item.route}`} legacyBehavior>Показать все курсы</Link>
          </span>
        </li>
      ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

interface IHomeProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: number;
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios
    .post<IMenuItem[]>(API.topPage.find, { firstCategory });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};
