import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router'

interface LankLinkProps {
  lang: string;
  langLabel: ReactNode;
}

function LangLink({ lang, langLabel }: LankLinkProps): ReactElement {
  const router = useRouter();

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(router.asPath, undefined, {locale: lang});
  };

  return (
    <button type="button" onClick={handleClick}>{langLabel}</button>
  );
}

export default LangLink;
