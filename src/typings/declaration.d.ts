declare module '*.svg' {
  import { ReactComponent } from 'react';

  const content: ReactComponent;
  export default content;
}

declare module 'lodash/get' {
  type PathElement = string | number;
  const get: <TReturn>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from: any,
    path: PathElement | Array<PathElement>,
    defaultValue?: TReturn,
  ) => TReturn;
  export = get;
}
