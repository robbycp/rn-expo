import React from 'react';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import RenderHtml, {HTMLSource} from 'react-native-render-html';

type RenderHtmlProps = React.ComponentProps<typeof RenderHtml>;
interface Props extends RenderHtmlProps {
  source: HTMLSource;
}

const Html = ({source}: Props) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  return <RenderHtml contentWidth={width} source={source} baseStyle={{color: theme.colors.text}} />;
};

export default Html;
