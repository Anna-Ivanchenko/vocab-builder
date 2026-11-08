export type PageItem = number | "...";

export const getPageNumbers = (
  page: number,
  totalPages: number,
  visibleCount: number,
): PageItem[] => {
  if (totalPages <= visibleCount + 1) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.min(page, totalPages - visibleCount);
  const pages: PageItem[] = Array.from(
    { length: visibleCount },
    (_, index) => start + index,
  );
  const lastVisible = start + visibleCount - 1;

  if (lastVisible < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
};