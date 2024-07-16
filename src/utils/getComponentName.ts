import { ComponentType } from 'react';

export default function getComponentName(component: ComponentType) {
  return component.displayName || component.name || 'Component';
}
