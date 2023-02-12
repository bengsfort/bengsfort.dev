import {FunctionComponent} from 'preact';
import 'modern-normalize';

import './style/app.variables.css';
import './style/app.global.css';
import styles from './App.module.css';

interface Props {
  target?: string;
}
export const App: FunctionComponent<Props> = ({target = `Client Rendered`}) => {
  return (
    <h1 className={styles.header}>Hello, {target}</h1>
  );
};
