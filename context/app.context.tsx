import { createContext, PropsWithChildren, useState } from "react";
import { IMenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";

export interface IAppContext {
  menu: IMenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: IMenuItem[]) => void;
}

const INIT_APP_CONTEXT: IAppContext = {
  menu: [],
  firstCategory: TopLevelCategory.Courses
};

export const AppContext = createContext<IAppContext>(INIT_APP_CONTEXT);

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>) => {
    const [menuState, setMenuState] = useState<IMenuItem[]>(menu);

    const setMenu = (newMenu: IMenuItem[]) => {
      setMenuState(newMenu);
    };

    return (
      <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
        { children }
      </AppContext.Provider>
    );
};