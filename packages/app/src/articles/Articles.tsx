import {FunctionComponent} from 'preact';
import 'modern-normalize';

import styles from './Articles.module.css';

import '../style/app.variables.css';
import '../style/app.global.css';
import {Page} from '../components';


interface Props {}
export const Articles: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Articles</h1>
    </Page>
  );
};
