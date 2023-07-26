import {FunctionComponent} from 'preact';

import {Page}              from '../../layout';

import {IntroSection}      from './IntroSection';
import {WebSection}        from './WebSection';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page hasNoPadding>
      <IntroSection />
      <WebSection />
    </Page>
  );
};
