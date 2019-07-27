// import React, { Component } from 'react';
// import axios from 'axios';
// import { Platform, StyleSheet, StatusBar, NetInfo, LayoutAnimation } from 'react-native';
// import I18n from '/infra/localization';
// import { View, Text, IconButton } from '/components/basicComponents';
// import { daytColors } from '/vars';
// import config from '/config';
// import { screenNames, screenGroupNames } from '/vars/enums';
// import { uiConstants } from '/vars/uiConstants';
// import { navigationService } from '/infra/navigation';

// const { NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } = uiConstants;
// const reachabilityTypes = {
//   UNKNOWN: 'unknown',
//   NONE: 'none'
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//     alignItems: 'center',
//     backgroundColor: daytColors.white,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15
//   },
//   text: {
//     color: daytColors.white,
//     letterSpacing: 0.2
//   }
// });

// class ConnectionHeader extends Component {
//   state = {
//     isConnected: true,
//     showConnectionMessage: false
//   };

//   render() {
//     const { isConnected, showConnectionMessage } = this.state;

//     if (!showConnectionMessage) {
//       return null;
//     }

//     const text = isConnected ? I18n.t('header.online_toast') : I18n.t('header.offline_toast');

//     // Only in profile we use trunslucent statusBar (in Android), so we need to add extra height to it.
//     const shouldAddStatusBarHeight = Platform.OS === 'android' && [screenGroupNames.MY_CITY, screenNames.Profile].includes(navigationService.getCurrentRouteName());
//     const height = shouldAddStatusBarHeight ? NAVBAR_HEIGHT + StatusBar.currentHeight : NAVBAR_HEIGHT;
//     const paddingTop = shouldAddStatusBarHeight ? STATUS_BAR_HEIGHT + StatusBar.currentHeight : STATUS_BAR_HEIGHT;
//     const backgroundColor = isConnected ? daytColors.green : daytColors.red;

//     return (
//       <View style={[styles.wrapper, { backgroundColor, height, paddingTop }]}>
//         <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
//         <Text size={15} lineHeight={20} medium style={styles.text}>
//           {text}
//         </Text>
//         <IconButton name="close" onPress={this.hideConnectionMessage} iconColor="white" />
//       </View>
//     );
//   }

//   componentDidMount() {
//     this.isNetworkConnected().then((isConnected) => {
//       if (isConnected !== this.state.isConnected) {
//         if (isConnected) {
//           this.showConnectionRestoredMessage();
//         } else {
//           this.showNoConnectionMessage();
//         }
//       }
//       NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
//     });
//   }

//   componentWillUnmount() {
//     NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
//   }

//   handleConnectionChange = async (connectionInfo) => {
//     if (connectionInfo.type === reachabilityTypes.UNKNOWN) return;
//     const isConnected = connectionInfo.type !== reachabilityTypes.NONE;
//     if (isConnected !== this.state.isConnected) {
//       // Trying to fix the false positives we have on iOS - showing no connection when disconnecting/connecting
//       // back to wifi (while there is still 3G connection)
//       if (Platform.OS === 'ios' && isConnected !== (await this.checkConnectivity())) return;

//       if (isConnected) {
//         this.showConnectionRestoredMessage();
//       } else {
//         this.showNoConnectionMessage();
//       }
//     }
//   };

//   showNoConnectionMessage = () => {
//     LayoutAnimation.easeInEaseOut();
//     this.setState({ showConnectionMessage: true, isConnected: false });
//   };

//   showConnectionRestoredMessage = () => {
//     this.setState({ isConnected: true }, () => setTimeout(this.hideConnectionMessage, 2000));
//   };

//   hideConnectionMessage = () => {
//     LayoutAnimation.easeInEaseOut();
//     this.setState({ showConnectionMessage: false });
//   };

//   checkConnectivity = async () => {
//     try {
//       const res = await axios.get(config.healthCheckUrl);
//       if (res.status === 200) return true;
//     } catch (e) {
//       // Nothing to do here...
//     }
//     return false;
//   };

//   // This is a workaround to a known issue
//   // TODO: Follow the issue: https://github.com/facebook/react-native/issues/8615
//   isNetworkConnected = () =>
//     NetInfo.getConnectionInfo().then((reachability) => {
//       if (reachability.type === reachabilityTypes.UNKNOWN) {
//         return new Promise((resolve) => {
//           const handleFirstConnectivityChangeIOS = (isConnected) => {
//             NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
//             resolve(isConnected);
//           };
//           NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
//         });
//       }
//       return ![reachabilityTypes.NONE, reachabilityTypes.UNKNOWN].includes(reachability.type);
//     });
// }

// export default ConnectionHeader;
