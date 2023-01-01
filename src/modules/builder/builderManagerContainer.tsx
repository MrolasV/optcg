import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { TooltipWrapper } from 'react-tooltip';
import { debugTiming, getLocalStorageItem } from 'modules/common/util';
import { Deck } from './constants';
import { lsDeckKey, lsDeckListKey } from 'modules/common/constants';
import { deckToLocalCollection, deckToTTSString, deckToTTS2String, deckToUntapString, getMainDeckSize, localCollectionToDeck } from './util';
import { localListPush, localListRemove } from 'modules/collection/util';
import { useDatabase } from 'setdb/useDatabase';
import { saveAs } from 'file-saver';
import BuilderTestHandModal from './builderTestHandModal';

import Container from '@cloudscape-design/components/container';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown, { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

interface BuilderManagerContainerProps {
  workingDeck: Deck;
  setWorkingDeckName: (name: string) => void;
  onDeckLoad: (deck: Deck) => void;
}

const BuilderManagerContainer = (props: BuilderManagerContainerProps): JSX.Element => {
  const { workingDeck, setWorkingDeckName, onDeckLoad } = props;
  
  const { getDbCard } = useDatabase();

  const [ deletionId, setDeletionId ] = useState<string>('');
  const [ showEmptyNameWarning, setShowEmptyNameWarning ] = useState<boolean>(false);
  const [ showTestHandModal, setShowTestHandModal ] = useState<boolean>(false);
  const [ rerender, setRerender ] = useState<boolean>(false);
  const importRef = useRef<HTMLInputElement>(null);

  const getLocalDeckItems = (): ButtonDropdownProps.Item[] => {
    const lsCollectionList: string[] = getLocalStorageItem<string[]>(lsDeckListKey) || [];
    return lsCollectionList.map(cn => {
      return {
        text: cn,
        id: cn
      }
    });
  }
  const localDeckItems: ButtonDropdownProps.Item[] = getLocalDeckItems();

  const onClear = () => {
    onDeckLoad({
      name: '',
      mainCards: [],
    })
  }

  const onSaveAction = () => {
    if (!workingDeck.name) {
      setShowEmptyNameWarning(true);
      return;
    }
    localStorage.setItem(lsDeckKey(workingDeck.name), deckToLocalCollection(workingDeck));
    localListPush(lsDeckListKey, workingDeck.name);
    setRerender(!rerender);
  }

  const onLoadAction = (actionId: string) => {
    const localCollection: string = getLocalStorageItem<string>(lsDeckKey(actionId)) || '';
    const deck = localCollectionToDeck(actionId, localCollection);
    onDeckLoad(deck);
  }

  const onDeleteAction = (actionId: string) => {
    setDeletionId(actionId);
  }

  const onDelete = () => {
    localStorage.removeItem(lsDeckKey(deletionId));
    localListRemove(lsDeckListKey, deletionId);
    setDeletionId('');
  }

  const exportItems: ButtonDropdownProps.Item[] = [
    { text: 'To file', id: 'file' },
    { text: 'To clipboard (TTS)', id: 'tts'},
    { text: 'To clipboard (TTS2)', id: 'tts2' },
    { text: 'To clipboard (untap)', id: 'untap'}
  ]

  const onExportAction = (exportId: string) => {
    switch (exportId) {
      case 'file': exportToFile(); break;
      case 'tts': exportToClipboard(deckToTTSString(workingDeck)); break;
      case 'tts2': exportToClipboard(deckToTTS2String(workingDeck, getDbCard)); break;
      case 'untap': exportToClipboard(deckToUntapString(workingDeck, getDbCard)); break;
    }
  }

  const exportToFile = () => {
    const collectionString = deckToLocalCollection(workingDeck);
    const saveString = `d${collectionString}`;
    const blob = new Blob([saveString], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${workingDeck.name}.opgd`);
  }

  const exportToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      alert('Copied deck to clipboard');
    }, 100)
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
      if (!fileText || fileText[0] !== 'd') {
        console.error(`File "${file.name}" is corrupted`);
        return;
      }
      const collectionString = fileText.slice(1);
      const deckName = file.name.substring(0, file.name.length - 5);
      const deck = localCollectionToDeck(deckName, collectionString);
      onDeckLoad(deck);
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
    <div className='builder-manager'>
      <div className='builder-manager_lhs'>
        <div className='builder-manager_name-field'>
          <span><strong>Deck name:</strong></span>
          <Input value={workingDeck.name} onChange={({detail}) => setWorkingDeckName(detail.value)} />
          {showEmptyNameWarning && renderEmptyNameWarning()}
        </div>
        <div className='builder-manager_local-actions'>
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
            items={localDeckItems}
            onItemClick={({detail}) => onLoadAction(detail.id)}
            disabled={!localDeckItems.length}
          >Load</ButtonDropdown>
          <ButtonDropdown
            items={localDeckItems} 
            onItemClick={({detail}) => onDeleteAction(detail.id)}
            disabled={!localDeckItems.length}
          >Delete</ButtonDropdown>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </div>
      <div className='builder-manager_rhs'>
        <div>
          <div>
            <Button onClick={onImportClick}>Import</Button>
            <input type='file' onChange={onImport} ref={importRef} accept='.opgd' />
          </div>
          <ButtonDropdown
            items={exportItems}
            onItemClick={({detail}) => onExportAction(detail.id)}
          >Export</ButtonDropdown>
        </div>
        <div>
          <Button
            disabled={getMainDeckSize(workingDeck) < 6} 
            onClick={() => setShowTestHandModal(true)}
          >Test hand</Button>
        </div>
      </div>
    </div>
    <Modal
      onDismiss={() => setDeletionId('')}
      visible={!!deletionId}
      header='Delete deck'
      footer={<Box float='right'>
        <SpaceBetween direction='horizontal' size='xs'>
          <Button variant='link' onClick={() => setDeletionId('')}>Cancel</Button>
          <Button variant='primary' onClick={onDelete}>Delete</Button>
        </SpaceBetween>
      </Box>}
    >
      {`Are you sure you want to delete deck "${deletionId}"?`}
    </Modal>
    <BuilderTestHandModal
      workingDeck={workingDeck}
      visible={showTestHandModal}
      onDismiss={() => setShowTestHandModal(false)}
    />
  </Container>
}

export default BuilderManagerContainer;