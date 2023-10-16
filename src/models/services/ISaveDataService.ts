export enum DataKey {
  AverageBoardValues = 'AverageBoardValues',
}

export interface ISaveDataService {
  getDataByKey<T = string>(key: DataKey): Promise<T | null>;
  removeDataByKey(key: DataKey): Promise<void>;
  saveDataByKey(key: DataKey, data: unknown): Promise<void>;
  isExists(key: DataKey): Promise<boolean>;
}
