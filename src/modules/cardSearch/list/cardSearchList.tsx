import * as React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const CardSearchList = (): JSX.Element => {
  //@ts-ignore
  const renderListItem = ({ index, style }) => (
    <div style={style}>Row {index}</div>
  )

  return <div className='scroller-wrapper'>
    <AutoSizer disableWidth>
      {({height}) =>
        <List
          height={height}
          itemCount={20}
          itemSize={50}
          width={100}
        >
          {renderListItem}
        </List>
      }
    </AutoSizer>
  </div>
}

export default CardSearchList;