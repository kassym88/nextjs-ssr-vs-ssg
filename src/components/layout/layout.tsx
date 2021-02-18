import { ReactNode, ReactElement } from 'react';

import { Header } from '../header';
import { Footer } from '../footer';

import styles from './layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const BLOCK_NAME = 'layout';

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className={styles[BLOCK_NAME]}>
      <div className={styles[`${BLOCK_NAME}__upper-content`]}>
        <Header />
        <main className={styles[`${BLOCK_NAME}__main`]}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
