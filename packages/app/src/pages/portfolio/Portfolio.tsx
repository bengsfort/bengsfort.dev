import {FunctionComponent} from 'preact';

import {Page}              from '../../layout';

import {IntroSection}      from './IntroSection';
import {TechSection}       from './TechSection';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page hasNoPadding>
      <IntroSection />
      <TechSection />
    </Page>
  );
};
