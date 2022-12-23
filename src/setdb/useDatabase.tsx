import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IHomeState } from 'store';
import { addToDatabase } from 'store/databaseStore';
import { CollectionCard, DbCard, SetId } from './constants';
import CardFetcher from './fetchers/cardFetcher';
import LocalCardFetcher from './fetchers/localCardFetcher';

export const useDatabase = () => {
  const cardDatabase = useSelector((state: IHomeState) => state.database.data);
  const cardFetcher = useRef<CardFetcher>(new LocalCardFetcher())

  const [ cardDatabaseLoading, setCardDatabaseLoading ] = useState<boolean>(false);
  const [ loadingFlag, setLoadingFlag ] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards();
  }, []);

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

  const getDbCard = (collectionCard: CollectionCard): DbCard | undefined => {
    if (cardDatabase.hasOwnProperty(collectionCard.setId)) {
      return cardDatabase[collectionCard.setId].find(c => !!c && c.setNumber === collectionCard.setNumber);
    }
  }

  return { cardDatabase, cardDatabaseLoading, fetchNextCardBatch, getDbCard };
}