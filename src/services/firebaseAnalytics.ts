// import analytics from '@react-native-firebase/analytics';
import * as Transparency from 'expo-tracking-transparency';

const analytics = () => ({
  setAnalyticsCollectionEnabled: (isEnabled: boolean) => Promise.resolve(isEnabled),
  logEvent: (log: unknown, options: unknown) => Promise.resolve(({log, options})),
  logScreenView: (log: unknown) => Promise.resolve(log),
})

/**
 * Functionality
 */
export async function initialAnalytics() {
  try {
    const isAvailableTracking = Transparency.isAvailable()
    let trackingStatus = await Transparency.getTrackingPermissionsAsync();
    if (trackingStatus.status === 'undetermined') {
      trackingStatus = await Transparency.requestTrackingPermissionsAsync();
    }
    if (trackingStatus.status === 'granted' || !isAvailableTracking) {
      // enable tracking features
      await analytics().setAnalyticsCollectionEnabled(true);
    } else {
      await analytics().setAnalyticsCollectionEnabled(false);
    }
  } catch (error) {
    console.info('[firebase-analytics] initial error', error);
  }
}

export async function logEvent(
  eventName: string,
  params?: Record<string, any>,
) {
  await analytics().logEvent(eventName, params);
}

export async function logScreen(screenName: string | undefined) {
  await analytics().logScreenView({
    screen_name: screenName,
    screen_class: screenName,
  });
}

/**
 * Custom event
 */

export function logPressHomeList() {
  logEvent('press_list_home');
}
