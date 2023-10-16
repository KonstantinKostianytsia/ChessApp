import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataKey, ISaveDataService} from 'models/services/ISaveDataService';

export class SaveDataService implements ISaveDataService {
  async getDataByKey<T = string>(key: DataKey): Promise<null | T> {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data) as T;
    } else {
      return null;
    }
  }

  async removeDataByKey(key: DataKey): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async saveDataByKey(key: DataKey, data: unknown): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }

  async isExists(key: DataKey): Promise<boolean> {
    const data = await AsyncStorage.getItem(key);
    if (data === null) {
      return false;
    } else {
      return true;
    }
  }
}
