import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { View, Text } from "src/components/basicComponents";
import { InfiniteScroll } from "src/components";
import { ActivationCtaPost } from "src/components/feed/activationCtaPost";
import { daytColors } from "src/vars";
import { screenNames, originTypes } from "src/vars/enums";
import { get, isEmpty } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { ActivationCarouselItem } from "src/components/entityCarousel";

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 15
  },
  activation: {
    width: 220,
    height: 310,
    borderRadius: 15,
    backgroundColor: daytColors.white,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 30
  }
});

class ActivationsCarousel extends Component {
  render() {
    const { activations, style } = this.props;

    const hasActivations = !isEmpty(get(activations, "data"));
    return (
      <View style={hasActivations && style}>
        {hasActivations && this.renderTitle()}
        {this.renderActivations()}
      </View>
    );
  }

  renderTitle() {
    const { isViewingOwnActivations, name } = this.props;
    const title = isViewingOwnActivations ? "My Journey" : `${name}'s Journey`;

    return (
      <Text
        bold
        size={16}
        lineHeight={19}
        color={daytColors.b30}
        style={styles.title}
      >
        {title}
      </Text>
    );
  }

  renderActivations() {
    const { user } = this.props;
    const keyExtractor = (item, index) => `${item.id}.${index}`;
    return (
      <InfiniteScroll
        horizontal
        keyExtractor={keyExtractor}
        reducerStatePath={`profile.activations.${user.id}`}
        apiQuery={{
          domain: "activations",
          key: "getActivations",
          params: { userId: user.id }
        }}
        ListItemComponent={this.renderActivation}
        listItemProps={{ user }}
      />
    );
  }

  renderActivation = ({ data, index }) => {
    const { firstItemStyle } = this.props;
    const { post } = data;

    if (isEmpty(post)) {
      return (
        <ActivationCtaPost
          originType={originTypes.MY_PROFILE}
          style={[styles.activation, index === 0 && firstItemStyle]}
          data={data}
          isJourneyActivation
        />
      );
    }

    return (
      <ActivationCarouselItem
        data={post}
        itemNumber={index}
        onPress={this.handleActivationPress({ id: post.id })}
      />
    );
  };

  handleActivationPress = ({ id, showKeyboard = false }) => () =>
    navigationService.navigate(screenNames.PostPage, {
      entityId: id,
      showKeyboard
    });

  handleThanksPress = ({ id, likes }) => () => {
    const query = { domain: "posts", key: "thankedBy", params: { postId: id } };
    const reducerStatePath = `postPage.${id}/thankedBy`;
    const title = I18n.t(`entity_lists.thankers`, { likes });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };
}

ActivationsCarousel.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  firstItemStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  activations: PropTypes.object,
  user: PropTypes.object,
  isViewingOwnActivations: PropTypes.bool,
  name: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  activations: get(state, `profile.activations.${ownProps.user.id}`)
});

ActivationsCarousel = connect(mapStateToProps)(ActivationsCarousel);
export default ActivationsCarousel;
