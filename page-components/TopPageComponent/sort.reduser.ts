import { SortEnum } from "../../components/Sort/Sort.props";
import { IProductModel } from "../../interfaces/product.interface";

export type SortActions = { type: SortEnum.Price } 
  | { type: SortEnum.Rating }
  | { type: 'reset', initialState: IProductModel[] }
;

export interface ISortReducerState {
  sort: SortEnum;
  products: IProductModel[];
}

export const SortReducer = (state: ISortReducerState, action: SortActions) => {
  switch(action.type) {
    case SortEnum.Rating: 
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a,b) => b.initialRating - a.initialRating)
      };
    case SortEnum.Price: 
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a,b) => b.price - a.price)
      };
    case 'reset': 
      return {
        sort: SortEnum.Rating,
        products: action.initialState.sort((a,b) => b.initialRating - a.initialRating)
      };
    default: 
      throw new Error('Неверный тип сортировки');
  }
};