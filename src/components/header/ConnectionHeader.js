import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

import React, { Component } from "react";
import { Platform, StyleSheet, StatusBar, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, IconButton } from "src/components/basicComponents";
import { daytColors } from "src/vars";
// import config from '/config';
import { screenNames, screenGroupNames } from "src/vars/enums";
import { uiConstants } from "src/vars/uiConstants";
import { navigationService } from "src/infra/navigation";

// const { NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } = uiConstants;
// const reachabilityTypes = {
//   UNKNOWN: 'unknown',
//   NONE: 'none'
// };

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    alignItems: "center",
    backgroundColor: daytColors.white,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  text: {
    color: daytColors.white,
    letterSpacing: 0.2
  }
});

class ConnectionHeader extends Component {
  state = {
    showConnectionMessage: false
  };

  render() {
    const { showConnectionMessage } = this.state;
    const { isOnline } = this.props;

    if (!showConnectionMessage) {
      return null;
    }

    return (
      <View style={[styles.wrapper, { backgroundColor, height, paddingTop }]} />

      //       <View style={[styles.wrapper, { backgroundColor, height, paddingTop }]}>
      //         <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      //         <Text size={15} lineHeight={20} medium style={styles.text}>
      //           {text}
      //         </Text>
      //         <IconButton name="close" onPress={this.hideConnectionMessage} iconColor="white" />
      //       </View>
    );
  }

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
}

export default ConnectionHeader;
