import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import {
  View,
  TextInput,
  QueryCancelIcon,
  Text
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { isRTL } from "src/infra/utils/stringUtils";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: daytColors.veryLightPink
  },
  inputWrapper: {
    width: "100%",
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: daytColors.transparent
  },
  inputWrapperFocused: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.azure
  },
  input: {
    width: "100%",
    height: "100%",
    padding: 0,
    paddingRight: 20,
    paddingLeft: 11,
    fontSize: 16,
    lineHeight: 19,
    color: daytColors.b30,
    borderRadius: 10,
    textAlign: "left"
  },
  cancelIcon: {
    top: 12
  },
  searchIcon: {
    position: "absolute",
    left: 11,
    width: 30,
    height: 40,
    lineHeight: 40
  },
  searchIconRTL: {
    position: "absolute",
    right: -4,
    width: 30,
    height: 40,
    lineHeight: 38
  },
  inputPlaceholder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 33,
    right: 15,
    lineHeight: 36
  },
  inputPlaceholderRTL: {
    left: 15,
    right: 33,
    textAlign: "right",
    lineHeight: 38
  }
});

class HeaderSearchInput extends React.Component {
  state = {
    isFocused: false
  };

  render() {
    const { searchMode, onPress, onCancel, value, ...restProps } = this.props;
    const { isFocused } = this.state;
    const placeHolderText = I18n.t("home.search_placeholder");
    const isRTLText = isRTL(placeHolderText);
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onPress}
      >
        <View
          pointerEvents={searchMode ? "auto" : "none"}
          style={styles.inputWrapper}
        >
          <TextInput
            ref={node => {
              this.textInput = node;
            }}
            containerStyle={[
              styles.inputWrapper,
              isFocused && styles.inputWrapperFocused
            ]}
            inputStyle={styles.input}
            autoCapitalize={"none"}
            value={value}
            placeholder={searchMode ? I18n.t("header.search") : ""}
            placeholderTextColor={daytColors.b60}
            autoFocus={searchMode}
            autoCorrect={false}
            onFocus={() => !isFocused && this.setState({ isFocused: true })}
            onBlur={() => isFocused && this.setState({ isFocused: false })}
            forceLTR
            testID="headerSearchInput"
            {...restProps}
          />
          {searchMode && !!value && (
            <QueryCancelIcon
              onPress={onCancel}
              iconColor={daytColors.b60}
              style={styles.cancelIcon}
            />
          )}
          {!searchMode && [
            <AwesomeIcon
              name="search"
              size={16}
              color={daytColors.b60}
              weight="solid"
              style={isRTLText ? styles.searchIconRTL : styles.searchIcon}
              key="icon"
            />,
            <Text
              size={16}
              color={daytColors.b60}
              style={[
                styles.inputPlaceholder,
                isRTLText && styles.inputPlaceholderRTL
              ]}
              numberOfLines={1}
              key="placeholder"
            >
              {placeHolderText}
            </Text>
          ]}
        </View>
      </TouchableOpacity>
    );
  }

  focus() {
    this.textInput && this.textInput.focus();
  }
}

HeaderSearchInput.propTypes = {
  searchMode: PropTypes.bool,
  value: PropTypes.string,
  onPress: PropTypes.func,
  onCancel: PropTypes.func
};

export default HeaderSearchInput;
