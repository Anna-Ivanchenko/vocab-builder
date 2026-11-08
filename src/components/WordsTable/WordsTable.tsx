import { useMemo, type ReactNode } from "react";
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { Word } from "../../types/words";
import { capitalize } from "../../utils/capitalize";
import ProgressBar from "../ProgressBar/ProgressBar";
import css from "./WordsTable.module.css";

interface WordsTableProps {
  words: Word[];
  renderActions: (word: Word) => ReactNode;
  variant?: "dictionary" | "recommend";
}

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Word>();

const HeaderWithFlag = ({ title, flag }: { title: string; flag: string }) => (
  <span className={css.headerFlag}>
    {title}
    <img
      src={`/images/${flag}_flag_1x.webp`}
      srcSet={`/images/${flag}_flag_1x.webp 1x, /images/${flag}_flag_2x.webp 2x`}
      alt=""
      width={32}
      height={32}
      className={css.flag}
    />
  </span>
);

const WordsTable = ({
  words,
  renderActions,
  variant = "dictionary",
}: WordsTableProps) => {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("en", {
          header: () => <HeaderWithFlag title="Word" flag="england" />,
        }),
        columnHelper.accessor("ua", {
          header: () => <HeaderWithFlag title="Translation" flag="ukraine" />,
        }),
        columnHelper.accessor("category", {
          header: "Category",
          cell: (info) => capitalize(info.getValue()),
        }),
        ...(variant === "dictionary"
          ? [
              columnHelper.accessor("progress", {
                header: "Progress",
                cell: (info) => <ProgressBar value={info.getValue() ?? 0} />,
              }),
            ]
          : []),
        columnHelper.display({
          id: "actions",
          header: "",
          cell: (info) => renderActions(info.row.original),
        }),
      ]),
    [renderActions, variant],
  );

  const table = useTable({
    features,
    columns,
    data: words,
    getRowId: (word) => word._id,
  });

  return (
    <div className={`${css.wrapper} ${css[variant] ?? ""}`}>
      <table className={css.table}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className={css[header.column.id]}>
                  <table.FlexRender header={header} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id} className={css[cell.column.id]}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
