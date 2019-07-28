import React, { Component } from "react";
import RNHTMLView from "react-native-htmlview";
import PropTypes from "prop-types";
import { Text } from "src/components/basicComponents";

class HTMLView extends Component {
  render() {
    const { textComponentProps, RootComponent, ...restProps } = this.props;
    return (
      <RNHTMLView
        RootComponent={RootComponent}
        textComponentProps={{ allowFontScaling: false, ...textComponentProps }}
        {...restProps}
      />
    );
  }
}

HTMLView.defaultProps = {
  textComponentProps: {},
  RootComponent: Text
};

HTMLView.propTypes = {
  RootComponent: PropTypes.func,
  textComponentProps: PropTypes.object
};

export default HTMLView;
