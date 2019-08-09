import React, { Component } from "react";
import I18n from "src/infra/localization";
import PropTypes from "prop-types";
import { ScrollView, Chip, Text } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { StyleSheet } from "react-native";
import { daytColors, daytFontWeights } from "src/vars";
import { screenNames, entityTypes } from "src/vars/enums";
import { navigationService } from "src/infra/navigation";
import { hasNotch } from "src/infra/utils/deviceUtils";

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 0,
    height: 56,
    backgroundColor: daytColors.paleGreyTwo,
    borderTopWidth: 1,
    borderTopColor: daytColors.b90
  },
  containerWithExtraPadding: {
    height: 66,
    paddingBottom: 10
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 15
  },
  title: {
    marginRight: 15
  },
  chip: {
    borderRadius: 19,
    paddingHorizontal: 14,
    marginRight: 7
  },
  chipText: {
    fontWeight: daytFontWeights.bold,
    fontSize: 13
  },
  showAllChipText: {
    fontWeight: daytFontWeights.regular,
    color: daytColors.azure
  }
});

class ContextSlider extends Component {
  render() {
    const { context, isLocked, isKeyboardShown } = this.props;
    const hasContext = !!(context && context.id);

    if (isLocked && !hasContext) {
      return null;
    }

    return (
      <ScrollView
        horizontal
        style={[
          styles.conatiner,
          this.hasNotch && !isKeyboardShown && styles.containerWithExtraPadding
        ]}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {hasContext ? this.renderChosenChip() : this.renderOptions()}
      </ScrollView>
    );
  }

  renderChosenChip() {
    const { context, isLocked, updateContext } = this.props;

    return (
      <Chip style={styles.chip} textStyle={styles.chipText}>
        {context.name}
        {!isLocked && (
          <Text
            color={daytColors.azure}
            onPress={() => updateContext({})}
            lineHeight={35}
          >
            {" \u00b7 "}
            {I18n.t("post_editor.context_slider.change")}
          </Text>
        )}
      </Chip>
    );
  }

  renderOptions() {
    const { topics, additionalContexts, hasGroups, updateContext } = this.props;
    const content = [
      <Text
        size={13}
        lineHeight={15}
        color={daytColors.b60}
        key="title"
        style={styles.title}
      >
        {I18n.t("post_editor.post_in")}
      </Text>
    ];

    if (additionalContexts) {
      content.push(
        additionalContexts.map(context => (
          <Chip
            key={context.id}
            onPress={() => updateContext(context)}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {context.name}
          </Chip>
        ))
      );
    }

    if (topics) {
      content.push(
        topics.map(topic => (
          <Chip
            key={topic.id}
            onPress={() =>
              updateContext({ ...topic, entityType: entityTypes.GROUP })
            }
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {topic.name}
          </Chip>
        ))
      );
    }

    if (hasGroups) {
      content.push(
        <Chip
          key="showAll"
          style={styles.chip}
          textStyle={[styles.chipText, styles.showAllChipText]}
          onPress={this.navigateToContextPicker}
        >
          {I18n.t("post_editor.context_slider.show_all_chip")}{" "}
          <AwesomeIcon
            name="caret-down"
            size={14}
            color={daytColors.azure}
            weight="solid"
          />
        </Chip>
      );
    }

    return content;
  }

  hasNotch = hasNotch();

  navigateToContextPicker = () => {
    navigationService.navigate(screenNames.ContextPicker, {
      onContextChosen: this.updateContext
    });
  };

  updateContext = context => this.props.updateContext(context);
}

ContextSlider.propTypes = {
  context: PropTypes.object,
  additionalContexts: PropTypes.arrayOf(PropTypes.object),
  topics: PropTypes.arrayOf(PropTypes.object),
  isLocked: PropTypes.bool,
  hasGroups: PropTypes.bool,
  updateContext: PropTypes.func,
  isKeyboardShown: PropTypes.bool
};

export default ContextSlider;
