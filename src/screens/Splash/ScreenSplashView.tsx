import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    height: 100,
    width: 100,
  },
});

const ScreenSplashView = () => {
  const theme = useTheme();

  return (
    <View style={[theme.layout.center, theme.layout.fill]}>
      <Image
        source={require('~/assets/images/logo.png')}
        style={styles.image}
        testID="splashImageLogo"
      />
    </View>
  );
};

export default ScreenSplashView;
