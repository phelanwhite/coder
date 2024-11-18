export type TaskType = {
  _id: string;
  title: string;
  files?: string[];
  description?: string;

  column: string;
};
export type ColumnType = {
  _id: string;
  title: string;
};
export type BoardType = {
  _id: string;
  title: string;
  favorite: boolean;
};
export type ItemActiveType = {
  type: "column" | "task";
  data: ColumnType | TaskType | null;
} | null;
