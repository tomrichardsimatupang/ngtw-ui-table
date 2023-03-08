import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[uiTableData]'
})
export class UiTableDataDirective {

  constructor(
    public template: TemplateRef<any>
  ) { }

}
