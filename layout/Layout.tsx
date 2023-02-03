import cn from 'classnames';
import { ILayoutProps } from "./Layout.props";
import styles from './Layout.module.css';
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { FunctionComponent, KeyboardEvent, useRef, useState } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";

const Layout = ({ children }: ILayoutProps) => {
  const [isSkipLinkDisplay, setIsSkipLinkDisplay] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplay(false);
  };

  return (
    <div className={styles.wrapper}>
      <a 
        tabIndex={1} 
        className={cn(styles.skipLink, { [styles.displayed] : isSkipLinkDisplay })}
        onFocus={() => setIsSkipLinkDisplay(true)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main' >
        { children }
      </main>
      <Footer className={styles.footer}/>
      <Up/>
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T) {
    return (
      <AppContextProvider menu={ props.menu } firstCategory={ props.firstCategory }>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};