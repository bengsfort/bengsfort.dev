import {FunctionComponent} from 'preact';

import {Page}              from '../../common/components';

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
