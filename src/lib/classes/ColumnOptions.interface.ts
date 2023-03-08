import { ColumnType } from "./ColumnType.enum";

export interface ColumnOptions {
    field?: string;
    type?: ColumnType;
    display?: string;
    width?: string;
}