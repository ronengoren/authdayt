import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, Avatar } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { groupRoleTypes, entityTypes } from "src/vars/enums";
import { translateDate } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: daytColors.white
  },
  stateChangedWrapper: {
    backgroundColor: daytColors.fillGrey
  },
  leftPartWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  memberImageThumb: {
    marginRight: 10
  },
  memberName: {
    flex: 1
  },
  textName: {
    textAlign: "left"
  },
  badgeIconWrapper: {
    position: "absolute",
    left: 25,
    bottom: -5,
    padding: 2,
    height: 19,
    width: 19,
    borderRadius: 10,
    backgroundColor: daytColors.white
  },
  badgeIconInnerWrapper: {
    height: 14,
    width: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: daytColors.red
  },
  badgeIconInner: {
    marginTop: -1,
    backgroundColor: daytColors.red
  }
});

class UsersListItemWithStates extends React.Component {
  render() {
    const {
      user,
      stateComponents,
      itemState,
      renderRightComponent,
      onUserPressed,
      showBadgeCheck,
      badgeProps
    } = this.props;
    const {
      id,
      name,
      themeColor,
      media: { thumbnail }
    } = user;
    const { name: iconName, size: iconSize, color: badgeColor } =
      badgeProps || {};
    return (
      <TouchableWithoutFeedback
        onPress={
          onUserPressed
            ? () => onUserPressed(user)
            : () =>
                navigationService.navigateToProfile({
                  entityId: id,
                  data: { name, thumbnail, themeColor }
                })
        }
      >
        <View
          style={[
            styles.wrapper,
            itemState !== -1 && styles.stateChangedWrapper
          ]}
        >
          <View style={styles.leftPartWrapper}>
            <Avatar
              entityId={user.id}
              entityType={entityTypes.USER}
              themeColor={user.themeColor}
              thumbnail={user.media.thumbnail}
              name={user.name}
              style={styles.memberImageThumb}
              size="medium"
              linkable={false}
            />
            {this.renderUserDetails()}
            {itemState !== -1 && stateComponents[itemState]({ user })}
            {showBadgeCheck && showBadgeCheck(user) && (
              <View style={styles.badgeIconWrapper}>
                <View style={styles.badgeIconInnerWrapper}>
                  <DaytIcon
                    name={iconName}
                    size={iconSize}
                    color={badgeColor}
                    style={styles.badgeIconInner}
                  />
                </View>
              </View>
            )}
          </View>
          {renderRightComponent && renderRightComponent({ user })}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderUserDetails = () => {
    const {
      user: { name, contextData },
      showUserJoinDate,
      itemState
    } = this.props;
    const joinedAtDate = contextData ? translateDate(contextData.joinedAt) : "";
    if (itemState === -1) {
      return (
        <View style={styles.memberName}>
          <Text
            size={showUserJoinDate ? 14 : 16}
            color={daytColors.realBlack}
            style={styles.textName}
            bold
            numberOfLines={1}
          >
            {name}
          </Text>
          {showUserJoinDate &&
            contextData &&
            contextData.memberType !== groupRoleTypes.OWNER && (
              <Text size={13} color={daytColors.b60}>
                {contextData.memberType === groupRoleTypes.MEMBER
                  ? I18n.t("groups.member_data.joined", { joinedAtDate })
                  : I18n.t("groups.member_data.pending", { joinedAtDate })}
              </Text>
            )}
        </View>
      );
    }
    return null;
  };
}

UsersListItemWithStates.propTypes = {
  user: PropTypes.object,
  stateComponents: PropTypes.arrayOf(PropTypes.func),
  itemState: PropTypes.number,
  renderRightComponent: PropTypes.func,
  onUserPressed: PropTypes.func,
  showBadgeCheck: PropTypes.func,
  badgeProps: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.string,
    size: PropTypes.number
  }),
  showUserJoinDate: PropTypes.bool
};

UsersListItemWithStates.defaultProps = {
  showUserJoinDate: false
};

export default UsersListItemWithStates;
