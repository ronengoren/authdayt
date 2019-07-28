import React from "react";
import PropTypes from "prop-types";
import { TextInput as RnTextInput, StyleSheet } from "react-native";
import { View } from "src/components/basicComponents";
import { daytColors, daytFonts, daytFontWeights, uiConstants } from "src/vars";
import { isRTL } from "src/infra/utils/stringUtils";

const styles = StyleSheet.create({
  container: {
    height: 40
  },
  input: {
    padding: 10,
    height: 40,
    borderBottomWidth: 0,
    fontSize: 14,
    fontFamily: daytFonts.regular,
    fontWeight: daytFontWeights.regular,
    textAlign: "left"
  },
  rtlStyle: {
    textAlign: "right"
  }
});

class TextInput extends React.Component {
  render() {
    const {
      children,
      inputStyle,
      containerStyle,
      height,
      value,
      placeholder,
      forceLTR,
      ...props
    } = this.props;
    const isRtl = !forceLTR && isRTL(value || placeholder);
    const alignedValue = isRtl ? `\u200F${value}` : value;
    return (
      <View style={[styles.container, containerStyle, height && { height }]}>
        <RnTextInput
          ref={node => {
            this.input = node;
          }}
          underlineColorAndroid="transparent"
          style={[
            styles.input,
            inputStyle,
            isRtl && styles.rtlStyle,
            height && { height }
          ]}
          onChangeText={this.handleChange}
          value={value ? alignedValue : ""}
          selectionColor={daytColors.azure}
          placeholder={placeholder}
          placeholderTextColor={daytColors.b60}
          hitSlop={uiConstants.BTN_HITSLOP}
          {...props}
        />
        {children}
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value && !this.props.value) {
      this.handleChange(null);
    }
  }

  handleChange = val => {
    const { onChange, onChangeDebounced, debounceTime } = this.props;
    const nonAlignedValue = val ? val.replace(/\u200F/g, "") : val;
    if (onChange) {
      onChange(nonAlignedValue);
    }

    if (onChangeDebounced) {
      clearTimeout(this.debounceTimeout);

      if (!nonAlignedValue) {
        onChangeDebounced(nonAlignedValue);
      } else {
        this.debounceTimeout = setTimeout(
          () => onChangeDebounced(nonAlignedValue),
          debounceTime || 100
        );
      }
    }
  };

  focus() {
    return this.input.focus();
  }

  blur() {
    return this.input.blur();
  }
}

TextInput.propTypes = {
  children: PropTypes.node,
  inputStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  containerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  value: PropTypes.string,
  height: PropTypes.number,
  onChange: PropTypes.func,
  onChangeDebounced: PropTypes.func,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  forceLTR: PropTypes.bool
};

export default TextInput;
