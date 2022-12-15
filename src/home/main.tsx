import * as React from 'react';

import { routes } from './routes';

import AppLayout from '@cloudscape-design/components/app-layout';

import './styles.scss';

const App = (): JSX.Element => {
  return <AppLayout
    className='optcg-app'
    contentType='default'
    toolsHide
    navigationHide
    disableContentPaddings
    content={routes()}
  />
}

export default App;