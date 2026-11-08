import { useId } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAppDispatch } from "../../redux/hooks";
import { editWord } from "../../redux/words/operations";
import { editWordSchema } from "../../utils/validation";
import type { EditWordFormValues, Word, WordBody } from "../../types/words";
import css from "./EditWordForm.module.css";

interface EditWordFormProps {
  word: Word;
  onClose: () => void;
}

const EditWordForm = ({ word, onClose }: EditWordFormProps) => {
  const dispatch = useAppDispatch();
  const uaId = useId();
  const enId = useId();

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
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.fields}>
        <div className={css.field}>
          <label htmlFor={uaId} className={css.label}>
            <img
              src="/images/ukraine_flag_1x.webp"
              srcSet="/images/ukraine_flag_1x.webp 1x, /images/ukraine_flag_2x.webp 2x"
              alt=""
              width={32}
              height={32}
              className={css.flag}
            />
            Ukrainian
          </label>
          <Input
            id={uaId}
            variant="inverse"
            className={css.input}
            error={errors.ua?.message}
            {...register("ua")}
          />
        </div>

        <div className={css.field}>
          <label htmlFor={enId} className={css.label}>
            <img
              src="/images/england_flag_1x.webp"
              srcSet="/images/england_flag_1x.webp 1x, /images/england_flag_2x.webp 2x"
              alt=""
              width={32}
              height={32}
              className={css.flag}
            />
            English
          </label>
          <Input
            id={enId}
            variant="inverse"
            className={css.input}
            error={errors.en?.message}
            {...register("en")}
          />
        </div>
      </div>

      <div className={css.buttons}>
        <Button
          type="submit"
          variant="light"
          className={css.button}
          disabled={isSubmitting}
        >
          Save
        </Button>
        <Button variant="ghost" className={css.button} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditWordForm;
