import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = (text: string) => {
  Clipboard.setStringAsync(text);
};

export const getTextClipboard = async () => {
  return await Clipboard.getStringAsync();
};
