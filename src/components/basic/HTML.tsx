import React from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHtml, {HTMLSource} from 'react-native-render-html';

import {useAppTheme} from '~/style/theme';

type RenderHtmlProps = React.ComponentProps<typeof RenderHtml>;
interface Props extends RenderHtmlProps {
  source: HTMLSource;
}

const Html = ({source}: Props) => {
  const theme = useAppTheme();
  const {width} = useWindowDimensions();
  return (
    <RenderHtml contentWidth={width} source={source} baseStyle={{color: theme.colors.onPrimary}} />
  );
};

export default Html;
