import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import i18n from '~/translations';
// Uncomment to use withPerformanceMonitor
// import withPerformanceMonitor from 'react-native-performance-monitor/provider';

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
  },
});

const data = Array.from(Array(100).keys());

const ScreenFlatListImageView = () => {
  const theme = useTheme();
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.toString()}
      renderItem={({item}) => (
        <Image
          key={item}
          style={[styles.image]}
          source={{
            uri: `https://source.unsplash.com/random/500x${Math.floor(Math.random() * 800 + 500)}`,
          }}
        />
      )}
      ListHeaderComponent={
        <View style={theme.spacing.p8}>
          <Text>{i18n.t('flatlistImage.fastImage')}</Text>
          <Text>{i18n.t('flatlistImage.description')}</Text>
        </View>
      }
    />
  );
};

/**
 * uncomment and use withPerformanceMonitor to use performance monitor
 * config about additional options could be found here
 * https://github.com/Flagsmith/react-native-performance-monitor#connecting-to-a-real-device
 */
// export default withPerformanceMonitor(
//   ScreenFlatListImageView,
//   'FlatList Image',
//   '192.168.1.101',
// );
export default ScreenFlatListImageView;
