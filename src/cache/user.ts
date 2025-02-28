import AsyncStorage from '@react-native-async-storage/async-storage';
import type {User} from '@interfaces/data/user';
import {fileLogger} from '@helpers/fileLogger';
import {mapStaffMember} from '@mapper/staff';

export const USER_KEY = '@teamrelay:user';

export const userStorage = async (): Promise<User | null> => {
  const item = await AsyncStorage.getItem(USER_KEY);

  if (item) {
    const staff = JSON.parse(item) as User;
    fileLogger.info('Loaded user data from AsyncStorage.');
    return staff;
  }

  fileLogger.warn('No user data found in AsyncStorage.');
  return null;
};

export const saveUser = async (staffMember: User): Promise<void> => {
  const staff = await mapStaffMember(staffMember);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(staff));
  fileLogger.info('User data saved to AsyncStorage.');
};

export const clearUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_KEY);
  fileLogger.info('Cleared user data from AsyncStorage.');
};
