import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, Animated, Platform, StyleSheet } from "react-native";
import I18n from "../../infra/localization";
import { View } from "../../components/basicComponents";
import { daytColors, daytFonts, daytFontWeights } from "../../vars";
import { stylesScheme } from "../../schemas";

const LABEL_BOTTOM_TOP = 32;
const LABEL_BOTTOM_CENTER = 8;
const LABEL_FONT_SIZE_TOP = 12;
const LABEL_FONT_SIZE_CENTER = 16;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: daytColors.b90,
    paddingTop: 25,
    paddingBottom: 1,
    marginBottom: 10,
    flexGrow: 1
  },
  containerFocused: {
    borderColor: daytColors.azure,
    borderBottomWidth: 2,
    paddingBottom: 0
  },
  containerWithError: {
    borderColor: daytColors.red,
    borderBottomWidth: 2,
    paddingBottom: 0
  },
  label: {
    color: daytColors.b60,
    position: "absolute",
    left: Platform.select({ ios: 0, android: 4 }),
    paddingBottom: 1,
    fontFamily: daytFonts.regular,
    fontWeight: daytFontWeights.regular
  },
  labelFocused: {
    paddingBottom: 0
  },
  labelWithError: {
    paddingBottom: 0,
    color: daytColors.red,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium
  },
  labelInputWithText: {
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium
  },
  input: {
    height: Platform.select({ ios: 35, android: 41 }),
    fontSize: 16,
    color: daytColors.b30
  }
});

class FormInput extends Component {
  constructor(props) {
    super(props);
    const { value, isInitiallyFocused } = props;
    const initialValue = value || "";
    this.state = {
      isFocused: isInitiallyFocused,
      labelBottom: new Animated.Value(
        initialValue ? LABEL_BOTTOM_TOP : LABEL_BOTTOM_CENTER
      ),
      labelFontSize: new Animated.Value(
        initialValue ? LABEL_FONT_SIZE_TOP : LABEL_FONT_SIZE_CENTER
      )
    };
  }
  render() {
    const {
      label,
      style,
      value,
      errorText,
      onChange,
      isValid,
      inputStyle,
      onFocus,
      ...restProps
    } = this.props;

    const { isFocused, labelBottom, labelFontSize } = this.state;
    const inputValue = value || "";
    const inputErrorText = errorText || "";
    const labelText = inputErrorText || label;
    return (
      <View
        style={[
          styles.container,
          style,
          // isFocused && styles.containerFocused,
          !!inputErrorText && styles.containerWithError
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            isFocused && styles.labelFocused,
            !!inputErrorText && styles.labelWithError,
            !!inputValue && styles.labelInputWithText,
            { bottom: labelBottom, fontSize: labelFontSize }
          ]}
        >
          {labelText}
        </Animated.Text>
        <TextInput
          style={[styles.input, inputStyle]}
          selectionColor={daytColors.azure}
          onChangeText={this.handleInputChanged}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          value={inputValue}
          spellCheck
          ref={node => {
            this.textInput = node;
          }}
          underlineColorAndroid={daytColors.transparent}
          {...restProps}
        />
      </View>
    );
  }
}

export default FormInput;
