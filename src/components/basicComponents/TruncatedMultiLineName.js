import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";

class TruncatedMultiLineName extends React.PureComponent {
  render = () => {
    const {
      name,
      style,
      size,
      lineHeight,
      color,
      bold,
      centerText
    } = this.props;

    if (!name) {
      return null;
    }

    const capitalizedName = name.replace(
      /(^|\s)([a-z])/g,
      (m, p1, p2) => p1 + p2.toUpperCase()
    );
    const [firstName, ...restName] = capitalizedName.split(" ");
    return (
      <View style={style}>
        <Text
          size={size}
          lineHeight={lineHeight}
          color={color}
          numberOfLines={1}
          bold={bold}
          style={[centerText && commonStyles.textAlignCenter]}
        >
          {firstName}
        </Text>
        <Text
          size={size}
          lineHeight={lineHeight}
          color={color}
          numberOfLines={1}
          bold={bold}
          style={[centerText && commonStyles.textAlignCenter]}
        >
          {restName.join(" ")}
        </Text>
      </View>
    );
  };
}

TruncatedMultiLineName.defaultProps = {
  color: daytColors.b30
};

TruncatedMultiLineName.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.number,
  lineHeight: PropTypes.number,
  color: PropTypes.string,
  bold: PropTypes.bool,
  centerText: PropTypes.bool
};

export default TruncatedMultiLineName;
