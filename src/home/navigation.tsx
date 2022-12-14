import * as React from 'react';
import { useLocation } from 'react-router';

import { Page } from './page';

import SideNavigation from '@cloudscape-design/components/side-navigation';

const Navigation = (): JSX.Element => {
  const location = useLocation();

  return <SideNavigation
    activeHref={!!location.pathname ? `#${location.pathname}` : `#/${Page.collection}`}
    header={{
      href: `#/${Page.collection}`,
      text: 'HEADER'
    }}
    items={[
      { type: 'link', text: 'Collections', href: `#/${Page.collection}`},
      { type: 'link', text: 'Deck builder', href: `#/${Page.builder}`},
    ]}
  />
}

export default Navigation;