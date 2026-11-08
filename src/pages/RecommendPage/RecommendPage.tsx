import { useCallback } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addWord, fetchAllWords } from "../../redux/words/operations";
import { setPage } from "../../redux/words/slice";
import {
  selectPage,
  selectTotalPages,
  selectWords,
} from "../../redux/words/selectors";
import type { Word } from "../../types/words";
import { useWords } from "../../hooks/useWords";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import AddToDictionaryBtn from "../../components/AddToDictionaryBtn/AddToDictionaryBtn";
import Pagination from "../../components/Pagination/Pagination";

const RecommendPage = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const words = useAppSelector(selectWords);
  const totalPages = useAppSelector(selectTotalPages);

  useWords(fetchAllWords);

  const handleAdd = useCallback(
    async (word: Word) => {
      try {
        await dispatch(addWord(word._id)).unwrap();
        toast.success(`"${word.en}" was added to your dictionary`);
      } catch (error) {
        toast.error(typeof error === "string" ? error : "Failed to add word");
      }
    },
    [dispatch],
  );

  const renderActions = useCallback(
    (word: Word) => <AddToDictionaryBtn onClick={() => handleAdd(word)} />,
    [handleAdd],
  );

  return (
    <div className="container">
      <Dashboard />
      <WordsTable
        words={words}
        renderActions={renderActions}
        variant="recommend"
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </div>
  );
};

export default RecommendPage;
