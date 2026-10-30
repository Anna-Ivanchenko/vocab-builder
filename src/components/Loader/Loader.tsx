import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.backdrop} role="status" aria-label="Loading">
      <span className={css.spinner} />
    </div>
  );
};

export default Loader;
