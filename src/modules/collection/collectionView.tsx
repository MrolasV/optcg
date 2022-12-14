import * as React from 'react';
import { useDatabase } from 'setdb/useDatabase';

import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import ExpandableSection from '@cloudscape-design/components/expandable-section';

const CollectionView = (): JSX.Element => {
  const { cardDatabase, cardDatabaseLoading } = useDatabase();

  console.log('test');

  return <ContentLayout
    header={<Header variant='h1'>
      Collection manager
    </Header>}
  >
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
  </ContentLayout>
}

export default CollectionView;