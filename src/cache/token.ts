import AsyncStorage from '@react-native-async-storage/async-storage';
import type {IToken} from '@interfaces/data/token';
import {fileLogger} from '@helpers/fileLogger';

const TOKEN_KEY = '@ecommerce:token';

export const tokenStorage = async (): Promise<IToken | null> => {
  const item = await AsyncStorage.getItem(TOKEN_KEY);
  if (item) {
    fileLogger.info('Loaded token from AsyncStorage.');
    return item as IToken;
  }
  fileLogger.warn('No token found in AsyncStorage.');
  return null;
};

export const saveToken = async (token: IToken): Promise<void> => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  fileLogger.info('Token saved to AsyncStorage.');
};

export const clearToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  fileLogger.info('Cleared token from AsyncStorage.');
};
