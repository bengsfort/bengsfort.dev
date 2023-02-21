import {FunctionComponent} from 'preact';

import styles              from './Portfolio.module.css';

import {Page}              from '../../common/components';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Portfolio</h1>
    </Page>
  );
};
