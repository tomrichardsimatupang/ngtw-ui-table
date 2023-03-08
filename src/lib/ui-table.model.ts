import { EventEmitter } from '@angular/core';
import { UiTableApi } from './ui-table.api';
import { UiTableDataSourceInterface } from './ui-table.datasource.interface';

export abstract class UiTableModel {
    
    events:Map<string, any> = new Map();

    api!: UiTableApi;
    abstract dataSource: UiTableDataSourceInterface;

    abstract onPageChanges(page: number): void;

    on(event:string, func: any) {
        this.events.set(event, func);
    }

    emit(event: string) {
        const func = this.events.get(event);
        const isApiReady = (() => {
            if(this.api) {
                func(this.api);
            }else {
                setTimeout(isApiReady, 100);
            }
        });
        isApiReady();
    }

    ready( api: UiTableApi ) {
        this.api = api;
    }

}
