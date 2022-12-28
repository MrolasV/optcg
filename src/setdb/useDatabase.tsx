import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { singletonHook } from 'react-singleton-hook';
import { IHomeState } from 'store';
import { addToDatabase } from 'store/databaseStore';
import { ArtVariant, CollectionCard, DbCard, SetId } from './constants';
import CardFetcher from './fetchers/cardFetcher';
import LocalCardFetcher from './fetchers/localCardFetcher';

type DbCardLookupTable = {
  [setId: number]: {
    [setNumber: number]: {
      [artVariant: number]: DbCard
    }
  }
}

const useDatabaseImpl = () => {
  const cardDatabase = useSelector((state: IHomeState) => state.database.data);
  const cardFetcher = useRef<CardFetcher>(new LocalCardFetcher())

  const [ cardDatabaseLoading, setCardDatabaseLoading ] = useState<boolean>(false);
  const [ loadingFlag, setLoadingFlag ] = useState<boolean>(false);
  const [ artistList, setArtistList ] = useState<string[]>([]);
  const [ cardLookupTable, setCardLookupTable ] = useState<DbCardLookupTable>({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    buildLookupTable();
    extractArtistList();
  }, [cardDatabase]);

  useEffect(() => {
    if (!loadingFlag && cardDatabase) {
      setCardDatabaseLoading(false);
    }
  }, [ cardDatabase, loadingFlag ])

  const fetchCards = () => {
    fetchNextCardBatch();
  }

  const fetchNextCardBatch = () => {
    setCardDatabaseLoading(true);
    setLoadingFlag(true);
    cardFetcher.current.fetchCardBatch()
      .then((cardBatch) => {
        setLoadingFlag(false);
        dispatch(addToDatabase({
          cards: cardBatch,
        }))
      })
      .catch((error) => {
        console.log(error);
        setLoadingFlag(false);
        setCardDatabaseLoading(false);
      });
  }

  const getDbCard = (collectionCard: CollectionCard, useSpecifics?: boolean): DbCard | undefined => {
    const variantIndex = useSpecifics ? (collectionCard.hasOwnProperty('artVariant') ? (collectionCard.artVariant || 0) + 1 : 0) : -1;
    if (cardLookupTable.hasOwnProperty(collectionCard.setId)) {
      if (cardLookupTable[collectionCard.setId].hasOwnProperty(collectionCard.setNumber)) {
        if (cardLookupTable[collectionCard.setId][collectionCard.setNumber].hasOwnProperty(variantIndex)) {
          return cardLookupTable[collectionCard.setId][collectionCard.setNumber][variantIndex];
        }
      }
    }
    return undefined;
  }

  const buildLookupTable = () => {
    const lookupTable: DbCardLookupTable = {};
    Object.entries(cardDatabase).forEach(([setId_s, set]) => {
      const setId = Number(setId_s);
      const cardSet: { [setNumber: number]: { [artVariant: number]: DbCard } } = {};
      set.forEach(dbCard => {
        const setNumber = dbCard.setNumber;
        cardSet[setNumber] = {};
        cardSet[setNumber][-1] = dbCard;
        const baseCard = {...dbCard};
        baseCard.artist = dbCard.artists && dbCard.artists.length ? dbCard.artists[0] : '';
        baseCard.imgObj = dbCard.imgObjs && dbCard.imgObjs.length ? dbCard.imgObjs[0] : '';
        delete baseCard.artVariants;
        delete baseCard.artists;
        delete baseCard.imgObjs;
        cardSet[setNumber][0] = baseCard;
        if (dbCard.artVariants) {
          dbCard.artVariants.forEach((artVariant, index) => {
            const artist = dbCard.artists && dbCard.artists.length > index + 1 ? dbCard.artists[index + 1] : '';
            const imgObj = dbCard.imgObjs && dbCard.imgObjs.length > index + 1 ? dbCard.imgObjs[index + 1] : '';
            cardSet[setNumber][artVariant + 1] = {
              ...baseCard,
              artVariant,
              artist,
              imgObj,
            };
          });
        }
      });
      lookupTable[setId] = cardSet;
    });
    setCardLookupTable(lookupTable);
  }

  const extractArtistList = () => {
    const artistSet = new Set<string>();
    Object.values(cardDatabase).forEach(cardSet => {
      cardSet.forEach(card => {
        if (!card.artists) {
          return;
        }
        card.artists.forEach(artist => {
          artistSet.add(artist);
        });
      });
    });
    artistSet.delete('Manga');
    artistSet.delete('Anime');
    const _artistList = Array.from(artistSet).sort();
    _artistList.unshift('Manga', 'Anime');
    setArtistList(_artistList);
  }

  return { cardDatabase, cardLookupTable, cardDatabaseLoading, artistList, fetchNextCardBatch, getDbCard };
}

export const useDatabase = singletonHook({
  cardDatabase: {},
  cardLookupTable: {},
  cardDatabaseLoading: false,
  artistList: [],
  fetchNextCardBatch: () => {},
  getDbCard: (collectionCard: CollectionCard, useSpecifics?: boolean) => undefined
}, useDatabaseImpl);

export interface IWithDatabaseHOCProps {
  cardDatabase: {[setId: string]: DbCard[]};
  cardLookupTable: DbCardLookupTable;
  cardDatabaseLoading: boolean;
  artistList: string[];
  fetchNextCardBatch: () => void;
  getDbCard: (collectionCard: CollectionCard, useSpecifics?: boolean) => DbCard | undefined;
}

export const withDatabaseHOC = (C: any) => {
  return (props: any) => {
    const {
      cardDatabase,
      cardLookupTable,
      cardDatabaseLoading,
      artistList,
      fetchNextCardBatch,
      getDbCard,
    } = useDatabase();
    return <C
      cardDatabase={cardDatabase}
      cardLookupTable={cardLookupTable}
      cardDatabaseLoading={cardDatabaseLoading}
      artistList={artistList}
      fetchNextCardBatch={fetchNextCardBatch}
      getDbCard={getDbCard}
    />
  }
}