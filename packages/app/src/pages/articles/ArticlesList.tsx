import {FunctionComponent} from 'preact';

import styles              from './ArticlesList.module.css';

import {Page}              from '@layout/Page';


interface Props {}
export const ArticlesList: FunctionComponent<Props> = () => {
  return (
    <Page>
      <h1 className={styles.header}>Articles</h1>
    </Page>
  );
};
