import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Input, Rating, Tag, Text, Textarea, Title } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { IMenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu, firstCategory }: IHomeProps) {
  const [rating, setRating] = useState<number>(4);
  const [counter, setCounter] = useState<number>(0);

  console.log(menu);
  console.log(firstCategory);
  return (
    <>
      <Title>Курсы по Photoshop</Title>
      <br/>
      <Title>{ counter }</Title>
      <br/>
      <Button appearance='primary' onClick={() => setCounter(count => count + 1)}>
        Узнать подробнее
      </Button>
      <Button appearance='primary' arrow = 'right'>Читать отзывы</Button>
      <Button appearance='ghost' arrow = 'down'>Читать отзывы</Button>
      <div style={ {height: "20px"} }></div>
      <Text size='sm'>Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и ими можно успешно пользоваться дома или в дороге. Современные ноутбуки хорошо справляются с нагрузкой, так зачем загонять специалиста в душный офис. В этой профессии важным считается вдохновение, поэтому дизайнеры ищут его в разных местах.</Text>
      <br/>
      <Tag color='gray'>10</Tag>
      <Tag color='ghost' size='sm'>Дизайн</Tag>
      <Tag color='green' size='sm'>-10 000 ₽</Tag>
      <Tag color='red' href='https://hh.ru'>hh.ru</Tag>
      <Tag color='primary' size='sm'>Работа в Photoshop</Tag>
      <div style={ {height: "20px"} }></div>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <div style={ {height: "20px"} }></div>
      <Input placeholder='Имя'/>
      <div style={ {height: "20px"} }></div>
      <Textarea placeholder='Текст отзыва'/>
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
