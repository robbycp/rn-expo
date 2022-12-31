import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootContext from '~/store/rootContext';
import rootReducers from '~/store/rootReducers';
import sagas from '~/store/rootSagas';
import AsyncStorage from '~/utils/asyncStorage';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug: __DEV__, //to get useful logging
};

export default () => {
  const sagaMiddleware = createSagaMiddleware({
    context: {...rootContext},
  });

  const persistedReducer = persistReducer(persistConfig, rootReducers);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([sagaMiddleware]),
  });

  if (module.hot) {
    module.hot.accept('~/store/rootReducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('~/store/rootReducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  const persistor = persistStore(store);

  if (__DEV__) {
    persistor.purge();
  }

  sagaMiddleware.run(sagas);
  return {persistor, store};
};
