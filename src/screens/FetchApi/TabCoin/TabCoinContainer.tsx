import React from 'react';

import TabCoinView from './TabCoinView';

import {useCoincapGet} from '~/hooks/dataState/coincap.hooks';

const TabCoinContainer = () => {
  const {data, isLoading} = useCoincapGet();

  const propsView = {
    data: data?.data.data,
    isLoading,
  };
  return <TabCoinView {...propsView} />;
};

export default TabCoinContainer;
