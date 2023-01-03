import type {PayloadAction} from '@reduxjs/toolkit';
import {call, put} from 'redux-saga/effects';

import {commonFetchFailed, commonFetchSuccess} from '../slices/common';

import Common from '~/services/FirestoreModel/Common';
import {FirestoreData} from '~/services/firebaseFirestore';
import type {CommonKey} from '~/types/common';

export function* commonFetchSaga(action: PayloadAction<{key: CommonKey}>) {
  try {
    const key = action.payload.key;
    const contentData: FirestoreData<{content: string}> = yield call(Common.getDataById, key);
    yield put(
      commonFetchSuccess({
        key,
        content: contentData.data()?.content,
      }),
    );
  } catch {
    yield put(commonFetchFailed());
  }
}
