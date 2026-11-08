import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteWord, fetchOwnWords } from "../../redux/words/operations";
import { setPage } from "../../redux/words/slice";
import {
  selectFilters,
  selectPage,
  selectWords,
} from "../../redux/words/selectors";
import type { Word } from "../../types/words";
import { buildWordsQuery } from "../../utils/buildWordsQuery";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import ActionsBtn from "../../components/ActionsBtn/ActionsBtn";
import EditWordModal from "../../components/EditWordModal/EditWordModal";

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const page = useAppSelector(selectPage);
  const words = useAppSelector(selectWords);
  const [editingWord, setEditingWord] = useState<Word | null>(null);

  useEffect(() => {
    dispatch(fetchOwnWords(buildWordsQuery(filters, page)));
  }, [dispatch, filters, page]);

  // TODO: open AddWordModal
  const handleAddWord = () => {};

  const handleDelete = useCallback(
    async (word: Word) => {
      try {
        await dispatch(deleteWord(word._id)).unwrap();
        toast.success(`"${word.en}" was deleted`);

        if (words.length === 1 && page > 1) {
          dispatch(setPage(page - 1));
        } else {
          dispatch(fetchOwnWords(buildWordsQuery(filters, page)));
        }
      } catch (error) {
        toast.error(typeof error === "string" ? error : "Failed to delete");
      }
    },
    [dispatch, words.length, page, filters],
  );

  const renderActions = useCallback(
    (word: Word) => (
      <ActionsBtn
        onEdit={() => setEditingWord(word)}
        onDelete={() => handleDelete(word)}
      />
    ),
    [handleDelete],
  );

  const handleCloseEdit = useCallback(() => setEditingWord(null), []);

  return (
    <div className="container">
      <Dashboard onAddWord={handleAddWord} />
      <WordsTable words={words} renderActions={renderActions} />

      {editingWord && (
        <EditWordModal word={editingWord} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default DictionaryPage;
