import * as React from 'react';

import { routes } from './routes';
import Navigation from './navigation';

import AppLayout from '@cloudscape-design/components/app-layout';

const App = (): JSX.Element => {
  return <AppLayout
    contentType='default'
    toolsHide
    content={routes()}
    navigation={<Navigation/>}
  />
}

export default App;