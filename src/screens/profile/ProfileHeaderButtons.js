import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openActionSheet } from "src/redux/general/actions";
import I18n from "src/infra/localization";
import { StyleSheet } from "react-native";
import { View, Text, IconButton } from "src/components/basicComponents";
import { daytColors, uiConstants, commonStyles } from "src/vars";

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

    if (isViewingOwnProfile) {
      return this.renderOwnHeaderButtons();
    } else {
      return this.renderOthersHeaderButtons();
    }
  }

  renderOwnHeaderButtons() {
    const { text, hasProfileData, isRenderedInHeader } = this.props;

    if (isRenderedInHeader) {
      return (
        <IconButton
          name="more-horizontal"
          onPress={hasProfileData ? this.handleSettingsPress : null}
          onLongPress={hasProfileData ? this.handleSettingsLongPress : null}
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
          name="more-horizontal"
          onPress={hasProfileData ? this.handleSettingsPress : null}
          onLongPress={hasProfileData ? this.handleSettingsLongPress : null}
          iconColor={hasProfileData ? "black" : "disabledGrey"}
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

  handleSettingsLongPress = () => {
    const { navigateToConnectedAccounts } = this.props;
    navigateToConnectedAccounts && navigateToConnectedAccounts({});
  };

  handleSettingsPress = () => {
    const {
      openActionSheet,
      navigateToEditProfile,
      navigateToSettings
    } = this.props;
    const options = [
      {
        id: "edit",
        text: I18n.t("profile.view.action_sheet.edit"),
        awesomeIconName: "pencil-alt",
        awesomeIconSize: 16,
        awesomeIconWeight: "solid",
        color: daytColors.b30,
        shouldClose: true,
        action: () => navigateToEditProfile({})
      },
      {
        id: "settings",
        text: I18n.t("profile.view.action_sheet.settings"),
        iconName: "settings",
        iconSize: 24,
        color: daytColors.b30,
        shouldClose: true,
        action: navigateToSettings
      }
    ];

    const data = {
      options,
      hasCancelButton: true
    };

    openActionSheet(data);
  };
}

ProfileHeaderButtons.propTypes = {
  text: PropTypes.string,
  isViewingOwnProfile: PropTypes.bool,
  isRenderedInHeader: PropTypes.bool,
  navigateToEditProfile: PropTypes.func,
  navigateToSettings: PropTypes.func,
  navigateToConnectedAccounts: PropTypes.func,
  navigateBack: PropTypes.func,
  openActionSheet: PropTypes.func,
  openProfileActionsheet: PropTypes.func,
  hasProfileData: PropTypes.bool
};

// export default connect(
//   null,
//   { openActionSheet }
// )(ProfileHeaderButtons);
export default ProfileHeaderButtons;
