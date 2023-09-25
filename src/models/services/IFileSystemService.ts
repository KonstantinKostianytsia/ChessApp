export interface IFileSystemService {
  createAndWriteToFile: (filePath: string, content: string) => Promise<void>;
}
