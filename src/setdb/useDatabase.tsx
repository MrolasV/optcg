import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IHomeState } from 'store';
import { addToDatabase } from 'store/databaseStore';
import CardFetcher from './fetchers/cardFetcher';
import LocalCardFetcher from './fetchers/localCardFetcher';

export const useDatabase = () => {
  const cardDatabase = useSelector((state: IHomeState) => state.database.data);
  const cardFetcher = useRef<CardFetcher>(new LocalCardFetcher())

  const [ cardDatabaseLoading, setCardDatabaseLoading ] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    fetchNextCardBatch();
  }

  const fetchNextCardBatch = () => {
    setCardDatabaseLoading(true);
    console.log('fetchNextCardBatch');
    cardFetcher.current.fetchCardBatch()
      .then((cardBatch) => {
        console.log(cardBatch);
        setCardDatabaseLoading(false);
        dispatch(addToDatabase({
          cards: cardBatch,
        }))
      })
      .catch((error) => {
        console.log(error);
        setCardDatabaseLoading(false);
      });
  }

  return { cardDatabase, cardDatabaseLoading, fetchNextCardBatch };
}