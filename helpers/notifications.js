import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

async function requestNotifPermissioniOS() {
  console.log("Requesting iOS notification permission");
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log("Authorization status:", authStatus);
    const fcmToken = await messaging().getToken();
    console.log("FCM Token:", fcmToken);
  }
}

async function requestNotifPermissionAndroid() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: "The Hoya Notification Permission",
        message:
          "The Hoya needs access to send you notifications about breaking news and updates.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the notification");
    } else {
      console.log("Notification permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestNotificationPermission() {
  if (Platform.OS === "ios") {
    console.log("iOS notification permission requested");
    await requestNotifPermissioniOS();
  } else if (Platform.OS === "android") {
    console.log("Android notification permission requested");
    await requestNotifPermissionAndroid();
  }
}
