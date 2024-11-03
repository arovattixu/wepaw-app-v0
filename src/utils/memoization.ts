import { memo, ComponentType } from 'react';

export function createMemoizedComponent<T extends object>(
  Component: ComponentType<T>,
  propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean
) {
  return memo(Component, propsAreEqual);
}