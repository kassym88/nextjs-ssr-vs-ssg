import { ReactElement } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import useTranslation from 'next-translate/useTranslation';

const APP_NAME = 'next-pwa example';
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin';

function RenderElement() {
  const { lang } = useTranslation();

  return (
    <Html lang={lang} dir="ltr">
      <Head>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default class extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    return Document.getInitialProps(ctx);
  }

  render(): ReactElement {
    return <RenderElement />;
  }
}
