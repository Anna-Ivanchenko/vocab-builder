import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteWord, fetchOwnWords } from "../../redux/words/operations";
import { setPage } from "../../redux/words/slice";
import {
  selectPage,
  selectWords,
  selectTotalPages,
} from "../../redux/words/selectors";
import type { Word } from "../../types/words";
import { useWords } from "../../hooks/useWords";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import ActionsBtn from "../../components/ActionsBtn/ActionsBtn";
import EditWordModal from "../../components/EditWordModal/EditWordModal";
import AddWordModal from "../../components/AddWordModal/AddWordModal";
import Pagination from "../../components/Pagination/Pagination";

const DictionaryPage = () => {
  const totalPages = useAppSelector(selectTotalPages);
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const words = useAppSelector(selectWords);
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const refetchWords = useWords(fetchOwnWords);

  const handleDelete = useCallback(
    async (word: Word) => {
      try {
        await dispatch(deleteWord(word._id)).unwrap();
        toast.success(`"${word.en}" was deleted`);

        if (words.length === 1 && page > 1) {
          dispatch(setPage(page - 1));
        } else {
          refetchWords();
        }
      } catch (error) {
        toast.error(typeof error === "string" ? error : "Failed to delete");
      }
    },
    [dispatch, words.length, page, refetchWords],
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
  const handleOpenAdd = () => setIsAddOpen(true);
  const handleCloseAdd = useCallback(() => setIsAddOpen(false), []);

  return (
    <div className="container">
      <Dashboard onAddWord={handleOpenAdd} />
      <WordsTable words={words} renderActions={renderActions} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
      {editingWord && (
        <EditWordModal word={editingWord} onClose={handleCloseEdit} />
      )}

      {isAddOpen && (
        <AddWordModal onClose={handleCloseAdd} onSuccess={refetchWords} />
      )}
    </div>
  );
};

export default DictionaryPage;
