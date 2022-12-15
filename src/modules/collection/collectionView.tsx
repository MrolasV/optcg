import * as React from 'react';
import { useState } from 'react';
import { useDatabase } from 'setdb/useDatabase';

import CollectionManagerContainer from './collectionManagerContainer';
import { Collection } from './constants';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import SpaceBetween from '@cloudscape-design/components/space-between';
import CardSearchModule from 'modules/cardSearch/cardSearchModule';

import './styles.scss';

const CollectionView = (): JSX.Element => {
  const { cardDatabase, cardDatabaseLoading } = useDatabase();
  const [ workingCollecion, setWorkingCollection ] = useState<Collection>();

  const cardDatabaseAsList = Object.values(cardDatabase).reduce((acc, cardDatabaseSet) => {
    return [...acc, ...(cardDatabaseSet.filter(dbCard => !!dbCard))];
  }, []);

  const renderContent = (): JSX.Element => {
    return <SpaceBetween size='m' className='collection_content'>
      <CollectionManagerContainer/>
      <ExpandableSection
        variant='container'
        header={<Header variant='h2'>
          Card database (Raw)
        </Header>}
      >
        <Box variant='code'>
          <pre style={{whiteSpace: 'pre-wrap'}}>
            {JSON.stringify(cardDatabase, null, 2)}
          </pre>
        </Box>
      </ExpandableSection>
    </SpaceBetween>
  }

  return <ContentLayout
    className='collection_content-layout'
    header={<Header variant='h1' className='collection_content-header'>
      Collection manager
    </Header>}
  >
    <div className='collection_content-wrapper card-search-filter_target'>
      {renderContent()}
      <CardSearchModule
        cardPool={cardDatabaseAsList.map(dbCard => {
          return {
            card: dbCard,
            quantity: 1,
          }
        })}
        displayQuantity={false}
      />
    </div>
  </ContentLayout>
}

export default CollectionView;