import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Divider, Title} from 'react-native-paper';

import {useAppTheme} from '~/style/theme';

interface HeaderProps {
  customRightIcon?: React.ReactElement;
  title: string;
  transparent?: boolean;
  subtitle?: string;
  withBackButton?: boolean;
}
const styles = StyleSheet.create({
  content: {flexDirection: 'column', width: '100%'},
  divider: {
    height: 3,
    width: '50%',
    alignSelf: 'center',
  },
});

const Header = ({title}: HeaderProps) => {
  const theme = useAppTheme();
  return (
    <Appbar.Header>
      <View style={styles.content}>
        <Divider style={[theme.spacing.mt4, styles.divider]} />
        <Title style={[theme.layout.fill, theme.layout.textCenter]}>{title}</Title>
      </View>
    </Appbar.Header>
  );
};

export default Header;
