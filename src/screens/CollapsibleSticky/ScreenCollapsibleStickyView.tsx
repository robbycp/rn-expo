import React from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import {useCollapsibleHeader} from 'react-navigation-collapsible';

import Header from '~/components/basic/Header/Header';
import CollapsibleItem from '~/components/custom/CollapsibleItem';
import {useAppTheme} from '~/style/theme';

const data = [...Array(50).keys()];

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: '100%',
  },
  containerView: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CustomHeader = () => <Header title="Collapsible Sticky" withBackButton />;

const ScreenCollapsibleStickyView = () => {
  const theme = useAppTheme();
  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY} = useCollapsibleHeader(
    {
      navigationOptions: {
        header: CustomHeader,
      },
      config: {
        collapsedColor: theme.colors.primary,
      },
    },
  );

  const stickyHeaderHeight = 100;

  return (
    <>
      <Animated.FlatList
        data={data}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: containerPaddingTop + stickyHeaderHeight,
        }}
        scrollIndicatorInsets={{
          top: scrollIndicatorInsetTop + stickyHeaderHeight,
        }}
        renderItem={({item}) => <CollapsibleItem item={item} />}
        keyExtractor={(item: any) => item.toString()}
      />

      {/* Sticky UI */}
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{translateY}],
            backgroundColor: theme.colors.background,
            top: containerPaddingTop,
            height: stickyHeaderHeight,
          },
        ]}>
        <View
          style={[
            styles.containerView,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}>
          <Text style={[theme.fonts.bodyMedium]}>Sticky UI</Text>
        </View>
      </Animated.View>
    </>
  );
};

export default ScreenCollapsibleStickyView;
