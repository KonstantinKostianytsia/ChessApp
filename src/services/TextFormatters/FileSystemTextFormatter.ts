import {IFileSystemTextFormatter} from 'models/services/IFileSystemTextFormatter';

export class FileSystemTextFormatter implements IFileSystemTextFormatter {
  formatDebugFileSystemData = (data: number[][]) => {
    const formatRowData = (rowData: number[], rowIndex: number): string => {
      return `row_${rowIndex}: ${rowData.join()}\n`;
    };
    return data.map((item, index) => formatRowData(item, 8 - index)).join('\n');
  };
}
