import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "src/components/basicComponents";
import PropTypes from "prop-types";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: daytColors.black,
    paddingTop: 10,
    paddingBottom: 17
  }
});

const FormTitle = ({ children }) => (
  <Text style={styles.text} medium>
    {children}
  </Text>
);

FormTitle.propTypes = {
  children: PropTypes.string
};

export default FormTitle;
