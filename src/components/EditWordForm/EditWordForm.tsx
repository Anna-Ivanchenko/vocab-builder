import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import WordFields from "../WordFields/WordFields";
import FormActions from "../FormActions/FormActions";
import { useAppDispatch } from "../../redux/hooks";
import { editWord } from "../../redux/words/operations";
import { editWordSchema } from "../../utils/validation";
import type { EditWordFormValues, Word, WordBody } from "../../types/words";

interface EditWordFormProps {
  word: Word;
  onClose: () => void;
}

const EditWordForm = ({ word, onClose }: EditWordFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditWordFormValues>({
    resolver: yupResolver(editWordSchema),
    mode: "onTouched",
    defaultValues: { en: word.en, ua: word.ua },
  });

  const onSubmit = async ({ en, ua }: EditWordFormValues) => {
    const body: WordBody = { en, ua, category: word.category };
    if (word.category === "verb") body.isIrregular = word.isIrregular ?? false;

    try {
      await dispatch(editWord({ id: word._id, body })).unwrap();
      toast.success("Word updated");
      onClose();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to update word");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <WordFields
        ua={register("ua")}
        en={register("en")}
        errors={{ ua: errors.ua?.message, en: errors.en?.message }}
      />
      <FormActions
        submitText="Save"
        onCancel={onClose}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default EditWordForm;
