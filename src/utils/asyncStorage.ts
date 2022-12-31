import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeAsyncStorage = (key: string) => {
  return AsyncStorage.removeItem(key);
};

export default AsyncStorage;
