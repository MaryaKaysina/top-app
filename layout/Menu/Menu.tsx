import cn from 'classnames';
import styles from './Menu.module.css';
import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { IFirstLevelMenuItem, IPageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helper';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = () => {
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : {
        when: 'afterChildren',
        staggerChildren: 0.1
      }
    },
    hidden: { marginBottom: 0 }
  };

  const variantsChildren = {
    visible: { opacity: 1, height: "100%" },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: "0" }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code !== 'Space' && key.code !== 'Enter') return;
    key.preventDefault();
    openSecondLevel(secondCategory);
  };

  const buildFirstLevel = () => {
    return (
      <ul>
        {firstLevelMenu.map(m => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`} legacyBehavior>
              <a>
                <div className={cn(
                  styles.firstLevel, 
                  { [styles.firstLevelActive]: m.id === firstCategory }
                )}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(submenu => {
          if (submenu.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            submenu.isOpened = true;
          }
          return (
            <li key={submenu._id.secondCategory}>
              <button 
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, submenu._id.secondCategory)}
                className={styles.secondLevel} 
                onClick={() => openSecondLevel(submenu._id.secondCategory)}
                aria-expanded={submenu.isOpened}
              >
                {submenu._id.secondCategory}
              </button>
              <motion.ul 
                layout
                variants={variants}
                initial={submenu.isOpened ? 'visible' : 'hidden'}
                animate={submenu.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(submenu.pages, menuItem.route, submenu.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: IPageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(p => (
        <motion.li key={p._id} variants={variantsChildren}>
          <Link href={`/${route}/${p.alias}`} legacyBehavior>
            <a 
              tabIndex={isOpened ? 0 : -1}
              className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
              })}
              aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
            >
              {p.category}
            </a>
          </Link>
        </motion.li>
      ))
    );
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && (
        <span className='visualyHidden' role='log'>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};