import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { Collection } from './constants';
import { capitalizeFirst, debugTiming, getLocalStorageItem } from 'modules/common/util';
import { CardSort, CardSortDirection, CardSortOrderBy, lsCollectionKey, lsCollectionListKey, lsWorkingCollectionNameKey } from 'modules/common/constants';
import { TooltipWrapper } from 'react-tooltip';
import { collectionToLocalCollection, localCollectionToCollection, localListPush, localListRemove } from './util';
import { DbCard } from 'setdb/constants';
import { saveAs } from 'file-saver';

import Container from '@cloudscape-design/components/container';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown, { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

interface CollectionManagerContainerProps {
  workingCollection: Collection;
  collectionSort: CardSort;
  setWorkingCollectionName: (name: string) => void;
  onCollectionLoad: (collection: Collection) => void;
  onSortChange: (cardSort: CardSort) => void;
}

const CollectionManagerContainer = (props: CollectionManagerContainerProps): JSX.Element => {
  const { workingCollection, collectionSort, setWorkingCollectionName, onCollectionLoad, onSortChange } = props;

  const [ deletionId, setDeletionId ] = useState<string>('');
  const [ showEmptyNameWarning, setShowEmptyNameWarning ] = useState<boolean>(false);
  const [ rerender, setRerender ] = useState<boolean>(false);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!workingCollection.name && showEmptyNameWarning) {
      setShowEmptyNameWarning(false);
    }
  }, [workingCollection.name])

  const orderByOptions: SelectProps.Option[] = Object.keys(CardSortOrderBy).filter(v => isNaN(Number(v))).map(orderBy => {
    return {
      label: capitalizeFirst(orderBy),
      value: orderBy,
    }
  });
  const selectedOrderByOption: SelectProps.Option = 
    orderByOptions.find(option => Object(CardSortOrderBy)[option.value || 'DEFAULT'] as CardSortOrderBy === collectionSort.orderBy) || {};

  const directionOptions: SelectProps.Option[] = Object.keys(CardSortDirection).filter(v => isNaN(Number(v))).map(order => {
    return {
      label: order,
      value: order,
    }
  });
  const selectedDirectionOption: SelectProps.Option = 
    directionOptions.find(option => Object(CardSortDirection)[option.value || 'DESC'] as CardSortDirection === collectionSort.direction) || {};

  const getLocalCollectionItems = (): ButtonDropdownProps.Item[] => {
    const lsCollectionList: string[] = getLocalStorageItem<string[]>(lsCollectionListKey) || [];
    return lsCollectionList.map(cn => {
      return {
        text: cn,
        id: cn
      }
    });
  }
  const localCollectionItems: ButtonDropdownProps.Item[] = getLocalCollectionItems();

  const onClear = () => {
    onCollectionLoad({
      name: '',
      inventory: []
    })
  }

  const onSaveAction = () => {
    if (!workingCollection.name) {
      setShowEmptyNameWarning(true);
      return;
    }
    localStorage.setItem(lsCollectionKey(workingCollection.name), collectionToLocalCollection(workingCollection));
    localListPush(lsCollectionListKey, workingCollection.name);
    setRerender(!rerender);
  }

  const onLoadAction = (actionId: string) => {
    const localCollection: string = getLocalStorageItem<string>(lsCollectionKey(actionId)) || '';
    const collection = localCollectionToCollection(actionId, localCollection);
    onCollectionLoad(collection);
  }

  const onDeleteAction = (actionId: string) => {
    setDeletionId(actionId);
  }

  const onDelete = () => {
    localStorage.removeItem(lsCollectionKey(deletionId));
    localListRemove(lsCollectionListKey, deletionId);
    setDeletionId('');
  }

  const onExport = () => {
    const collectionString = collectionToLocalCollection(workingCollection);
    const saveString = `c${collectionString}`;
    const blob = new Blob([saveString], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${workingCollection.name}.opgc`);
  }

  const onImportClick = () => {
    importRef.current?.click();
  }

  const onImport = (event: any) => {
    const p1 = performance.now();
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const p2 = performance.now();
      const fileText = fileReader.result as string;
      if (!fileText || fileText[0] !== 'c') {
        console.error(`File "${file.name}" is corrupted`);
        return;
      }
      const collectionString = fileText.slice(1);
      const collectionName = file.name.substring(0, file.name.length - 5);
      const collection = localCollectionToCollection(collectionName, collectionString);
      onCollectionLoad(collection);
      const p3 = performance.now();
      debugTiming('Import time', [p1, p2, p3]);
    }
    fileReader.readAsText(file);
  }

  const renderEmptyNameWarning = (): JSX.Element => {
    return <TooltipWrapper place='right' content='Empty names not allowed' >
      <Icon name='status-warning' variant='warning' />
    </TooltipWrapper>
  }

  return <Container>
    <div className='collection-manager'>
      <div className='collection-manager_lhs'>
        <div className='collection-manager_name-field'>
          <span><strong>Collection name:</strong></span> 
          <Input value={workingCollection.name} onChange={({detail}) => setWorkingCollectionName(detail.value)} />
          {showEmptyNameWarning && renderEmptyNameWarning()}
        </div>
        <div className='collection-manager_local-actions'>
          <Popover
            dismissButton={false}
            position='top'
            size='small'
            triggerType='custom'
            content={
              <StatusIndicator type='success' >
                Collection saved
              </StatusIndicator>
            }
          >
            <Button onClick={onSaveAction}>Save</Button>
          </Popover>
          <ButtonDropdown
            items={localCollectionItems}
            onItemClick={({detail}) => onLoadAction(detail.id)}
            disabled={!localCollectionItems.length}
          >Load</ButtonDropdown>
          <ButtonDropdown
            items={getLocalCollectionItems()} 
            onItemClick={({detail}) => onDeleteAction(detail.id)}
            disabled={!localCollectionItems.length}
          >Delete</ButtonDropdown>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
      <div className='collection-manager_rhs'>
        <div>
          <div>
            <Button onClick={onImportClick}>Import</Button>
            <input type='file' onChange={onImport} ref={importRef} accept='.opgc' />
          </div>
          <Button onClick={onExport}>Export</Button>
        </div>
        <div className='collection-manager_sort-wrapper'>
          <Box padding={{top: 'xs'}} >Sort by</Box>
          <Select
            selectedOption={selectedOrderByOption}
            options={orderByOptions}
            onChange={({ detail }) => onSortChange({
              orderBy: Object(CardSortOrderBy)[detail.selectedOption.value || 'DEFAULT'], 
              direction: collectionSort.direction
            })}
          />
          <Select
            selectedOption={selectedDirectionOption}
            options={directionOptions}
            onChange={({ detail }) => onSortChange({
              orderBy: collectionSort.orderBy,
              direction: Object(CardSortDirection)[detail.selectedOption.value || 'DESC']
            })}
          />
        </div>
      </div>
    </div>
    <Modal
      onDismiss={() => setDeletionId('')}
      visible={!!deletionId}
      header='Delete collection'
      footer={<Box float='right'>
        <SpaceBetween direction='horizontal' size='xs'>
          <Button variant='link' onClick={() => setDeletionId('')}>Cancel</Button>
          <Button variant='primary' onClick={onDelete}>Delete</Button>
        </SpaceBetween>
      </Box>}
    >
      {`Are you sure you want to delete collection "${deletionId}"?`}
    </Modal>
  </Container>
}

export default CollectionManagerContainer;