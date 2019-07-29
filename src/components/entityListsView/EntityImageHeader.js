import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { OptionsSelector } from "src/components";
import { Text, Image, IconButton } from "src/components/basicComponents";
import { daytColors, uiConstants } from "src/vars";
import { isHebrewOrArabic } from "src/infra/utils/stringUtils";
import { navigationService } from "src/infra/navigation";
import { AwesomeIcon } from "src/assets/icons";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.white,
    height: 240 + uiConstants.NAVBAR_TOP_MARGIN
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10
  },
  title: {
    marginBottom: 3,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  backButton: {
    position: "absolute",
    top: 25 + uiConstants.NAVBAR_TOP_MARGIN,
    left: 12,
    zIndex: 1000
  },
  createButton: {
    position: "absolute",
    top: 25 + uiConstants.NAVBAR_TOP_MARGIN,
    right: 12,
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  createEntityButtonIcon: {
    marginTop: 2,
    marginLeft: 6,
    lineHeight: 21
  },
  options: {
    backgroundColor: daytColors.transparent,
    position: "absolute",
    bottom: 0,
    left: 0,
    marginTop: 15,
    marginBottom: 5
  },
  optionSelector: {
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: daytColors.lightWhite,
    borderWidth: 0
  },
  optionSelectorText: {
    color: daytColors.white
  },
  children: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

class EntityImageHeader extends Component {
  render() {
    const {
      title,
      subTitle,
      image,
      withBackButton,
      createAction,
      optionsList,
      style,
      children
    } = this.props;
    const isHebrewSubTitle = isHebrewOrArabic(subTitle);

    return (
      <React.Fragment>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <View style={[styles.container, style]}>
          <Image source={image} style={styles.image} />
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.textSection}>
              <Text
                size={32}
                lineHeight={35}
                color={daytColors.white}
                bold
                style={styles.title}
              >
                {title}
              </Text>
              <Text
                size={isHebrewSubTitle ? 18 : 16}
                lineHeight={isHebrewSubTitle ? 24 : 18}
                color={daytColors.white}
                bold
              >
                {subTitle}
              </Text>
            </View>
          </View>
          {!!children && <View style={styles.children}>{children}</View>}
          {!!optionsList && this.renderOptionsList()}
          {withBackButton && this.renderBackButton()}
          {!!createAction && this.renderCreateButton()}
        </View>
      </React.Fragment>
    );
  }

  renderOptionsList = () => {
    const {
      color,
      optionsList,
      chosenIndex,
      selectOptionAction,
      showOptionAll
    } = this.props;

    return (
      <OptionsSelector
        optionsList={optionsList}
        color={color}
        style={styles.options}
        textStyle={styles.optionSelectorText}
        optionStyle={styles.optionSelector}
        selectedOptionIndex={chosenIndex}
        selectOption={selectOptionAction}
        showOptionAll={showOptionAll}
      />
    );
  };

  renderBackButton = () => (
    <IconButton
      name="back-arrow"
      iconColor="white"
      iconSize={26}
      onPress={navigationService.goBack}
      style={styles.backButton}
      hitSlop={{ left: 15, right: 15, top: 15, bottom: 30 }}
    />
  );

  renderCreateButton = () => {
    const { createAction, createBtnText } = this.props;
    return (
      <TouchableOpacity
        testID="createEvent"
        onPress={createAction}
        style={styles.createButton}
        activeOpacity={1}
      >
        <Text size={16} lineHeight={21} color={daytColors.white}>
          {createBtnText}
        </Text>
        <AwesomeIcon
          name="plus-circle"
          color={daytColors.white}
          size={16}
          weight="solid"
          style={styles.createEntityButtonIcon}
        />
      </TouchableOpacity>
    );
  };
}

EntityImageHeader.defaultProps = {
  withBackButton: true,
  showOptionAll: true
};

EntityImageHeader.propTypes = {
  showOptionAll: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.string,
  optionsList: PropTypes.array,
  chosenIndex: PropTypes.number,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  image: PropTypes.number,
  createAction: PropTypes.func,
  createBtnText: PropTypes.string,
  selectOptionAction: PropTypes.func,
  withBackButton: PropTypes.bool,
  style: stylesScheme
};

export default EntityImageHeader;
