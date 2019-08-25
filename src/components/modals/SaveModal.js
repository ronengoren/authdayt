import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, StyleSheet, View, Animated, Dimensions } from "react-native";
import I18n from "src/infra/localization";
import { Text, TextButton, IconButton } from "src/components/basicComponents";
import { ThemeCardsView, ThemesChipsList } from "src/components/themes";
import { ErrorModal } from "src/components/modals";
import { saveToThemes } from "src/redux/themes/actions";
import { uiConstants, daytColors } from "src/vars";
import { entityTypes, originTypes } from "src/vars/enums";
import { userScheme } from "src/schemas";
import { get } from "src/infra/utils";
import images from "src/assets/images";

const MARGIN_HORIZONTAL = 15;

const styles = StyleSheet.create({
  fadeContainer: {
    flex: 1,
    backgroundColor: daytColors.paleBlack
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    width: "100%",
    backgroundColor: daytColors.white
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15
  },
  body: {
    paddingHorizontal: MARGIN_HORIZONTAL,
    paddingTop: 12,
    paddingBottom: 7
  },
  header: {
    marginBottom: 4
  },
  closeButton: {
    position: "absolute",
    top: 11,
    right: 11,
    zIndex: 999,
    backgroundColor: daytColors.transparent
  },
  themeCards: {
    marginTop: 10
  },
  scrollView: {
    marginTop: 11,
    marginBottom: 9
  },
  iphoneXSubmitBtn: {
    paddingVertical: 0,
    paddingBottom: uiConstants.FOOTER_MARGIN_BOTTOM
  },
  progressBarWrapper: {
    width: "100%",
    height: 3,
    borderRadius: 1
  },
  progressBar: {
    height: 3,
    borderRadius: 1,
    backgroundColor: daytColors.green
  }
});

const CLOSE_TIME = 2000;

class SaveModal extends React.Component {
  constructor(props) {
    super(props);
    const { height } = Dimensions.get("window");
    this.state = {
      progressBarWidth: new Animated.Value(0),
      translateY: new Animated.Value(height),
      backgroundColorOpacity: new Animated.Value(0),
      saved: false
      // selectedThemes: props.preSelectedThemes || []
    };
  }

