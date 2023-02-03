import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { IFirstLevelMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

export const firstLevelMenu: IFirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const priceRu = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');
};

export const declOfNum = (number: number, titles: [string, string, string]): string => {  
  number = Math.abs(number) % 100; 
  if (number > 10 && number < 20) return titles[2];
  if (number % 10 > 1 && number % 10 < 5) return titles[1];
  if (number % 10 == 1) return titles[0]; 
  return titles[2];
};