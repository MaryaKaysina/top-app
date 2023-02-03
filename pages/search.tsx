import { GetStaticProps } from 'next';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Search() {
  return (
    <>
      <p>Search</p>
    </>
  );
}

export default withLayout(Search);

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