  render() {
    const { backgroundColorOpacity } = this.state;
    const backgroundColor = backgroundColorOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(46, 59, 79, 0)", "rgba(46, 59, 79, 0.5)"]
    });
    return (
      <Modal
        transparent
        visible
        onRequestClose={() => {}}
        onShow={this.showContentAnimation}
      >
        <Animated.View style={[styles.fadeContainer, { backgroundColor }]}>
          <Animated.View
            style={[
              styles.container,
              { transform: [{ translateY: this.state.translateY }] }
            ]}
            onRequestClose={() => {}}
          >
            <View style={styles.innerContainer}>
              <IconButton
                name="close"
                onPress={this.closeModal}
                iconColor="b70"
                iconSize={26}
                style={styles.closeButton}
              />
              {this.renderBody()}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }

  renderBody() {
    const { saved } = this.state;

    if (saved) {
      return this.renderSavedBody();
    } else {
      return this.renderUnsavedBody();
    }
  }

  renderSavedBody() {
    // const { selectedThemes, progressBarWidth } = this.state;
    const progressBarActualWidth = progressBarWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    });

    return [
      <View style={styles.body} key="unsavedBody">
        {this.renderBodyHeader()}
        <ThemesChipsList
          themes={selectedThemes}
          isShowSaved
          preNavAction={this.closeModal}
          originType={originTypes.SAVED_THEME}
          style={styles.scrollView}
        />
      </View>,
      <View style={styles.progressBarWrapper} key="progressBar">
        <Animated.View
          style={[styles.progressBar, { width: progressBarActualWidth }]}
        />
      </View>
    ];
  }

  renderUnsavedBody() {
    const { user } = this.props;
    let neighborhoodImage;
    let neighborhoodName;

    // if (user.journey.neighborhood) {
    //   neighborhoodImage = get(user, "journey.neighborhood.media.thumbnail");
    //   neighborhoodName = get(user, "journey.neighborhood.name");
    //   neighborhoodImage = neighborhoodImage
    //     ? { uri: neighborhoodImage }
    //     : images.neighborhood.hood_default;
    // }

    return [
      <View style={styles.body} key="unsavedBody">
        {this.renderBodyHeader()}
        <ThemeCardsView
          // withSelection
          // themes={this.props.themes}
          // onThemePress={this.handleThemeToggle}
          // selectedThemes={this.state.selectedThemes}
          horizontalMargins={MARGIN_HORIZONTAL * 4}
          style={styles.themeCards}
          // neighborhoodImage={neighborhoodImage}
          // neighborhoodName={neighborhoodName}
        />
      </View>,
      <TextButton
        footerButton
        size="huge"
        // onPress={this.saveToThemes}
        disabled={this.saveDisabled()}
        key="submitButton"
        style={styles.iphoneXSubmitBtn}
      >
        {I18n.t("save_modal.submit_button")}
      </TextButton>
    ];
  }

  renderBodyHeader() {
    const { saved } = this.state;
    return [
      <Text
        size={16}
        lineHeight={21}
        bold
        color={daytColors.realBlack}
        style={styles.header}
        key="header"
      >
        {I18n.t(`save_modal.${saved ? "saved_" : ""}header`)}
      </Text>
      // <Text size={16} lineHeight={21} color={daytColors.b60} key="subheader">
      //   {I18n.t(`save_modal.${saved ? "saved_" : ""}subheader`)}
      // </Text>
    ];
  }

  handleThemeToggle = theme => {
    const themeIndex = this.state.selectedThemes.findIndex(
      item => item === theme.theme
    );
    if (themeIndex > -1) {
      this.setState({
        selectedThemes: [
          ...this.state.selectedThemes.slice(0, themeIndex),
          ...this.state.selectedThemes.slice(themeIndex + 1)
        ]
      });
    } else {
      this.setState({
        selectedThemes: [...this.state.selectedThemes, theme.theme]
      });
    }
  };

  closeModal = () => {
    const { saved, progressBarWidth } = this.state;

    if (saved) {
      // Stopping the animation triggers this.hideContentAnimation
      Animated.timing(progressBarWidth).stop();
    } else {
      this.hideContentAnimation();
    }
  };

  showContentAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.translateY, { toValue: 0, duration: 350 }),
      Animated.timing(this.state.backgroundColorOpacity, {
        toValue: 1,
        duration: 350
      })
    ]).start();
  };

  hideContentAnimation = () => {
    const { onClose } = this.props;
    const { height } = Dimensions.get("window");

    Animated.parallel([
      Animated.timing(this.state.translateY, {
        toValue: height,
        duration: 400
      }),
      Animated.timing(this.state.backgroundColorOpacity, {
        toValue: 0,
        duration: 400
      })
    ]).start(onClose);
  };

  saveDisabled = () => {
    const { selectedThemes } = this.state;
    // return !selectedThemes.length;
  };

  saveToThemes = async () => {
    const { selectedThemes } = this.state;
    const {
      saveToThemes,
      entityId,
      entityType,
      entitySubType,
      onClose,
      user,
      name,
      creator,
      parentId,
      themes,
      ...restProps
    } = this.props;

    try {
      await saveToThemes({
        themes: selectedThemes,
        entityId,
        entityType,
        entitySubType,
        actor: user,
        entityName: name,
        creator,
        parentId,
        ...restProps
      });
      this.setState({ saved: true });

      Animated.timing(this.state.progressBarWidth, {
        toValue: 1,
        duration: CLOSE_TIME
      }).start(this.hideContentAnimation);
    } catch (err) {
      ErrorModal.showAlert();
    }
  };
}

SaveModal.propTypes = {
  themes: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveToThemes: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  entityId: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(Object.values(entityTypes)).isRequired,
  entitySubType: PropTypes.string,
  user: userScheme,
  name: PropTypes.string,
  creator: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }),
  parentId: PropTypes.string,
  preSelectedThemes: PropTypes.arrayOf(PropTypes.string)
};

// const mapStateToProps = state => ({
//   themes: state.themes.savedThemes,
//   user: state.auth.user
// });

// const mapDispatchToProps = {
//   saveToThemes
// };

// SaveModal = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SaveModal);
export default SaveModal;
