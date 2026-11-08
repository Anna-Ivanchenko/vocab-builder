import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchOwnWords } from "../redux/words/operations";
import { selectFilters, selectPage } from "../redux/words/selectors";
import { buildWordsQuery } from "../utils/buildWordsQuery";

type FetchWords = typeof fetchOwnWords;

export const useWords = (fetchWords: FetchWords) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);

  const refetchWords = useCallback(() => {
    dispatch(fetchWords(buildWordsQuery(filters, page)));
  }, [dispatch, fetchWords, filters, page]);

  useEffect(() => {
    refetchWords();
  }, [refetchWords]);

  return refetchWords;
};