import {FunctionComponent} from 'preact';

import styles              from './Resume.module.css';

import {Page}              from '../../common/components';


interface Props {}
export const Resume: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Resume</h1>
    </Page>
  );
};
