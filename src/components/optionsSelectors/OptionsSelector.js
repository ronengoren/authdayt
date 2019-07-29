import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView } from "react-native";
import I18n from "src/infra/localization";
import { View, Chip } from "src/components/basicComponents";
import {
  camelCase,
  addSpaceOnCapitalsAndCapitalize
} from "src/infra/utils/stringUtils";
import { daytColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  optionsWrapper: {
    marginBottom: -10,
    backgroundColor: daytColors.paleGreyTwo
  },
  optionsScrollContext: {
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 10
  },
  innerOptionsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

class OptionsSelector extends PureComponent {
  static ALL_OPTION_INDEX = -1;

  render() {
    const { style, infiniteScroll } = this.props;
    return (
      <View style={[styles.optionsWrapper, style]}>
        {infiniteScroll ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            horizontal
            contentContainerStyle={styles.optionsScrollContext}
            removeClippedSubviews={false}
            showsHorizontalScrollIndicator={false}
          >
            {this.renderOptions()}
          </ScrollView>
        ) : (
          <View style={styles.innerOptionsWrapper}>{this.renderOptions()}</View>
        )}
      </View>
    );
  }

  renderOptions = () => {
    const {
      optionsList,
      selectedOptionIndex,
      selectOption,
      color,
      optionStyle,
      textStyle,
      showOptionAll,
      optionAllCustomName
    } = this.props;
    let options = [];

    if (optionsList && optionsList.length) {
      options = optionsList.map((option, index) => (
        <Chip
          testID={`optionSelector_${camelCase(option)}`}
          style={optionStyle}
          color={color}
          active={index === selectedOptionIndex}
          key={option}
          onPress={() => selectOption(index)}
          textStyle={textStyle}
        >
          {addSpaceOnCapitalsAndCapitalize(option)}
        </Chip>
      ));
    }

    if (showOptionAll) {
      options.splice(
        0,
        0,
        <Chip
          style={optionStyle}
          textStyle={textStyle}
          color={color}
          active={selectedOptionIndex === OptionsSelector.ALL_OPTION_INDEX}
          key="allChip"
          onPress={() => selectOption(OptionsSelector.ALL_OPTION_INDEX)}
        >
          {optionAllCustomName || I18n.t("themes.all")}
        </Chip>
      );
    }
    return options;
  };
}

OptionsSelector.defaultProps = {
  color: daytColors.green,
  infiniteScroll: true
};

OptionsSelector.propTypes = {
  optionsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectOption: PropTypes.func.isRequired,
  selectedOptionIndex: PropTypes.number,
  color: PropTypes.string,
  showOptionAll: PropTypes.bool,
  optionAllCustomName: PropTypes.string,
  style: stylesScheme,
  textStyle: stylesScheme,
  optionStyle: stylesScheme,
  infiniteScroll: PropTypes.bool
};

export default OptionsSelector;