import React from 'react';
import {Animated} from 'react-native';
import {useCollapsibleHeader} from 'react-navigation-collapsible';

import Header from '~/components/basic/Header/Header';
import CollapsibleItem from '~/components/custom/CollapsibleItem';
import {useAppTheme} from '~/style/theme';

const data = [...Array(50).keys()];

const CustomHeader = () => {
  return <Header title="Collapsible Default" withBackButton />;
};

const ScreenCollapsibleDefaultView = () => {
  const theme = useAppTheme();
  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop} = useCollapsibleHeader({
    navigationOptions: {
      header: CustomHeader,
      config: {
        collapsedColor: theme.colors.primary,
        disableOpacity: true,
      },
    },
  });

  return (
    <Animated.FlatList
      data={data}
      onScroll={onScroll}
      contentContainerStyle={{paddingTop: containerPaddingTop}}
      scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
      renderItem={({item}) => <CollapsibleItem item={item} />}
      keyExtractor={(item: any) => item.toString()}
    />
  );
};

export default ScreenCollapsibleDefaultView;
