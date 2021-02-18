import React, { memo } from 'react';
import Link, { LinkProps } from 'next/link';
import cn from 'classnames';

import { LinkKinds } from './constants';
import styles from './styled-link.module.scss';

interface StyledLinkType extends React.PropsWithChildren<LinkProps> {
  kind?: LinkKinds.PRIMARY | LinkKinds.SECONDARY;
  className?: string;
}

function StyledLink({
  kind = LinkKinds.PRIMARY,
  children,
  className,
  ...props
}: StyledLinkType): JSX.Element {
  return (
    <Link {...props}>
      <div className={cn(styles[kind], className)}>{children}</div>
    </Link>
  );
}

export const MemoizedLink = memo(StyledLink);
