import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */
import {appStartCheckSaga} from '~/store/sagas/app';
import {
  authCheckSaga,
  authMeSaga,
  authSigninSaga,
  authSignoutSaga,
  authSignupSaga,
} from '~/store/sagas/auth';
import {commonFetchSaga} from '~/store/sagas/common';
import {appStartCheck} from '~/store/slices/app';
import {authCheckRequest, authMe, authSignin, authSignout, authSignup} from '~/store/slices/auth';
import {commonFetch} from '~/store/slices/common';
/* ------------- Sagas ------------- */
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const apiGithub = API.create()
// const apiUser = API.create(Constants.expoConfig?.extra?.API_URL)

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(appStartCheck, appStartCheckSaga),
    takeLatest(authCheckRequest, authCheckSaga),
    takeLatest(authMe, authMeSaga),
    takeLatest(authSignin, authSigninSaga),
    takeLatest(authSignout, authSignoutSaga),
    takeLatest(authSignup, authSignupSaga),
    takeLatest(commonFetch, commonFetchSaga),
  ]);
}
