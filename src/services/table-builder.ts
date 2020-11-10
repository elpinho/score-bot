import pad from 'pad';

interface TableBuilderOptions {
  sortBy?: number;
  sortDirection?: 'asc' | 'desc';
}

const defaultOptions: TableBuilderOptions = {
  sortDirection: 'asc',
};

interface IColumn {
  index: number;
  label: string;
  width: number;
  format?: (content) => string;
}

interface ICell {
  column: string;
  content: string | number;
}

interface IRow {
  cells: ICell[];
}

export class TableBuilder {
  private _columns: IColumn[];
  private _rows: IRow[];
  private _options: TableBuilderOptions;

  constructor(columns?: IColumn[], options?: TableBuilderOptions) {
    this._columns = [TableBuilder._createIndexColumn()];
    if (columns) {
      this._columns.push(...columns);
    }

    this._rows = [];
    this._options = options ? Object.assign({}, defaultOptions, options) : defaultOptions;
  }

  addRow(data: ICell[]) {
    this._rows.push({
      cells: data,
    });
  }

  build(): string {
    // Header

    let result = `\`${this._buildRow(this._createHeader())}\n`;
    result += pad('', this._totalWidth(), '-');

    // Content

    let sortLabel;
    if (this._options.sortBy) {
      sortLabel = this._columns.find((col) => col.index === this._options.sortBy).label;
    } else {
      sortLabel = this._columns[1].label;
    }

    this._rows.sort((a, b) => {
      let aCell = a.cells.find((cell) => cell.column === sortLabel);
      let bCell = b.cells.find((cell) => cell.column === sortLabel);

      if (this._options.sortDirection === 'desc') {
        [aCell, bCell] = [bCell, aCell];
      }

      if (typeof aCell.content === 'string') {
        return aCell.content.localeCompare(bCell.content as string);
      } else if (typeof aCell.content === 'number') {
        return aCell.content - (bCell.content as number);
      }
    });

    this._rows.forEach((row, index) => {
      result += `\n${this._buildRow(row, index + 1)}`;
    });

    return `${result}\``;
  }

  private _buildRow(row: IRow | ICell[], index?: number): string {
    let cells: ICell[];
    if (Array.isArray(row)) {
      cells = row;
    } else {
      cells = row.cells;
    }

    cells.sort((a, b) => {
      const colA = this._columns.find((c) => c.label === a.column);
      const colB = this._columns.find((c) => c.label === b.column);
      return colA.index - colB.index;
    });

    let result = index ? pad(String(index), TableBuilder._createIndexColumn().width) : '';
    cells.forEach((cell) => {
      const column = this._columns.find((col) => col.label === cell.column);

      let content = cell.content;
      if (column.format && index) {
        content = column.format(cell.content);
      }

      result += pad(String(content), column.width);
    });

    return result;
  }

  private _createHeader(): ICell[] {
    return this._columns.map((column) => ({
      column: column.label,
      content: column.label,
    }));
  }

  private _totalWidth(): number {
    let width = 0;
    this._columns.forEach((col) => (width += col.width));
    return width;
  }

  private static _createIndexColumn(): IColumn {
    return {
      index: 0,
      label: '#',
      width: 4,
    };
  }
}
