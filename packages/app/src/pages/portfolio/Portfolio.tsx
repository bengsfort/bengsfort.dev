import {FunctionComponent} from 'preact';

import {Page}              from '../../common/components';

import {IntroSection}      from './IntroSection';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page hasNoPadding>
      <IntroSection />
    </Page>
  );
};
