import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import i18n from '~/translations';
import {copyToClipboard, getTextClipboard} from '~/utils/clipboard';

const ClipboardHomeView = () => {
  const [copiedText, setCopiedText] = React.useState('');

  const handleCopyClipboard = () => {
    const randomNumber = Math.random();
    copyToClipboard(`${i18n.t('homeClipboard.copiedText')} ${randomNumber}`);
  };

  const fetchCopiedText = async () => {
    const text = await getTextClipboard();
    setCopiedText(text);
  };
  return (
    <View>
      <View>
        <Button onPress={handleCopyClipboard}>{i18n.t('homeClipboard.clickToCopy')}</Button>
        <Button onPress={fetchCopiedText}>
          <Text>{i18n.t('homeClipboard.viewCopiedText')}</Text>
        </Button>
      </View>
      <Text>{copiedText}</Text>
    </View>
  );
};

export default ClipboardHomeView;
