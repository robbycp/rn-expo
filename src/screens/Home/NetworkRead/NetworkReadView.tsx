import React from 'react';
import {View, Text} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import i18n from '~/translations';

const NetworkReadView = () => {
  const netState = useNetInfo();
  return (
    <View>
      <Text>
        {netState.isConnected
          ? `${i18n.t('homeNetwork.connected')}`
          : `${i18n.t('homeNetwork.noConnection')}`}
      </Text>
    </View>
  );
};

export default NetworkReadView;
