import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  View,
  Text,
  TranslatedText
} from "src/components/basicComponents";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import { daytColors, commonStyles } from "src/vars";

const LEFT_PADDING = 16;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 26
  },
  label: {
    marginBottom: 10,
    paddingHorizontal: LEFT_PADDING
  },
  input: {
    backgroundColor: daytColors.white,
    width: "100%",
    height: 55,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: LEFT_PADDING,
    fontSize: 16,
    lineHeight: 19,
    color: daytColors.b60
  },
  inputIcon: {
    marginRight: 8
  },
  valueIcon: {
    marginRight: 9
  },
  inputWrapperWithAbsoluteButton: {
    height: 55
  },
  absoluteIconWrapper: {
    position: "absolute",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    left: LEFT_PADDING
  }
});

class OnboardingInputField extends Component {
  render() {
    const { isDummy, label, onPress } = this.props;
    const icon = this.getIconProps();

    return (
      <View style={styles.container}>
        <TranslatedText
          bold
          size={16}
          lineHeight={19}
          color={daytColors.b30}
          style={styles.label}
          forceLtr
        >
          {label}
        </TranslatedText>
        {isDummy ? (
          <TouchableOpacity
            style={[styles.input, commonStyles.shadow]}
            onPress={onPress}
          >
            {icon}
            {/* {this.renderInput()} */}
          </TouchableOpacity>
        ) : (
          <View style={[styles.inputWrapperWithAbsoluteButton]}>
            {/* {this.renderInput()} */}
            <View style={[styles.absoluteIconWrapper]}>{icon}</View>
          </View>
        )}
      </View>
    );
  }
  //   componentDidUpdate(prevProps) {
  //     const { value, isDummy } = this.props;
  //     if (prevProps.value !== value && isDummy) {
  //       this.onChangeInput(value);
  //     }
  //   }
  renderInput() {
    const { isDummy, label, placeholderText, inputProps, testID } = this.props;
    // const { value } = this.state;

    return isDummy ? (
      <Text size={16} lineHeight={19} color={daytColors.b60} testID={testID}>
        {placeholderText}
      </Text>
    ) : (
      <TextInput
        // placeholder={value ? label : placeholderText}
        inputStyle={[
          styles.input,
          commonStyles.shadow,
          { paddingLeft: LEFT_PADDING * 3 }
        ]}
        // value={value}
        onChange={this.onChangeInput}
        autoCorrect={false}
        testID={testID}
        {...inputProps}
      />
    );
  }
  getIconProps = () => {
    const { placeholderIconName } = this.props;
    // const { value, isValid } = this.state;
    const iconColor = daytColors.b60;
    // if (value && isValid) {
    return (
      //     <AwesomeIcon
      //       name="check-circle"
      //       size={20}
      //       color={daytColors.green}
      //       weight="solid"
      //       style={styles.valueIcon}
      //       key="icon"
      //     />
      //   );
      // }
      // if (placeholderIconName === "search") {
      //   return (
      //     <HomeisIcon
      //       key="icon"
      //       name="search"
      //       color={iconColor}
      //       size={22}
      //       style={styles.inputIcon}
      //     />
      //   );
      // } else if (placeholderIconName === "envelope") {
      //   return (
      //     <HomeisIcon
      //       key="icon"
      //       name={placeholderIconName}
      //       color={iconColor}
      //       size={22}
      //       style={styles.inputIcon}
      //     />
      //   );
      // } else if (placeholderIconName === "calendar") {
      //   return (
      <AwesomeIcon
        key="icon"
        name={placeholderIconName}
        color={iconColor}
        size={18}
        style={(styles.inputIcon, { marginLeft: 1, marginRight: 12 })}
      />
    );
    // }

    // return null;
  };
  //   onChangeInput = value => {
  //     const { onChange, validate } = this.props;
  //     const isValid = validate && !!value ? validate(value) : !!value;
  //     this.setState({ value, isValid });
  //     if (onChange) {
  //       onChange({ value, isValid });
  //     }
  //   };
  //   getIconProps = () => {
  //     const { placeholderIconName } = this.props;
  //     const { value, isValid } = this.state;
  //     const iconColor = daytColors.b60;
  //     if (value && isValid) {
  //       return (
  //         <AwesomeIcon
  //           name="check-circle"
  //           size={20}
  //           color={daytColors.green}
  //           weight="solid"
  //           style={styles.valueIcon}
  //           key="icon"
  //         />
  //       );
  //     }
  //     if (placeholderIconName === "search") {
  //       return (
  //         <DaytIcon
  //           key="icon"
  //           name="search"
  //           color={iconColor}
  //           size={22}
  //           style={styles.inputIcon}
  //         />
  //       );
  //     } else if (placeholderIconName === "envelope") {
  //       return (
  //         <DaytIcon
  //           key="icon"
  //           name={placeholderIconName}
  //           color={iconColor}
  //           size={22}
  //           style={styles.inputIcon}
  //         />
  //       );
  //     } else if (placeholderIconName === "calendar") {
  //       return (
  //         <AwesomeIcon
  //           key="icon"
  //           name={placeholderIconName}
  //           color={iconColor}
  //           size={18}
  //           style={(styles.inputIcon, { marginLeft: 1, marginRight: 12 })}
  //         />
  //       );
  //     }

  //     return null;
  //   };
}

export default OnboardingInputField;
