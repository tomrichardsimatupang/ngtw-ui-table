import { Column } from "./classes/Column";

export interface UiTableDataSourceInterface {
    columns: Array<Column>;
    data?: Array<any>;
    pagination?: boolean;
}
