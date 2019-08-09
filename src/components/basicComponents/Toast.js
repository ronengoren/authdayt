import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Animated } from "react-native";
import { uiConstants, daytColors } from "src/vars";

const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 3
  }
});

class Toast extends Component {
  state = {
    toastPosition: new Animated.Value(0)
  };

  render() {
    const { toastPosition } = this.state;
    const { toastTopPosition, color, children } = this.props;

    return (
      <Animated.View
        style={[
          styles.toastWrapper,
          {
            backgroundColor: color,
            top: toastTopPosition,
            transform: [{ translateY: toastPosition }]
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.showToast) {
      this.showToast();
    } else if (prevProps.showToast) {
      this.hideToast();
    }
  }

  showToast = () => {
    const { toastBottomPosition } = this.props;
    this.state.toastPosition.stopAnimation();
    clearTimeout(this.timeOut);
    Animated.timing(this.state.toastPosition, {
      toValue: toastBottomPosition,
      duration: 300,
      useNativeDriver: true
    }).start();
    this.timeOut = setTimeout(this.hideToast, 3000);
  };

  hideToast = () => {
    const { onComplete } = this.props;
    this.state.toastPosition.stopAnimation();
    Animated.timing(this.state.toastPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => onComplete && onComplete({}));
  };
}

Toast.defaultProps = {
  color: daytColors.green,
  toastTopPosition: 0,
  toastBottomPosition: 45 + uiConstants.PHONE_BAR_HEIGHT
};

Toast.propTypes = {
  color: PropTypes.string,
  showToast: PropTypes.bool
};

Toast.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showToast: PropTypes.bool,
  toastTopPosition: PropTypes.number,
  toastBottomPosition: PropTypes.number,
  onComplete: PropTypes.func,
  color: PropTypes.string
};

export default Toast;
