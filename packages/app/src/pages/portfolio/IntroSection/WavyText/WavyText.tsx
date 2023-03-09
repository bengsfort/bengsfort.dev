import classNames from 'classnames';

import styles     from './WavyText.module.css';

interface Props {
  className?: string;
  text: string;
}
export function WavyText({className, text}: Props) {
  return (
    <div class={classNames(className, styles.textWrapper)} role={`presentation`}>
      {text.split(``).map((char, index) => (
        <span class={styles.letter} key={index} style={{[`--letter-delay`]: `${index * 125}ms`}}>{char}</span>
      ))}
    </div>
  );
}
