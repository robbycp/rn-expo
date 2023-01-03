import React from 'react';

import TabCoin from './TabCoin';
import TabCrud from './TabCrud';

import Tabs from '~/components/basic/Tabs';

const ScreenFetchApiView = () => {
  return (
    <Tabs
      tabs={[
        {
          key: 'coin',
          title: 'Coin',
          scene: TabCoin,
        },
        {
          key: 'crud',
          title: 'Crud',
          scene: TabCrud,
        },
      ]}
    />
  );
};

export default ScreenFetchApiView;
