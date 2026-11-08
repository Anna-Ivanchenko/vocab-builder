import Modal from "../Modal/Modal";
import EditWordForm from "../EditWordForm/EditWordForm";
import type { Word } from "../../types/words";

interface EditWordModalProps {
  word: Word;
  onClose: () => void;
}

const EditWordModal = ({ word, onClose }: EditWordModalProps) => (
  <Modal onClose={onClose}>
    <EditWordForm word={word} onClose={onClose} />
  </Modal>
);

export default EditWordModal;
