import {FunctionComponent} from 'preact';

import styles              from './App.module.css';

interface Props {
  target?: string;
}
export const App: FunctionComponent<Props> = ({target}) => {
  return (
    <h1 className={styles.header}>Hello, {target}</h1>
  );
};


// export function App({target = `world`}: Props): FunctionComponent<Props> {
//   return (
//   );
// }
