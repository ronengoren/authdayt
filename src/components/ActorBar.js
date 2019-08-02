import React from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { entityTypes, screenNamesByEntityType } from "src/vars/enums";

import { navigationService } from "src/infra/navigation";
// import { getPostTimeText } from '/components/posts/utils';

class ActorBar extends React.Component {
  render() {
    const { post, actor, alignLocale, forceLTR } = this.props;

    return (
      <Text
        size={13}
        lineHeight={18}
        color={daytColors.b60}
        alignLocale={alignLocale}
        forceLTR={forceLTR}
      >
        {this.renderTitle({ post, actor, alignLocale, forceLTR })}
        {this.renderCreationTime({ post, alignLocale, forceLTR })}
      </Text>
    );
  }

  renderTitle = ({ post, actor, alignLocale, forceLTR }) => {
    const currentActor = actor || post.actor || {};
    const { name } = currentActor;
    const { id } = currentActor;
    const actorType = currentActor.type || currentActor.entityType;
    let navigationFunction = null;
    if (actorType === entityTypes.USER) {
      navigationFunction = () => this.navigateToUserPage(currentActor);
    } else if (actorType === entityTypes.PAGE) {
      navigationFunction = () =>
        this.navigateToEntityPage({
          entityId: id,
          entityType: entityTypes.PAGE
        });
    }

    return (
      <Text
        size={13}
        lineHeight={18}
        color={daytColors.b60}
        onPress={navigationFunction}
        alignLocale={alignLocale}
        forceLTR={forceLTR}
      >
        {I18n.t("common.by")} {name}
      </Text>
    );
  };

  renderCreationTime = ({ post, alignLocale, forceLTR }) => {
    const { eventTime, payload: { postType } = {}, scheduledDate } = post;
    const content = [];
    const separator = index => (
      <Text
        size={13}
        lineHeight={18}
        color={daytColors.b60}
        key={`separator${index}`}
      >
        {" · "}
      </Text>
    );
    const postTimeText =
      postType &&
      eventTime &&
      getPostTimeText(postType, eventTime, scheduledDate);

    if (postTimeText) {
      content.push(separator(1));
      content.push(
        <Text
          size={13}
          lineHeight={18}
          color={daytColors.b60}
          key="postTime"
          alignLocale={alignLocale}
          forceLTR={forceLTR}
        >
          {postTimeText}
        </Text>
      );
    }

    return content;
  };

  navigateToUserPage = user => {
    const {
      id,
      name,
      media: { thumbnail },
      themeColor
    } = user;
    navigationService.navigateToProfile({
      entityId: id,
      data: { name, thumbnail, themeColor }
    });
  };

  navigateToEntityPage = ({ entityId, entityType, groupType }) => {
    navigationService.navigate(screenNamesByEntityType[entityType], {
      entityId,
      groupType
    });
  };
}

ActorBar.propTypes = {
  post: PropTypes.object,
  actor: PropTypes.object,
  alignLocale: PropTypes.bool,
  forceLTR: PropTypes.bool
};

export default ActorBar;
