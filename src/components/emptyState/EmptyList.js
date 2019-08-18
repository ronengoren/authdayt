import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { DaytIcon } from "src/assets/icons";
import { stylesScheme } from "src/schemas";

const styles = {
  wrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 150,
    paddingBottom: 350,
    backgroundColor: daytColors.fillGrey
  },
  header: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.buttonGrey,
    marginBottom: 10
  },
  icon: {
    marginBottom: 20
  },
  text: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    color: daytColors.buttonGrey,
    marginBottom: 30
  }
};

const EmptyList = ({ style, title, text, iconName, iconSize }) => (
  <View style={[styles.wrapper, style]}>
    {iconName && (
      <DaytIcon
        name={iconName}
        color={daytColors.buttonGrey}
        size={iconSize}
        style={styles.icon}
      />
    )}
    <Text style={styles.header} medium>
      {title}
    </Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

EmptyList.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  style: stylesScheme
};

export default EmptyList;
