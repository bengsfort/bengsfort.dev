import {FunctionComponent} from 'preact';
import 'modern-normalize';

import styles from './Portfolio.module.css';

import '../style/app.variables.css';
import '../style/app.global.css';
import {Page} from '../components';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Portfolio</h1>
    </Page>
  );
};
