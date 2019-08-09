import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, Triangle } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";
import {
  postTypes,
  entityTypes,
  screenGroupNames,
  uiDefinitions,
  uiColorDefinitions
} from "src/vars/enums";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 10 + uiConstants.FOOTER_MARGIN_BOTTOM,
    borderTopWidth: 1,
    borderTopColor: daytColors.disabledGrey,
    backgroundColor: daytColors.white
  },
  dummyItem: {
    width: 110,
    height: 10
  },
  pickerIconWrapper: {
    width: 110,
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10
  },
  pickerIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 22,
    backgroundColor: daytColors.green
  },
  pickerIconTextWrapper: {
    marginTop: 5
  },
  pickerIconText: {
    textAlign: "center"
  }
});

class PostTypePicker extends Component {
  render() {
    const postTypesList = this.createPostTypeList();
    return (
      <View style={styles.wrapper}>
        {this.renderPostTypeSelectors({ postTypesList })}
      </View>
    );
  }

  renderPostTypeSelectors = ({ postTypesList }) => {
    const res = postTypesList.map(type => this.renderPostTypeIcon(type));
    while (res.length < 6) {
      res.push(<View key={res.length} style={styles.dummyItem} />);
    }
    if (postTypesList.length > 6) {
      while (res.length < 9) {
        res.push(<View key={res.length} style={styles.dummyItem} />);
      }
    }
    return res;
  };

  renderPostTypeIcon = type => {
    const text = I18n.t(`post_editor.post_type_definitions.${type}.text`);
    const { iconSize, name: iconName } = uiDefinitions[type];
    const color = uiColorDefinitions[type];
    return (
      <TouchableOpacity
        onPress={() => this.handlePostTypePress(type)}
        activeOpacity={0.5}
        style={styles.pickerIconWrapper}
        testID={`${type}PostType`}
        key={type}
      >
        <View style={[styles.pickerIcon, { backgroundColor: color }]}>
          <AwesomeIcon
            name={iconName}
            weight="solid"
            size={iconSize}
            color={daytColors.white}
          />
        </View>
        <Triangle color={color} direction="down" width={14} height={7} />
        <View style={styles.pickerIconTextWrapper}>
          <Text
            size={14}
            lineHeight={17}
            medium
            numberOfLines={1}
            style={styles.pickerIconText}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  createPostTypeList = () => {
    const { postIn, publishAs, customPostTypesList } = this.props;
    if (customPostTypesList) {
      return customPostTypesList;
    } else if (postIn.entityType === entityTypes.NEIGHBORHOOD) {
      return [
        postTypes.TIP_REQUEST,
        postTypes.RECOMMENDATION,
        entityTypes.EVENT,
        postTypes.GUIDE,
        postTypes.JOB,
        postTypes.GIVE_TAKE,
        postTypes.REAL_ESTATE,
        postTypes.PROMOTION
      ];
    } else if (postIn.entityType === entityTypes.EVENT) {
      return [
        postTypes.TIP_REQUEST,
        postTypes.RECOMMENDATION,
        entityTypes.LIST,
        postTypes.GUIDE,
        postTypes.PROMOTION
      ];
    } else if (
      [publishAs.type, publishAs.entityType].includes(entityTypes.PAGE)
    ) {
      return [
        postTypes.GUIDE,
        entityTypes.LIST,
        postTypes.PROMOTION,
        postTypes.JOB,
        postTypes.REAL_ESTATE,
        postTypes.TIP_REQUEST,
        postTypes.RECOMMENDATION,
        entityTypes.EVENT
      ];
    } else {
      return [
        postTypes.TIP_REQUEST,
        entityTypes.LIST,
        postTypes.RECOMMENDATION,
        entityTypes.EVENT,
        postTypes.GUIDE,
        postTypes.JOB,
        postTypes.GIVE_TAKE,
        postTypes.REAL_ESTATE,
        postTypes.PROMOTION
      ];
    }
  };

  handlePostTypePress = type => {
    const { onTypeChanged } = this.props;
    if (type === entityTypes.EVENT) {
      this.navigateToEventCreate();
    } else {
      onTypeChanged(type);
    }
  };

  navigateToEventCreate = () => {
    const { publishAs } = this.props;
    navigationService.replace(screenGroupNames.CREATE_EVENT_MODAL, {
      shareTo: publishAs
    });
  };
}

PostTypePicker.propTypes = {
  onTypeChanged: PropTypes.func,
  postIn: PropTypes.shape({
    id: PropTypes.string,
    entityType: PropTypes.string,
    name: PropTypes.string,
    media: PropTypes.object
  }),
  publishAs: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    media: PropTypes.object
  }),
  customPostTypesList: PropTypes.arrayOf(PropTypes.string)
};

export default PostTypePicker;
