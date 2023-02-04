import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helper';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';
import styles  from './type.module.css';
import { Title, Text } from '../../components';
import { Error404 } from '../404';
import Link from 'next/link';

function Type({ firstCategory, menu, firstCategoryName, firstCategoryRoute }: ITypeProps) {

  console.log(firstCategoryName);
  console.log(menu);
  console.log(firstCategory);

  if (!menu || !firstCategoryName) {
    return <Error404/>;
  }

  return (
    <>
      <Title className={styles.title}>{firstCategoryName}</Title>
      <Text size='sm' className={styles.text}>Подборки лучших курсов и рейтинги, основанные на реальных отзывах.</Text>
      <ul className={styles.list}>
      {menu.map(item => (
        <li key={item._id.secondCategory} className={styles.item}>
          <span className={styles.itemName}>{item._id.secondCategory}</span>
          <div className={styles.linksBlock}>
            {item.pages.map(page => (
              <span key={page._id} className={styles.itemLink}>
                <Link href={`/${firstCategoryRoute}/${page.alias}`}legacyBehavior>
                  {page.title}
                </Link>
              </span> 
            ))}
          </div>
        </li>
      ))}
      </ul>
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => '/' + m.route),
    fallback: true,
  };
};

interface ITypeProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: number;
  firstCategoryName: string;
  firstCategoryRoute: string;
}

export const getStaticProps: GetStaticProps<ITypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios
    .post<IMenuItem[]>(API.topPage.find, { firstCategory: firstCategoryItem.id });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
      firstCategoryName: firstCategoryItem.name,
      firstCategoryRoute: firstCategoryItem.route,
    }
  };
};
