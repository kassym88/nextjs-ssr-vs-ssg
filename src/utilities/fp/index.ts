export function takeNthArg<ReturnType>(n: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]): ReturnType => args[n] as ReturnType;
}