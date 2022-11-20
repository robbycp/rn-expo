// import inAppMessaging from '@react-native-firebase/in-app-messaging';
const inAppMessaging = () => ({
  setMessagesDisplaySuppressed: (isSet: boolean) => Promise.resolve(isSet)
})

export async function setInAppMessaging(isSet: boolean) {
  await inAppMessaging().setMessagesDisplaySuppressed(isSet);
}
