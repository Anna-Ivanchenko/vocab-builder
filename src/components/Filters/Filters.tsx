import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCategories } from "../../redux/words/operations";
import { setFilters } from "../../redux/words/slice";
import { selectCategories, selectFilters } from "../../redux/words/selectors";
import { useDebounce } from "../../hooks/useDebounce";
import { capitalize } from "../../utils/capitalize";
import Select from "../Select/Select";
import Icon from "../Icon/Icon";
import css from "./Filters.module.css";

const ALL_CATEGORIES = "all";

const verbTypes = [
  { label: "Regular", isIrregular: false },
  { label: "Irregular", isIrregular: true },
];

const Filters = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { keyword, category, isIrregular } = useAppSelector(selectFilters);

  const [search, setSearch] = useState(keyword);
  const debouncedSearch = useDebounce(search.trim());

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (debouncedSearch !== keyword) {
      dispatch(setFilters({ keyword: debouncedSearch }));
    }
  }, [dispatch, debouncedSearch, keyword]);

  const options = [
    { value: ALL_CATEGORIES, label: "All" },
    ...categories.map((item) => ({ value: item, label: capitalize(item) })),
  ];

  const handleCategoryChange = (value: string) => {
    dispatch(
      setFilters({
        category: value === ALL_CATEGORIES ? "" : value,
        isIrregular: false,
      }),
    );
  };

  return (
    <div className={css.filters}>
      <label className={css.searchWrapper}>
        <input
          type="text"
          className={css.search}
          placeholder="Find the word"
          aria-label="Find the word"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Icon id="search" className={css.searchIcon} />
      </label>

      <Select
        className={css.select}
        options={options}
        value={category}
        onChange={handleCategoryChange}
        placeholder="Categories"
      />

      {category === "verb" && (
        <div className={css.radios} role="radiogroup" aria-label="Verb type">
          {verbTypes.map((type) => (
            <label key={type.label} className={css.radio}>
              <input
                type="radio"
                name="verbType"
                className={css.radioInput}
                checked={isIrregular === type.isIrregular}
                onChange={() =>
                  dispatch(setFilters({ isIrregular: type.isIrregular }))
                }
              />
              <span className={css.radioMark} />
              {type.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
