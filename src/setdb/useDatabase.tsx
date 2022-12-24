import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IHomeState } from 'store';
import { addToDatabase } from 'store/databaseStore';
import { ArtVariant, CollectionCard, DbCard, SetId } from './constants';
import CardFetcher from './fetchers/cardFetcher';
import LocalCardFetcher from './fetchers/localCardFetcher';

export const useDatabase = () => {
  const cardDatabase = useSelector((state: IHomeState) => state.database.data);
  const cardFetcher = useRef<CardFetcher>(new LocalCardFetcher())

  const [ cardDatabaseLoading, setCardDatabaseLoading ] = useState<boolean>(false);
  const [ loadingFlag, setLoadingFlag ] = useState<boolean>(false);
  const [ artistList, setArtistList ] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
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
    if (cardDatabase.hasOwnProperty(collectionCard.setId)) {
      const _dbCard = cardDatabase[collectionCard.setId].find(c => !!c && c.setNumber === collectionCard.setNumber);
      const dbCard = JSON.parse(JSON.stringify(_dbCard)) as DbCard;
      if (!useSpecifics || !dbCard) {
        return dbCard;
      }
      const hasArtVariantField = collectionCard.hasOwnProperty('artVariant');
      const artVariant: ArtVariant = hasArtVariantField ? (collectionCard.artVariant) || 0 : -1;
      const artVariantIndex = dbCard.artVariants && dbCard.artVariants.length ? dbCard.artVariants.findIndex(v => v === artVariant) : -1;
      if (hasArtVariantField) {
        dbCard.artVariant = collectionCard.artVariant;
      }
      dbCard.artist = dbCard.artists!![artVariantIndex + 1];
      delete dbCard.artVariants;
      delete dbCard.artists;
      return dbCard;
    }
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

  return { cardDatabase, cardDatabaseLoading, artistList, fetchNextCardBatch, getDbCard };
}