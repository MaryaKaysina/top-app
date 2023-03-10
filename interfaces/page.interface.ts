export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export interface ITopPageAdvantage {
  title: string;
  description: string;
  _id: string;
}

export interface IHhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  _id: string;
}

export interface ITopPageModel {
  _id: string;
  tags: string[];
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  seoText?: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstCategory: TopLevelCategory;
  advantages?: ITopPageAdvantage[];
  createdAt: Date;
  updatedAt: Date;
  hh?: IHhData;
}
