import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Select from "../Select/Select";
import VerbTypeRadios from "../VerbTypeRadios/VerbTypeRadios";
import WordFields from "../WordFields/WordFields";
import FormActions from "../FormActions/FormActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createWord } from "../../redux/words/operations";
import { selectCategories } from "../../redux/words/selectors";
import { addWordSchema } from "../../utils/validation";
import { capitalize } from "../../utils/capitalize";
import type { AddWordFormValues, WordBody } from "../../types/words";
import css from "./AddWordForm.module.css";

interface AddWordFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddWordForm = ({ onClose, onSuccess }: AddWordFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const options = categories.map((item) => ({
    value: item,
    label: capitalize(item),
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddWordFormValues>({
    resolver: yupResolver(addWordSchema),
    mode: "onTouched",
    defaultValues: { category: "", isIrregular: false, en: "", ua: "" },
  });

  const category = useWatch({ control, name: "category" });
  const isIrregular = useWatch({ control, name: "isIrregular" });
  const isVerb = category === "verb";

  const onSubmit = async ({
    en,
    ua,
    category,
    isIrregular,
  }: AddWordFormValues) => {
    const body: WordBody = { en, ua, category };
    if (category === "verb") body.isIrregular = isIrregular;

    try {
      await dispatch(createWord(body)).unwrap();
      toast.success(`"${en}" was added`);
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to add word");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.category}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              variant="inverse"
              className={css.select}
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder="Categories"
            />
          )}
        />
        {errors.category && (
          <p className={css.error}>{errors.category.message}</p>
        )}

        {isVerb && (
          <Controller
            name="isIrregular"
            control={control}
            render={({ field }) => (
              <VerbTypeRadios
                variant="inverse"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}

        {isVerb && isIrregular && (
          <p className={css.hint}>
            Such data must be entered in the format I form-II form-III form.
          </p>
        )}
      </div>

      <WordFields
        ua={register("ua")}
        en={register("en")}
        errors={{ ua: errors.ua?.message, en: errors.en?.message }}
      />

      <FormActions
        submitText="Add"
        onCancel={onClose}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default AddWordForm;
