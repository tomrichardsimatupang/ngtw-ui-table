import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { Column } from './classes/Column';
import { ColumnType } from './classes/ColumnType.enum';
import { UiTableColDirective } from './directives/ui-table-col.directive';
import { UiTableHeadDirective } from './directives/ui-table-head.directive';
import { UiTableApi } from './ui-table.api';
import { UiTableModel } from './ui-table.model';
import { UiTablePageInterface } from './ui-table.page.interface';

@Component({
  selector: 'ui-table',
  template: `
    <div class="block relative min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table style="max-height: 400px;" class="ui-table">
        <thead>
          <th *ngFor="let col of _columns" class="ui-table-th" [ngClass]="cellClass(col)">
            <div>
              <ng-container *ngIf="_isUseHeadTemplate(col.key)">
                <ng-content *ngTemplateOutlet="_headTemplates[col.key]"></ng-content>
              </ng-container>
              <ng-container *ngIf="!_isUseHeadTemplate(col.key)">
                {{ col.display() }}
              </ng-container>
            </div>
          </th>
        </thead>
        <tbody class="bg-white">
          <ng-container *ngIf="!_isLoading && (_rows.length > 0); else _isLoading?loadingState:emptyState">
            <tr *ngFor="let data of _rows; let i=index">
              <ng-container *ngFor="let col of _columns">
                <td class="ui-table-td" [ngClass]="cellClass(col)">
                  <div [ngStyle]="cellStyle(col)">
                    <ng-container *ngIf="_isUseColumnTemplate(col.key)">
                      <ng-content  *ngTemplateOutlet="_columnTemplates[col.key]; context: {$implicit:_addIndex(data, i)}"></ng-content>
                    </ng-container>
                    <ng-container *ngIf="!_isUseColumnTemplate(col.key)">
                      {{ _displayData(_addIndex(data, i), col) }}
                    </ng-container>
                  </div>
                </td>
              </ng-container>
            </tr>
          </ng-container>
          <ng-template #emptyState>
            <tr class="empty-state-tr">
              <td class="empty-state-td" [attr.colspan]="_columns.length">
                <div class="flex p-8">
                  <div class="empty-state">
                    <div class="flex flex-col justify-center items-center">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                        </svg>
                      </div>
                      <div class="text-sm m-1">No data</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template #loadingState>
            <tr class="loading-state-tr">
              <td class="loading-state-td"> 
                <div class="flex p-8">
                  <div class="loading-state">
                    <div class="flex flex-col justify-center item-center">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="200px" height="120px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                          <circle cx="84" cy="50" r="10" fill="#4b0082">
                            <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                            <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#4b0082;#ce91fb;#943ad6;#701eac;#4b0082" begin="0s"></animate>
                          </circle><circle cx="16" cy="50" r="10" fill="#4b0082">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                          </circle><circle cx="50" cy="50" r="10" fill="#701eac">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.25s"></animate>
                          </circle><circle cx="84" cy="50" r="10" fill="#943ad6">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.5s"></animate>
                          </circle><circle cx="16" cy="50" r="10" fill="#ce91fb">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                          </circle>
                        </svg>
                      </div>
                      <div class="text-sm m-1 text-center">Loading...</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </ng-template>
        </tbody>
      </table>
      <div class="ui-table-pagination" *ngIf="_pagination">
        <div class="ui-table-pagination-info">Showing <span class="font-bold">{{_indexStart}}</span> to <span class="font-bold">{{_indexEnd}}</span> of <span class="font-bold">{{ _page.totalRows }}</span> Entries</div>
        <div class="ui-table-pagination-control">
          <div class="ui-table-pagination-button-group">
            <button class="ui-table-pagination-button-prev" (click)="_onPageChanges(_prevNumber)" [disabled]="_isFirstPage">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button class="ui-table-pagination-button-number" *ngFor="let pageNumber of _pageNumbers" [ngClass]="{'active':isActivePage(pageNumber)}" (click)="_onPageChanges(pageNumber)">{{ pageNumber }}</button>
            <button class="ui-table-pagination-button-next" (click)="_onPageChanges(_nextNumber)" [disabled]="_isLastPage">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./ui-table.component.css"]
})
export class UiTableComponent implements OnInit, AfterContentInit {

  @ContentChildren(UiTableColDirective) columnTemplates: QueryList<UiTableColDirective>;
  @ContentChildren(UiTableHeadDirective) headTemplates: QueryList<UiTableHeadDirective>;

  _columns: Array<Column> = [];
  _rows: any = [];
  _columnTemplates: { [key: string]: TemplateRef<any> } = {};
  _headTemplates: { [key: string]: TemplateRef<any> } = {};
  _api: UiTableApi;
  _model: UiTableModel | undefined;
  _pagination: boolean = true;
  _page: UiTablePageInterface = {
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
    totalFiltered: 0,
    displayRow: 10
  }
  _isLoading: boolean = false;
  _isLastPage: boolean = false;
  _isFirstPage: boolean = false;
  _pageNumbers: Array<number> = [];
  _indexStart: number = 0;
  _indexEnd: number = 0;
  _prevNumber: number = 1;
  _nextNumber: number = 1;

  constructor() {
    this.columnTemplates = new QueryList<UiTableColDirective>();
    this.headTemplates = new QueryList<UiTableHeadDirective>();
    this._api = new UiTableApi(this);
  }

  @Input() set model( value: UiTableModel) {
    this._model = value;
    this.dataSource = value.dataSource;
    this._model.ready(this._api);
  }

  @Input() set dataSource( value: any ) {
    this._columns = value.columns;
    this._pagination = typeof value.pagination === 'boolean' ? value.pagination:this._pagination;
    this.setRows(value.data);
  };

  @Input() set rows( value: any ) {
    this._rows = value;
  }

  @Output() ready = new EventEmitter<UiTableApi>();

  @Output() onPageChanges = new EventEmitter<number>();

  ngAfterContentInit() {
    this._columnTemplates = this.columnTemplates.reduce((accumulator: any, currentValue: UiTableColDirective) => {
      accumulator[currentValue.uiTableCol] = currentValue.template;
      return accumulator;
    }, {});
    this._headTemplates = this.headTemplates.reduce((accumulator: any, currentValue: UiTableHeadDirective) => {
      accumulator[currentValue.uiTableHead] = currentValue.template;
      return accumulator;
    }, {});
  }

  ngOnInit(): void {
    this._ready();
  }

  private _ready() {
    this.ready.emit(this._api);
  }

  _getLocale() {
    return navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  }

  _addIndex(data: any, i: number) {
    data['$index'] = i;
    return data;
  }

  _isUseHeadTemplate(key: string): boolean {
    return !(!this._headTemplates[key]);
  }

  _isUseColumnTemplate(key: string): boolean {
    return !(!this._columnTemplates[key]);
  }

  _displayData(data: any, column: Column): string | undefined {
    let key = column.options.field;
    if( key ) {
      return data[key];
    }
    return this._formatData(data[column.key], column);
  }

  _formatData(data: any, column: Column) {
    if(column.options.type === ColumnType.NUMBER) {
      console.log(this._getLocale());
      return data.toLocaleString(this._getLocale());
    }
    return data;
  }

  _onPageChanges( page: number ) {
    if(this._model) {
      this._model.onPageChanges(page);
    }else {
      this.onPageChanges.emit(page);
    }
  }

  cellClass(column: Column) {
    
    if( column.options.type === ColumnType.NUMBER ) {
      return {'ui-table-cell-format-number':true}
    }

    return {};

  }

  cellStyle(column: Column) {
    if( column.options.width ) {
      return {'width': column.options.width}
    }
    return {};
  }

  isActivePage( page: number ) {
    return this._page.currentPage === page;
  }

  setRows(rows:any) {
    this._rows = Array.isArray(rows) ? rows:[];
  }

}
