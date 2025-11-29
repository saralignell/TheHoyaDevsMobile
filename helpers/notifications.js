import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";

async function requestNotifPermissioniOS() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
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
    await requestNotifPermissioniOS();
  } else if (Platform.OS === "android") {
    await requestNotifPermissionAndroid();
  }
}
