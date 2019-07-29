import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "src/components/basicComponents";
import { dayIcon, AwesomeIcon } from "src/assets/icons";
import { dayColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,
    paddingHorizontal: 60
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyStateIcon: {
    marginBottom: 20
  },
  emptyStateHeader: {
    textAlign: "center",
    marginBottom: 10
  },
  emptyStateText: {
    textAlign: "center"
  }
});

class GenericEmptyState extends React.Component {
  render() {
    const {
      image,
      imageStyle,
      resizeMode,
      headerText,
      bodyText,
      style,
      isdayIcon,
      iconName
    } = this.props;
    const Icon = isdayIcon ? dayIcon : AwesomeIcon;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.innerContainer}>
          {!!image && (
            <Image source={image} style={imageStyle} resizeMode={resizeMode} />
          )}
          {iconName && (
            <Icon
              name={iconName}
              size={80}
              color={dayColors.b90}
              style={styles.emptyStateIcon}
              weight="solid"
            />
          )}
          <Text
            size={22}
            lineHeight={30}
            color={dayColors.b60}
            medium
            style={styles.emptyStateHeader}
          >
            {headerText}
          </Text>
          {!!bodyText && (
            <Text
              size={15}
              lineHeight={22}
              color={dayColors.b60}
              medium
              style={styles.emptyStateText}
            >
              {bodyText}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

GenericEmptyState.propTypes = {
  imageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ]),
  resizeMode: PropTypes.string,
  isdayIcon: PropTypes.bool,
  iconName: PropTypes.string,
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  style: stylesScheme
};

export default GenericEmptyState;
