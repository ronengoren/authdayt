import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { View, Text } from "src/components/basicComponents";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import {
  postTypes,
  uiColorDefinitions,
  uiDefinitions,
  entityTypes
} from "src/vars/enums";
import { stylesScheme } from "src/schemas/common";
import {
  addSpaceOnCapitalsAndCapitalize,
  isHebrewOrArabic
} from "src/infra/utils/stringUtils";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignContent: "center"
  },
  alignedLeft: {
    textAlign: "left"
  },
  icon: {
    marginRight: 5
  },
  chevron: {
    marginHorizontal: 3,
    lineHeight: 15
  }
});

const HIT_SLOP = { left: 2, right: 2, top: 5, bottom: 5 };

class BreadCrumbs extends React.Component {
  render() {
    const {
      entityType,
      postType,
      mainTag,
      action,
      mainAction,
      isArrowShown,
      mediumText,
      style
    } = this.props;
    const color = uiColorDefinitions[entityType || postType];
    const {
      isDaytIcon,
      name,
      breadcrumbIconSize,
      breadcrumbLineHeight
    } = uiDefinitions[entityType || postType];
    const IconComponent = isDaytIcon ? DaytIcon : AwesomeIcon;
    const isSmallFont = isHebrewOrArabic(mainTag);
    return (
      <View style={styles.wrapper}>
        <IconComponent
          name={name}
          color={color}
          size={breadcrumbIconSize || 12}
          weight="solid"
          style={[styles.icon, { lineHeight: breadcrumbLineHeight || 14 }]}
        />
        <Text
          medium={mediumText}
          key={mainTag}
          size={isSmallFont ? 14 : 13}
          lineHeight={isSmallFont ? 17 : 15}
          hitslop={HIT_SLOP}
          onPress={mainAction || action}
          style={[{ color }, styles.alignedLeft, style]}
        >
          {mainTag}
        </Text>
        {!!isArrowShown && (
          <AwesomeIcon
            name="chevron-right"
            color={color}
            size={10}
            weight="solid"
            style={styles.chevron}
          />
        )}
        {this.renderSubTags(color)}
      </View>
    );
  }

  renderSubTags = color => {
    const { tags, mainTag, action, mediumText } = this.props;
    if (!tags || !tags.length) {
      return null;
    }
    const renderedSubTags = [];
    tags.forEach((tag, index) => {
      renderedSubTags.push(
        <Text
          size={13}
          lineHeight={15}
          color={color}
          hitslop={HIT_SLOP}
          onPress={() => action(tag)}
          medium={mediumText}
          style={styles.alignedLeft}
          key={`${mainTag}subTag${tag}`}
        >
          {I18n.t(`shared.tags.${tag}`, {
            defaultValue: addSpaceOnCapitalsAndCapitalize(tag)
          })}
        </Text>
      );
      if (index < tags.length - 1) {
        renderedSubTags.push(
          <AwesomeIcon
            name="chevron-right"
            color={color}
            size={11}
            weight="solid"
            style={styles.chevron}
            key={`${mainTag}Icon${tag}`}
          />
        );
      }
    });
    return renderedSubTags;
  };
}

BreadCrumbs.defaultProps = {
  isArrowShown: true,
  mediumText: true
};

BreadCrumbs.propTypes = {
  entityType: PropTypes.oneOf(Object.values(entityTypes)),
  postType: PropTypes.oneOf(Object.values(postTypes)),
  style: stylesScheme,
  tags: PropTypes.arrayOf(PropTypes.string),
  mainTag: PropTypes.string,
  action: PropTypes.func,
  mainAction: PropTypes.func,
  isArrowShown: PropTypes.bool,
  mediumText: PropTypes.bool
};

export default BreadCrumbs;
