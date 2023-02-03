import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helper';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';

function Type({ firstCategory }: ITypeProps) {
  return (
    <>
      <p>Type: {firstCategory}</p>
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
      firstCategory: firstCategoryItem.id
    }
  };
};
