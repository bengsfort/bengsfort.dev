import {FunctionComponent} from 'preact';
import 'modern-normalize';

import './style/app.variables.css';
import './style/app.global.css';
import styles from './App.module.css';
import {Page} from './components';

interface Props {
  target?: string;
}
export const App: FunctionComponent<Props> = ({target = `Client Rendered`}) => {
  return (
    <Page>
      <h1 className={styles.header}>Hello, {target}</h1>
    </Page>
  );
};
