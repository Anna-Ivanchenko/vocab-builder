import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOwnWords } from "../../redux/words/operations";
import { selectFilters, selectPage } from "../../redux/words/selectors";
import { buildWordsQuery } from "../../utils/buildWordsQuery";
import Dashboard from "../../components/Dashboard/Dashboard";

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);

  useEffect(() => {
    dispatch(fetchOwnWords(buildWordsQuery(filters, page)));
  }, [dispatch, filters, page]);

  // TODO: open AddWordModal (step 7.9)
  const handleAddWord = () => {};

  return (
    <div className="container">
      <Dashboard onAddWord={handleAddWord} />
    </div>
  );
};

export default DictionaryPage;
