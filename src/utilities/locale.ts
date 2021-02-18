import { LOCALE_NAMESPACES } from '@constants';

export function addNamespacePrefix(
  label: string,
  namespace: string = LOCALE_NAMESPACES.COMMON,
): string {
  return `${namespace}:${label}`;
}
