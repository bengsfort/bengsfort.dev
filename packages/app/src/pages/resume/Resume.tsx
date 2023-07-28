import {FunctionComponent} from 'preact';

import styles              from './Resume.module.css';

import {Page}              from '@layout/Page';


interface Props {}
export const Resume: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Resume</h1>
    </Page>
  );
};
