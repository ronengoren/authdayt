import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { get } from "src/infra/utils";
// import { apiCommand } from "/redux/apiCommands/actions";
import {
  View,
  Avatar,
  Text,
  TranslatedText,
  NewTextButton,
  DashedBorder,
  Checkbox
} from "src/components/basicComponents";
// import { OthersFriendsList } from "/screens";
import { daytColors, commonStyles } from "src/vars";
import { screenNames, friendshipStatusType } from "src/vars/enums";
import { getYearsAgo } from "src/infra/utils/dateTimeUtils";
// import { analytics } from "/infra/reporting";
import { navigationService } from "src/infra/navigation";
import { userScheme } from "src/schemas";

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: daytColors.white,
    borderRadius: 15,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4
  },
  wrapperWithTopMargin: {
    marginTop: 10
  },
  detailsWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 15
  },
  entityAvatarWrapper: {
    width: 100,
    height: 120,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: daytColors.white
  },
  entityAvatar: {
    width: 100,
    height: 120,
    borderRadius: 10
  },
  entityItemHeaderTexts: {
    flex: 1
  },
  userName: {
    textAlign: "left",
    marginBottom: 6
  },
  liveIn: {
    marginBottom: 4
  },
  actionWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8
  },
  actionInnerWrapper: {
    flexDirection: "row"
  },
  mutualTextWrapper: {
    flex: 1,
    marginTop: 2,
    marginRight: 5
  },
  dashedBorder: {
    marginBottom: 9
  }
});

class UserEntityComponent extends Component {
  state = {
    invited: false
  };

  render() {
    const {
      data: {
        id,
        name,
        journey: { arrivedDate, currentlyLiveIn }
      },
      showAction,
      userId,
      isComponentSelectable,
      disableNavigation,
      index
    } = this.props;
    const arrivalDate = arrivedDate ? getYearsAgo(arrivedDate) : null;
    const locationAction = disableNavigation
      ? null
      : this.navigateToNeighborhood;
    const shouldRenderAction = !isComponentSelectable && userId !== id;
    return (
      <TouchableOpacity
        onPress={this.onPressUserEntity}
        style={[styles.wrapper, index === 0 && styles.wrapperWithTopMargin]}
        activeOpacity={1}
      >
        <View style={styles.detailsWrapper}>
          {this.renderUserThumbnail()}
          <View style={styles.entityItemHeaderTexts}>
            <Text
              size={16}
              lineHeight={20}
              color={daytColors.realBlack}
              bold
              numberOfLines={1}
              style={styles.userName}
            >
              {name}
            </Text>
            {!!currentlyLiveIn && (
              <Text
                size={13}
                lineHeight={15}
                color={daytColors.pinkishRed}
                medium
                numberOfLines={1}
                onPress={locationAction}
                style={styles.liveIn}
              >
                {currentlyLiveIn}
              </Text>
            )}
            {!!arrivalDate && (
              <Text size={13} lineHeight={15} color={daytColors.b60}>
                {I18n.t("user_entity_component.arrival_date", { arrivalDate })}
              </Text>
            )}
            {showAction && shouldRenderAction && this.renderAction()}
          </View>
          {isComponentSelectable && this.renderCheckboxSelector()}
        </View>
      </TouchableOpacity>
    );
  }

  renderUserThumbnail = () => {
    const {
      data: {
        name,
        themeColor,
        media: { thumbnail }
      }
    } = this.props;
    return (
      <View style={[commonStyles.shadow, styles.entityAvatarWrapper]}>
        <Avatar
          size="large1"
          name={name}
          themeColor={themeColor}
          entityType="user"
          thumbnail={thumbnail}
          resizeMode="cover"
          linkable={false}
          imageStyle={styles.entityAvatar}
        />
      </View>
    );
  };

  renderAction = () => (
    <View style={styles.actionWrapper}>
      <DashedBorder style={styles.dashedBorder} />
      <View style={styles.actionInnerWrapper}>
        {this.renderMutualFriends()}
        {this.renderActionButton()}
      </View>
    </View>
  );

