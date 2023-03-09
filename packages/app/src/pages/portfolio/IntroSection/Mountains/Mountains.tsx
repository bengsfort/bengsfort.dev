import classNames       from 'classnames';
import {ComponentProps} from 'preact';

import styles           from './Mountains.module.css';

export function Mountains({className, ...props}: ComponentProps<`svg`>) {
  return (
    <svg class={classNames(className as string, styles.svg)} width={`1856`} height={`764`} viewBox={`0 0 1856 764`} fill={`none`} xmlns={`http://www.w3.org/2000/svg`} {...props}>
      <path d={`M392 104C315 89 87 430 -86 543L-93 742L1856 764V361C1831.67 336.667 1775.2 282.2 1744 259C1705 230 1712 266 1684 272C1656 278 1471 159 1415 91C1359 23 1335 239 1290 205C1245 171 1164 497 1013 459C862 421 785 204 749 169C713 134 716 160 681 152C646 144 604 -3.99351e-06 546 0.999996C488 2 469 119 392 104Z`} fill={`url(#paint0_linear_16_15)`}/>
      <defs>
        <linearGradient id={`paint0_linear_16_15`} x1={`983`} y1={`256`} x2={`982`} y2={`96`} gradientUnits={`userSpaceOnUse`}>
          <stop class={styles.gradientStop} />
          <stop class={styles.gradientStart} offset={`1`} />
        </linearGradient>
      </defs>
    </svg>
  );
}
