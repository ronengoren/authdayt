import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  PlaceholderRectangle
} from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors, commonStyles } from "src/vars";
import { getInitials } from "src/infra/utils/stringUtils";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 135,
    borderRadius: 10,
    backgroundColor: daytColors.white,
    marginTop: 15,
    marginBottom: 25,
    marginRight: 10
  },
  image: {
    width: 100,
    height: 85,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: daytColors.b90,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  text: {
    marginBottom: 7,
    marginHorizontal: 10
  },
  placeholder: {
    marginLeft: 10
  },
  badgeOuter: {
    position: "absolute",
    top: 8,
    left: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: daytColors.white
  },
  badgeInner: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: daytColors.pinkishRed
  },
  badgeIcon: {
    lineHeight: 15,
    marginLeft: Platform.select({ ios: 1, android: 0 })
  }
});

class EntityCard extends Component {
  static renderPlaceholder = ({ marginRight, index }) => (
    <View
      style={[commonStyles.shadow, styles.container, { marginRight }]}
      key={index}
    >
      <View style={styles.image} />
      <PlaceholderRectangle width={70} style={styles.placeholder} />
      <PlaceholderRectangle width={50} style={styles.placeholder} />
    </View>
  );

  render() {
    const { imageSrc, text, index, firstItemStyle, showItemBadge } = this.props;
    const [firstWord, ...restWords] = text.split(" ");

    return (
      <TouchableOpacity
        style={[
          commonStyles.shadow,
          styles.container,
          index === 0 && firstItemStyle
        ]}
        onPress={this.handlePress}
      >
        {imageSrc ? (
          <Image source={imageSrc} style={styles.image} />
        ) : (
          this.renderImagePlaceholder()
        )}
        <View style={styles.text}>
          <Text
            size={14}
            lineHeight={17}
            color={daytColors.b30}
            numberOfLines={1}
          >
            {firstWord}
          </Text>
          <Text
            size={14}
            lineHeight={17}
            color={daytColors.b30}
            numberOfLines={1}
          >
            {restWords.join(" ")}
          </Text>
        </View>
        {showItemBadge && (
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <DaytIcon
                name="star"
                size={16}
                color={daytColors.white}
                style={styles.badgeIcon}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  renderImagePlaceholder() {
    const { isUserEntity, themeColor, text } = this.props;
    const initials = getInitials(text);

    return (
      <View
        style={[
          styles.image,
          isUserEntity && { backgroundColor: `#${themeColor}` }
        ]}
      >
        {isUserEntity ? (
          <Text bold size={40} lineHeight={48} color={daytColors.white70}>
            {initials}
          </Text>
        ) : (
          <DaytIcon name="groups-fill" color={daytColors.white70} size={32} />
        )}
      </View>
    );
  }

  handlePress = () => {
    const { onPress, id, text, imageSrc, themeColor } = this.props;
    const params = { entityId: id, data: { name: text, themeColor } };
    if (typeof imageSrc === "object") {
      params.data.thumbnail = imageSrc;
    }
    onPress(params);
  };
}

EntityCard.propTypes = {
  firstItemStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  imageSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]),
  text: PropTypes.string,
  index: PropTypes.number,
  showItemBadge: PropTypes.bool,
  onPress: PropTypes.func,
  id: PropTypes.string,
  themeColor: PropTypes.string,
  isUserEntity: PropTypes.bool
};

export default EntityCard;
