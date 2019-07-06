import DeviceInfo from "react-native-device-info";

export function hasNotch() {
  return DeviceInfo.hasNotch();
}
