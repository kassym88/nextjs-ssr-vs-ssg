import { ReactElement } from 'react';
import times from 'lodash/times';
import useTranslation from 'next-translate/useTranslation';

import { LOCALE_NAMESPACES } from '../constants';
import { addNamespacePrefix } from '../utilities/locale';

function PageWithLocale(): ReactElement {
  const { t } = useTranslation(LOCALE_NAMESPACES.LOCALE_TESTING_PAGE);

  return (
    <div>
      <h1>{t(addNamespacePrefix('welcome-message'))}</h1>
      <h2>{t('message-from-locale-testing-page')}</h2>
      {times(10, (i) => (
        <p key={i}>{t('plural-test', { count: i })}</p>
      ))}
      <p>{t('plural-test', { count: 21 })}</p>
    </div>
  );
}

// export async function getStaticProps() {
//   return {}
// }

export default PageWithLocale;
