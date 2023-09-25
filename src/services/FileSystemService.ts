import RNFS from 'react-native-fs';

import {IFileSystemService} from 'models/services/IFileSystemService';

export class FileSystemService implements IFileSystemService {
  createAndWriteToFile = async (
    filePath: string,
    content: string,
  ): Promise<void> => {
    try {
      await RNFS.writeFile(filePath, content);
    } catch (err) {
      throw err;
    }
  };
}
