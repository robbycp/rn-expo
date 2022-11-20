import * as Constants from 'expo-constants';
// import remoteConfig from '@react-native-firebase/remote-config';
const remoteConfig = () => ({
  setDefaults: (defaultVal: unknown) => {
    return Promise.resolve(defaultVal)
  },
  fetch: (defaultVal: unknown) => {
    return Promise.resolve(defaultVal)
  },
  activate: () => {
    return Promise.resolve(false)
  },
  getValue: (key: string) => ({
    getSource: () => 'source',
    asString: () => key,
    asNumber: () => 1,
    asBoolean: () => true,
  })
})
export enum RemoteConfigKeys {
  AWESOME_NEW_FEATURE = 'awesome_new_feature',
  UPDATE_APP_TYPE = 'update_app_type',
  WHATSAPP_NUMBER = 'whatsapp_number',
}

export const DEFAULT_VALUE = {
  [RemoteConfigKeys.AWESOME_NEW_FEATURE]: 'disabled',
  [RemoteConfigKeys.UPDATE_APP_TYPE]: 'flexible',
  [RemoteConfigKeys.WHATSAPP_NUMBER]: '',
};

export async function fetchRemoteConfig() {
  try {
    await remoteConfig().setDefaults(DEFAULT_VALUE);
    await remoteConfig().fetch(+Constants.expoConfig?.extra?.FIREBASE_REMOTE_CONFIG_CACHE_TIME);
    const fetchedRemotely = await remoteConfig().activate();
    if (fetchedRemotely) {
      console.info('Configs were retrieved from the backend and activated.');
    } else {
      console.info(
        'No configs were fetched from the backend, and the local configs were already activated',
      );
    }
  } catch (error) {
    console.info('error', error);
  }
}

export function getValue(key: RemoteConfigKeys): RemoteConfigValue {
  const value = remoteConfig().getValue(key);
  const returnValue: RemoteConfigValue = {
    source: value.getSource(),
    value: '',
  };
  if (typeof DEFAULT_VALUE[key] === 'string') {
    returnValue.value = value.asString();
  } else if (typeof DEFAULT_VALUE[key] === 'number') {
    returnValue.value = value.asNumber();
  } else if (typeof DEFAULT_VALUE[key] === 'boolean') {
    returnValue.value = value.asBoolean();
  }
  return returnValue;
}
