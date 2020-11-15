import moment from 'moment';

interface FormatDateOptions {
  format?: string;
}

const defaultOptions: FormatDateOptions = {
  format: 'DD/MM/YYYY',
};

export function formatDate(date: Date, options?: FormatDateOptions): string {
  options = options ? Object.assign({}, defaultOptions, options) : defaultOptions;

  return moment(date).format(options.format);
}
