import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

interface HeaderProps {
  customRightIcon?: React.ReactElement;
  title: string;
  transparent?: boolean;
  subtitle?: string;
  withBackButton?: boolean;
}
const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
});

const Header = ({
  customRightIcon,
  title,
  transparent = false,
  subtitle = '',
  withBackButton = true,
}: HeaderProps) => {
  const navigation = useNavigation();
  const headerStyle = transparent ? styles.transparent : {};
  return (
    <Appbar.Header style={headerStyle}>
      {withBackButton && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content testID="headerTitle" title={title} subtitle={subtitle} />
      {customRightIcon}
    </Appbar.Header>
  );
};

export default Header;
