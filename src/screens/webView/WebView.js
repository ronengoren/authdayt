import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  WebView as RnWebView,
  View,
  Platform,
  Share,
  Linking
} from "react-native";
import Orientation from "react-native-orientation";
import { Screen } from "src/components";
import {
  Text,
  IconButton,
  ProgressBar,
  Spinner
} from "src/components/basicComponents";

import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { uiConstants, daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerOuter: {
    paddingTop: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    backgroundColor: daytColors.green
  },
  headerInner: {
    paddingTop: 8,
    paddingBottom: 6,
    paddingLeft: 50,
    paddingRight: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: daytColors.paleGreyTwo
  },
  titleText: {
    marginBottom: 2
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    left: 10
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: daytColors.paleGreyTwo
  },
  progressBar: {
    height: 2
  }
});

class WebView extends Component {
  state = {
    // navStepsCounter: 0,
    // maxNavStepsCounter: 0,
    // canGoBack: false,
    // canGoForward: false,
    // shouldUpdateNavCounter: true,
    // currentUrl: this.props.navigation.state.params.url,
    title: get(this.props.navigation, "state.params.title", null)
    // subtitle: get(this.props.navigation, 'state.params.subtitle', null)
  };
  render() {
    const { title, subtitle, canGoBack, canGoForward, progress } = this.state;
    const isIOS = Platform.OS === "ios";
    const { url } = "this.state";

    return (
      <View style={styles.container}>
        <View style={styles.headerOuter}>
          <View style={styles.headerInner}>
            <Text
              size={14}
              lineHeight={18}
              color={daytColors.b30}
              numberOfLines={1}
              style={styles.titleText}
            >
              {title || " no title"}
            </Text>
            <Text
              size={11}
              lineHeight={18}
              color={daytColors.b70}
              bold
              numberOfLines={1}
            >
              {subtitle || "subtitle "}
            </Text>
            <IconButton
              name="close"
              style={styles.closeIcon}
              iconColor="b70"
              iconSize={23}
              onPress={() => navigationService.goBack()}
            />
          </View>
        </View>
        {isIOS && progress !== 1 && (
          <ProgressBar style={styles.progressBar} progress={progress} />
        )}
        <RnWebView
          useWebKit
          ref={node => {
            this.webView = node;
          }}
          source={{ uri: url }}
          renderLoading={() => <Spinner />}
          startInLoadingState
          // onNavigationStateChange={this.handleNavStateChange}
        />
        <View style={styles.footer}>
          <IconButton
            name="angle-left"
            iconColor="realBlack"
            disabled={!canGoBack}
            iconSize={24}
            isAwesomeIcon
            onPress={this.webViewGoBack}
          />
          <IconButton
            name="angle-right"
            iconColor="realBlack"
            disabled={!canGoForward}
            iconSize={24}
            isAwesomeIcon
            onPress={this.webViewGoForward}
          />
          <IconButton
            name="share-alt"
            iconColor="realBlack"
            iconSize={20}
            isAwesomeIcon
            onPress={this.openNativeShare}
          />
          <IconButton
            name="globe"
            iconColor="realBlack"
            iconSize={20}
            isAwesomeIcon
            onPress={this.openLinkInDefaultBrowser}
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    Orientation.unlockAllOrientations();
  }
  componentWillUnmount() {
    Orientation.lockToPortrait();
  }
}

export default WebView;
