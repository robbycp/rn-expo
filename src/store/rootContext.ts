import * as navigator from '~/navigation/navigator';
import * as remoteConfig from '~/services/firebaseRemoteConfig';

export enum ContextName {
  NAVIGATOR = 'navigator',
  REMOTE_CONFIG = 'remoteConfig',
  VERSION_UPDATE = 'versionUpdate',
}

const rootContext = {
  [ContextName.NAVIGATOR]: navigator,
  [ContextName.REMOTE_CONFIG]: remoteConfig,
};

export type RootContext = typeof rootContext;

export default rootContext;