  renderMutualFriends = () => {
    const {
      data: { numOfMutualFriends }
    } = this.props;
    if (numOfMutualFriends > 0) {
      return (
        <TouchableOpacity
          onPress={this.navigateToMutualFriends}
          style={styles.mutualTextWrapper}
          activeOpacity={1}
        >
          <TranslatedText size={13} lineHeight={17} color={daytColors.b60}>
            {I18n.p(numOfMutualFriends, "user_entity_component.mutual_friends")}
          </TranslatedText>
          <Text size={13} lineHeight={17} color={daytColors.b60}>
            {I18n.t("user_entity_component.friends")}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View style={commonStyles.flex1} />;
  };

  renderActionButton = () => {
    const {
      data: { friendshipStatus }
    } = this.props;
    const { invited } = this.state;
    const isFriendshipDeclined =
      friendshipStatus === friendshipStatusType.REJECTED;
    if (friendshipStatus === friendshipStatusType.FRIENDS) {
      return (
        <NewTextButton
          iconName="comment"
          iconSize={17}
          iconWeight="solid"
          onPress={this.navigateToConversation}
          width={115}
        >
          {I18n.t("posts.actions.message_short")}
        </NewTextButton>
      );
    } else if (
      friendshipStatus === friendshipStatusType.REQUEST_SENT ||
      isFriendshipDeclined
    ) {
      return (
        <NewTextButton
          secondary
          onPress={isFriendshipDeclined ? null : this.navigateToUser}
          width={85}
        >
          {I18n.t("user_entity_component.pending_button")}
        </NewTextButton>
      );
    } else if (invited) {
      return (
        <NewTextButton secondary onPress={this.toggleInviteWrapper} width={85}>
          {I18n.t("user_entity_component.undo_button")}
        </NewTextButton>
      );
    } else {
      return (
        <NewTextButton
          iconName="add-friend"
          iconSize={23}
          onPress={this.toggleInviteWrapper}
          width={85}
        >
          {I18n.t("user_entity_component.add_button")}
        </NewTextButton>
      );
    }
  };

  renderCheckboxSelector = () => {
    const { invited } = this.state;
    return <Checkbox value={invited} onChange={this.toggleInvitedCheckbox} />;
  };

  onPressUserEntity = () => {
    const {
      data: { id },
      userId,
      isComponentSelectable,
      disableNavigation
    } = this.props;
    const shouldSelectAction = isComponentSelectable && userId !== id;

    if (shouldSelectAction) {
      this.toggleInvitedCheckbox();
    }
    if (!disableNavigation) {
      this.navigateToUser();
    }
  };

  navigateToUser = () => {
    const {
      data: {
        id,
        name,
        media: { thumbnail },
        themeColor
      }
    } = this.props;
    navigationService.navigateToProfile({
      entityId: id,
      data: { name, thumbnail, themeColor }
    });
  };

  navigateToNeighborhood = () => {
    const { data } = this.props;
    const { neighborhood } = data.journey;

    navigationService.navigate(screenNames.MyNeighborhoodView, {
      neighborhood
    });
  };

  navigateToConversation = () => {
    const {
      data,
      data: { id: participantId, name: participantName }
    } = this.props;
    const participant = {
      participantId,
      participantName,
      participantAvatar: get(data, "media.thumbnail")
    };
    navigationService.navigate(screenNames.Chat, participant);
  };

  //   toggleInviteWrapper = () => {
  //     const { invited } = this.state;
  //     this.setState({ invited: !invited }, () => {
  //       this.toggleFriendshipRequest({ sendInvite: !invited });
  //     });
  //   };

  //   toggleFriendshipRequest = ({ sendInvite }) => {
  //     const {
  //       data: { id, name, mutualFriends },
  //       apiCommand
  //     } = this.props;
  //     if (sendInvite) {
  //       apiCommand("friendships.invite", { toIds: [id] });
  //       analytics.actionEvents
  //         .friendRequest({
  //           friendId: id,
  //           friendName: name,
  //           totalMutualFriends: mutualFriends
  //         })
  //         .dispatch();
  //     } else {
  //       apiCommand("friendships.unfriend", { toId: id });
  //     }
  //   };

  navigateToMutualFriends = () => {
    const {
      data: { id, name }
    } = this.props;
    navigationService.navigate(screenNames.OthersFriendsList, {
      entityId: id,
      name,
      subTab: OthersFriendsList.subTabs.MUTUAL_FRIENDS
    });
  };

  toggleInvitedCheckbox = () => {
    const { data, toggleInvite } = this.props;
    const { invited } = this.state;
    this.setState({ invited: !invited }, () => {
      toggleInvite && toggleInvite({ user: data });
    });
  };
}

UserEntityComponent.defaultProps = {
  isComponentSelectable: false,
  showAction: true
};

UserEntityComponent.propTypes = {
  data: userScheme,
  userId: PropTypes.string,
  index: PropTypes.number,
  isComponentSelectable: PropTypes.bool,
  showAction: PropTypes.bool,
  toggleInvite: PropTypes.func,
  disableNavigation: PropTypes.bool,
  apiCommand: PropTypes.func
};

// const mapStateToProps = state => ({
//   userId: state.auth.user.id
// });

// const mapDispatchToProps = {
//   apiCommand
// };

// UserEntityComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(UserEntityComponent);
export default UserEntityComponent;
