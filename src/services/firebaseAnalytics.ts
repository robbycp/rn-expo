import analytics, {firebase} from '@react-native-firebase/analytics';
import * as Transparency from 'expo-tracking-transparency';

/**
 * Functionality
 */
export async function initialAnalytics() {
  try {
    const isAvailableTracking = Transparency.isAvailable();
    let trackingStatus = await Transparency.getTrackingPermissionsAsync();
    if (trackingStatus.status === 'undetermined') {
      trackingStatus = await Transparency.requestTrackingPermissionsAsync();
    }
    let isEnabled = false;
    if (trackingStatus.status === 'granted' || !isAvailableTracking) {
      // enable tracking features
      await firebase.analytics().setAnalyticsCollectionEnabled(true);
      isEnabled = true;
    } else {
      isEnabled = false;
      await firebase.analytics().setAnalyticsCollectionEnabled(false);
    }
  } catch (error) {
    console.info('[firebase-analytics] initial error', error);
  }
}

export async function logEvent(eventName: string, params?: Record<string, any>) {
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
