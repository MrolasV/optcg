import * as React from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { Page } from './page';

import CollectionView from 'modules/collection/collectionView';
import BuilderView from 'modules/builder/builderView';

export const routes = (): JSX.Element => {
  return <div className='route-wrapper'><Routes>
    <Route path={Page.collection} element={<CollectionView/>} />
    <Route path={Page.builder} element={<BuilderView/>} />
    <Route path="*" element={<Navigate to={Page.collection} replace />} />
  </Routes></div>
}