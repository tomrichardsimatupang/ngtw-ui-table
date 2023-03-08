import { ColumnOptions } from './ColumnOptions.interface';

export class Column {
    
    constructor(
        public key: string, 
        public options: ColumnOptions) {
    }

    display(): string {
        return this.options.display ?? this.key;
    }
    
}