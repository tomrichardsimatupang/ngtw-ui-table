import { NgModule } from '@angular/core';
import { UiTableComponent } from './ui-table.component';
import { CommonModule } from '@angular/common';
import { UiTableColDirective } from './directives/ui-table-col.directive';
import { UiTableHeadDirective } from './directives/ui-table-head.directive';
import { UiTableDataDirective } from './directives/ui-table-data.directive';


@NgModule({
  declarations: [
    UiTableComponent,
    UiTableColDirective,
    UiTableHeadDirective,
    UiTableDataDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiTableComponent,
    UiTableColDirective,
    UiTableHeadDirective,
    UiTableDataDirective
  ]
})
export class UiTableModule { }
