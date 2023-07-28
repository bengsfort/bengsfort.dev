import {ComponentChildren} from 'preact';

import styles              from './FlyoutLabels.module.css';

interface Props {
  labels: Array<string>;
  children: ComponentChildren;
}
export function FlyoutLabels({labels, children}: Props) {
  return (
    <strong class={styles.flyout}>
      {children}
      <ul class={styles.labelList} aria-hidden={`true`}>
        {labels.map(label => <li class={styles.label}>{label}</li>)}
      </ul>
    </strong>
  );
}
