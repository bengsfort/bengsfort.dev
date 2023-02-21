import type {FunctionalComponent} from 'preact';
import {CommonRouterProps, Route} from '@bengsfort.dev/router';
import 'modern-normalize';

import {Articles}  from './pages/articles/index.js';
import {Portfolio} from './pages/portfolio/index.js';
import {Resume}    from './pages/resume/index.js';
import './common/style/app.variables.css';
import './common/style/app.global.css';

interface Props {
  routerComponent: FunctionalComponent<CommonRouterProps>;
  initialRoute: string;
}
export function App({routerComponent, initialRoute}: Props) {
  const Router = routerComponent;

  return (
    <Router url={initialRoute}>
      <Route path={`/`} isDefault>
        <Portfolio />
      </Route>
      <Route path={`/cv`}>
        <Resume />
      </Route>
      <Route path={`/articles`}>
        <Articles />
      </Route>
      <Route path={`/articles/:id`}>
        <h1>Article!</h1>
      </Route>
      <Route path={`/404`} isError>
        <h1>404</h1>
      </Route>
    </Router>
  );
}
