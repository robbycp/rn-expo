import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const VersionAppView = () => {
  const updateId = Updates.updateId || '';
  return (
    <View>
      <Text>
        v{Application?.nativeApplicationVersion}
        {updateId}
      </Text>
    </View>
  );
};

export default VersionAppView;
