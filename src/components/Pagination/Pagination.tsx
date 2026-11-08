import Icon from "../Icon/Icon";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { getPageNumbers } from "../../utils/getPageNumbers";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const isTablet = useMediaQuery("(min-width: 768px)");

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages, isTablet ? 3 : 2);
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav className={css.pagination} aria-label="Pagination">
      <button
        type="button"
        className={css.item}
        onClick={() => onPageChange(1)}
        disabled={isFirst}
        aria-label="First page"
      >
        <Icon id="chevrons" size={16} />
      </button>
      <button
        type="button"
        className={css.item}
        onClick={() => onPageChange(page - 1)}
        disabled={isFirst}
        aria-label="Previous page"
      >
        <Icon id="chevron" size={16} />
      </button>

      {pages.map((item, index) =>
        item === "..." ? (
          <span key={`dots-${index}`} className={css.item}>
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`${css.item} ${item === page ? css.active : ""}`}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={css.item}
        onClick={() => onPageChange(page + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <Icon id="chevron" size={16} className={css.flip} />
      </button>
      <button
        type="button"
        className={css.item}
        onClick={() => onPageChange(totalPages)}
        disabled={isLast}
        aria-label="Last page"
      >
        <Icon id="chevrons" size={16} className={css.flip} />
      </button>
    </nav>
  );
};

export default Pagination;
