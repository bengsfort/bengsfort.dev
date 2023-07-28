import {FunctionComponent} from 'preact';
import {Page}              from '@layout/Page';

import {IntroSection}      from './IntroSection';
import {WebSection}        from './WebSection';
import {AppSection}        from './AppSection';
import {GamesSection}      from './GamesSection';
import {ContactSection}    from './ContactSection';


interface Props {}
export const Portfolio: FunctionComponent<Props> = () => {
  return (
    <Page hasNoPadding>
      <IntroSection />
      <WebSection />
      <AppSection />
      <GamesSection />
      <ContactSection />
    </Page>
  );
};
