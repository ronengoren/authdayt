import { Platform, StatusBar } from "react-native";
import { hasNotch } from "../infra/utils/deviceUtils";

const androidStatusBarHeight = 20;

const getAndroidStatusBarDiff = () =>
  StatusBar.currentHeight - androidStatusBarHeight;

const uiConstants = {
  NAVBAR_HEIGHT: Platform.select({
    ios: hasNotch() ? 116 : 106,
    android: hasNotch() ? getAndroidStatusBarDiff() + 106 : 106
  }),
  NAVBAR_TOP_MARGIN: Platform.select({
    ios: hasNotch() ? 15 : 0,
    android: hasNotch() ? getAndroidStatusBarDiff() : 0
  }),
  PHONE_BAR_HEIGHT: Platform.select({
    ios: hasNotch() ? 35 : 20,
    android: hasNotch() ? getAndroidStatusBarDiff() : 0
  }),
  PHONE_BAR_HEIGHT_TRANSLUCENT: Platform.select({
    ios: hasNotch() ? 35 : 20,
    android: hasNotch() ? getAndroidStatusBarDiff() + 20 : 20
  }),
  SUBMIT_BTN_HEIGHT: 60,
  WIDE_SCREEN_DEVICE_WIDTH: 375,
  NORMAL_DEVICE_HEIGHT: 568,
  SMALL_DEVICE_HEIGHT: 480,
  BTN_HITSLOP: { left: 5, top: 5, right: 5, bottom: 5 },
  BOTTOM_TAB_BAR_HEIGHT: 55,
  FOOTER_MARGIN_BOTTOM: hasNotch() ? 20 : 0
};

export { uiConstants }; // eslint-disable-line import/prefer-default-export
