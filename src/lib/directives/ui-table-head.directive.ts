import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[uiTableHead]'
})
export class UiTableHeadDirective {

  @Input() uiTableHead!: string;

  constructor(
    public template: TemplateRef<any>
  ) { }

}
