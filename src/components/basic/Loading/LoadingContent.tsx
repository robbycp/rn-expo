import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';

import {useAppTheme} from '~/style/theme';

interface Props {
  children: React.ReactElement;
  isVisible: boolean;
}

// Change LottieView with other animation or use default ActivityIndicator
const LoadingContent = ({isVisible, children}: Props) => {
  const theme = useAppTheme();
  if (!isVisible) {
    return children;
  }
  return (
    <View style={[theme.layout.center, theme.layout.fullSize]}>
      <LottieView source={require('~/assets/animations/71696-dolphin.json')} autoPlay loop />
    </View>
  );
};

export default LoadingContent;
