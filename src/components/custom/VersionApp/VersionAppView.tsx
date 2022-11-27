import React from 'react'
import * as Application from 'expo-application';
import * as Updates from 'expo-updates'
import Constants from 'expo-constants';
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const VersionAppView = () => {
  const isDev = Constants?.expoConfig?.extra?.ENVIRONMENT === 'dev'
  const channelName = isDev ? `-${Updates.channel}` : ''
  return (
    <View>
      <Text>v{Application?.nativeApplicationVersion}{channelName}</Text>
    </View>
  )
}

export default VersionAppView