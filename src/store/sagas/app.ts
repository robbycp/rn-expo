import {getContext, put} from 'redux-saga/effects';

import {ContextName, RootContext} from '~/store/rootContext';
import {appStartCheckSuccess} from '~/store/slices/app';
import {authCheckRequest} from '~/store/slices/auth';
import {showAlertRestart} from '~/utils/errorHandler';

export function* appStartCheckSaga() {
  try {
    const navigator: RootContext[ContextName.NAVIGATOR] = yield getContext(ContextName.NAVIGATOR);

    yield put(authCheckRequest());
    yield put(appStartCheckSuccess());
    navigator.replace('Home');
  } catch (error) {
    console.log('[error appstartcheck] ', error);
    showAlertRestart();
  }
}
