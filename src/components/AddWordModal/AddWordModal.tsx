import Modal from "../Modal/Modal";
import AddWordForm from "../AddWordForm/AddWordForm";
import css from "./AddWordModal.module.css";

interface AddWordModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddWordModal = ({ onClose, onSuccess }: AddWordModalProps) => (
  <Modal onClose={onClose} className={css.modal}>
    <h2 className={css.title}>Add word</h2>
    <p className={css.text}>
      Adding a new word to the dictionary is an important step in enriching the
      language base and expanding the vocabulary.
    </p>
    <AddWordForm onClose={onClose} onSuccess={onSuccess} />
  </Modal>
);

export default AddWordModal;
