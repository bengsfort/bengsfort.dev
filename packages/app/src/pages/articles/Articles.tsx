import {FunctionComponent} from 'preact';

import styles              from './Articles.module.css';

import {Page}              from '../../common/components';


interface Props {}
export const Articles: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Articles</h1>
    </Page>
  );
};
