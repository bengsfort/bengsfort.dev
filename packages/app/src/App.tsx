import type {FunctionalComponent} from 'preact';
import {CommonRouterProps, Route} from '@bengsfort.dev/router';
import 'modern-normalize';

import {ArticlesList, Article} from './pages/articles';
import {Portfolio}             from './pages/portfolio';
import {Resume}                from './pages/resume';
import {NotFound}              from './pages/not-found';
import {Routes}                from './routes';
import '@styles/app.variables.css';
import '@styles/app.global.css';

interface Props {
  routerComponent: FunctionalComponent<CommonRouterProps>;
  initialRoute: string;
}
export function App({routerComponent, initialRoute}: Props) {
  const Router = routerComponent;

  return (
    <Router url={initialRoute}>
      <Route path={Routes.Portfolio} isDefault>
        <Portfolio />
      </Route>
      <Route path={Routes.Resume}>
        <Resume />
      </Route>
      <Route path={Routes.ArticleList}>
        <ArticlesList />
      </Route>
      <Route path={Routes.Article}>
        <Article />
      </Route>
      <Route path={Routes.NotFound} isError>
        <NotFound />
      </Route>
    </Router>
  );
}
