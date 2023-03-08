import { UiTableComponent } from './ui-table.component';
import { UiTablePageInterface } from './ui-table.page.interface';

export class UiTableApi {

    public page: UiTablePageInterface;
    private _component: UiTableComponent;

    constructor(_component: UiTableComponent) {
        this._component = _component;
        this.page = this._component._page;
    }

    setRows(rows: any) {
        this._component.setRows(rows);
    }

    setPage(page: UiTablePageInterface) {
        if(page.currentPage) {
            this._component._page.currentPage = page.currentPage;
        }
        if(page.totalPages) {
            this._component._page.totalPages = page.totalPages;
        }
        if(page.totalRows) {
            this._component._page.totalRows = page.totalRows;
        }
        if(page.totalFiltered) {
            this._component._page.totalFiltered = page.totalRows;
        }
        if(page.displayRow) {
            this._component._page.displayRow = page.displayRow;
        }

        const maxDisplayNumbers = 5;
        const totalRows = this._component._page.totalRows ?? 0;
        const totalPage = this._component._page.totalPages ?? 0;
        const currentPage = this._component._page.currentPage ?? 1;
        const displayRow = this._component._page.displayRow ?? 0;
        const indexEnd = ((currentPage-1)  * displayRow) + displayRow;
        const maxEnd = indexEnd > totalRows ? totalRows : indexEnd;

        this._component._indexStart = ((currentPage-1)  * displayRow) + 1;
        this._component._indexEnd = maxEnd;

        this._component._isFirstPage = currentPage <= 1;
        this._component._isLastPage = currentPage >= totalPage;

        const nextPage = currentPage + 1;
        const prevPage = currentPage - 1; 

        this._component._prevNumber = currentPage <= 1 ? 1:prevPage;
        this._component._nextNumber = nextPage > totalPage ? totalPage:nextPage;

        const pageNumbers = [];

        for( let x=currentPage, i=0; x>=1 && i<3; x--, i++) {
            pageNumbers.unshift(x);
        }

        const rightCount = maxDisplayNumbers-pageNumbers.length;

        for( let x=currentPage+1, i=0; x<=totalPage && i<rightCount; x++, i++) {
            pageNumbers.push(x);
        }

        const leftCount = maxDisplayNumbers-pageNumbers.length;
        const now = pageNumbers[0] ? (pageNumbers[0]-1):0;
        
        for( let x=now, i=0; x>=1 && i<leftCount; x--, i++ ) {
            pageNumbers.unshift(x);
        }

        this._component._pageNumbers = pageNumbers;
        this._component._page.currentPage = currentPage;

        this.page = this._component._page;

    }

    stateLoading() {
        this._component._isLoading = true;
    }

    stateFinish() {
        this._component._isLoading = false;
    }

}
