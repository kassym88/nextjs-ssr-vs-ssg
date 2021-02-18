import { ReactElement } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { LOCALE_NAMESPACES } from '../../constants';

import styles from './footer.module.scss';

const BLOCK_NAME = 'footer';

function Footer(): ReactElement {
  const { t } = useTranslation(LOCALE_NAMESPACES.COMMON);

  return <div className={styles[BLOCK_NAME]}>{t('footer-title')}</div>;
}

export default Footer;
