import Link from 'next/link';

import { StyledLink } from '@components/styled-link';
import { LinkKinds } from '@components/styled-link/constants';
import { LangLink } from '@components/lang-link';

import styles from './header.module.scss';
import Logo from '../../../public/logo.svg';

function Header(): JSX.Element {
  return (
    <>
      <nav className={styles.header}>
        <Link href="/">
          <a href="/">
            <Logo width={206} height={80} />
          </a>
        </Link>
        <div className={styles.links}>
          <Link href="/ssg-catalog">
            <span className={styles.link}>
              <b>SSG</b>
            </span>
          </Link>
          <div className={styles.links}>
            <Link href="/">
            <span className={styles.link}>
              <b>SSR</b>
            </span>
            </Link>
          </div>
        </div>
        <div className={styles.auth}>
          <StyledLink
            className={styles.authButton}
            kind={LinkKinds.SECONDARY}
            href="/login"
          >
            Login
          </StyledLink>
          <StyledLink className={styles.authButton} href="/sign-up">
            Sign Up
          </StyledLink>
        </div>
      </nav>
      <div className={styles.language}>
        <LangLink langLabel="English" lang="en" />
        <LangLink langLabel="Russian" lang="ru" />
      </div>
    </>
  );
}

export default Header;
