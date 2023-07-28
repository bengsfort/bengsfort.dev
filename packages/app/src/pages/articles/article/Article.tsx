import {FunctionComponent} from 'preact';

import styles              from './Article.module.css';

import {Page}              from '@layout/Page';

import {useRouteParams}    from '@bengsfort.dev/router';


interface Params {
  id: string;
}

interface Props {}
export const Article: FunctionComponent<Props> = () => {
  const params = useRouteParams<Params>();

  return (
    <Page>
      <h1 className={styles.header}>Article: {params.id}</h1>
    </Page>
  );
};
