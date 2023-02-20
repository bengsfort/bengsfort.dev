import {FunctionComponent} from 'preact';
import 'modern-normalize';

import styles from './Resume.module.css';

import '../style/app.variables.css';
import '../style/app.global.css';
import {Page} from '../components';


interface Props {}
export const Resume: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Resume</h1>
    </Page>
  );
};
