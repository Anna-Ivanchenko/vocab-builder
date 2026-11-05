import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOwnWords } from "../../redux/words/operations";
import {
  selectFilters,
  selectPage,
  selectWords,
} from "../../redux/words/selectors";
import { buildWordsQuery } from "../../utils/buildWordsQuery";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";

// TODO: replace with <ActionsBtn word={word} /> (next step)
const renderActions = () => "...";

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);
  const words = useAppSelector(selectWords);

  useEffect(() => {
    dispatch(fetchOwnWords(buildWordsQuery(filters, page)));
  }, [dispatch, filters, page]);

  // TODO: open AddWordModal (step 7.9)
  const handleAddWord = () => {};

  return (
    <div className="container">
      <Dashboard onAddWord={handleAddWord} />
      <WordsTable words={words} renderActions={renderActions} />
    </div>
  );
};

export default DictionaryPage;
