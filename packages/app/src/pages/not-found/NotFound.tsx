import {FunctionComponent} from 'preact';

import styles              from './NotFound.module.css';

import {Page}              from '../../common/components';


interface Props {}
export const NotFound: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>404</h1>
    </Page>
  );
};
