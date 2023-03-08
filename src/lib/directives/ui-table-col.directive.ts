import { Directive, Input, TemplateRef, ViewChild, AfterContentInit } from '@angular/core';
import { UiTableDataDirective } from './ui-table-data.directive';
import { UiTableHeadDirective } from './ui-table-head.directive';

@Directive({
  selector: 'ng-template[uiTableCol]'
})
export class UiTableColDirective {

  @Input() uiTableCol: string = "";

  constructor(
    public template: TemplateRef<any>
  ) { 
  }

}
