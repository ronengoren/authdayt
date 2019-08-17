import React, { Component } from "react";
import PropTypes from "prop-types";

import { StyleSheet } from "react-native";
import { View, Text, IconButton } from "src/components/basicComponents";
import { uiConstants, commonStyles } from "src/vars";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10 + uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  noBtnSpacing: {
    width: 24
  },
  settingsBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15
  },
  backButton: {
    marginLeft: 11
  },
  moreBtn: {
    marginRight: 3
  }
});

class ProfileHeaderButtons extends Component {
  render() {
    const { isViewingOwnProfile } = this.props;

    // if (isViewingOwnProfile) {
    return this.renderOwnHeaderButtons();
    // } else {
    //   return this.renderOthersHeaderButtons();
    // }
  }

  renderOwnHeaderButtons() {
    const {
      text,
      hasProfileData,
      isRenderedInHeader,
      handleSettingsPress,
      handleSettingsLongPress
    } = this.props;

    if (isRenderedInHeader) {
      return (
        <IconButton
          name="more"
          onPress={handleSettingsPress}
          // onLongPress={hasProfileData ? handleSettingsLongPress : null}
          iconColor={hasProfileData ? "b60" : "disabledGrey"}
          iconSize={30}
          style={[styles.settingsBtn, commonStyles.shadow]}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.noBtnSpacing} />
        {!!text && this.renderText()}
        <IconButton
          name="more"
          onPress={handleSettingsPress}
          onLongPress={handleSettingsLongPress}
          iconColor={"black"}
          iconSize={24}
        />
      </View>
    );
  }

  renderOthersHeaderButtons() {
    const {
      text,
      navigateBack,
      openProfileActionsheet,
      hasProfileData,
      isRenderedInHeader
    } = this.props;
    let iconColor = "white";
    if (!isRenderedInHeader) {
      iconColor = "black";
    }
    if (!hasProfileData) {
      iconColor = "disabledGrey";
    }
    const iconSize = isRenderedInHeader ? 32 : 24;

    return (
      <View style={styles.container}>
        <IconButton
          name="back-arrow"
          onPress={hasProfileData ? navigateBack : null}
          iconColor={iconColor}
          iconSize={iconSize}
          style={[!!isRenderedInHeader && styles.backButton]}
        />
        {!isRenderedInHeader && !!text && this.renderText()}
        <IconButton
          name="more"
          onPress={hasProfileData ? openProfileActionsheet : null}
          iconColor={iconColor}
          iconSize={iconSize}
          style={[!!isRenderedInHeader && styles.moreBtn]}
        />
      </View>
    );
  }

  renderText() {
    const { text } = this.props;

    return (
      <Text bold size={16}>
        {text}
      </Text>
    );
  }
}

ProfileHeaderButtons.propTypes = {
  text: PropTypes.string,
  isViewingOwnProfile: PropTypes.bool,
  isRenderedInHeader: PropTypes.bool,
  navigateBack: PropTypes.func,
  openProfileActionsheet: PropTypes.func,
  handleSettingsPress: PropTypes.func,
  handleSettingsLongPress: PropTypes.func,
  hasProfileData: PropTypes.bool
};

export default ProfileHeaderButtons;
