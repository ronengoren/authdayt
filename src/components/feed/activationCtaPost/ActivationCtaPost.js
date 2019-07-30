import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  View,
  CallToActionArea,
  IconButton,
  Text,
  DashedBorder
} from "src/components/basicComponents";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { addHiddenPost } from "src/redux/auth/actions";
import { postTypes, screenNames, editModes, originTypes } from "src/vars/enums";
import { daytColors, commonStyles } from "src/vars";
import images from "src/assets/images";
import ItemCtaHeader from "../ItemCtaHeader";

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 10
  },
  feedContainer: {
    marginHorizontal: 15
  },
  hideButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: daytColors.white
  },
  contentWrapper: {
    paddingHorizontal: 15
  },
  dashedBorder: {
    marginTop: 11,
    marginBottom: 15
  },
  cta: {
    minHeight: 100,
    marginVertical: 15,
    backgroundColor: daytColors.paleGreyTwo,
    borderColor: daytColors.azure,
    padding: 10
  },
  journeyActivationTitle: {
    height: 40,
    textAlign: "center"
  },
  journeyActivationCta: {
    height: 100,
    backgroundColor: daytColors.paleGreyTwo,
    borderColor: daytColors.azure,
    paddingHorizontal: 10
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: daytColors.azure,
    textAlign: "center"
  }
});

class ActivationCtaPost extends Component {
  render() {
    const {
      data,
      hiddenPosts,
      isJourneyActivation,
      isFeedPost,
      style
    } = this.props;
    const { media = {}, cta, header, body } = data.fields;

    if (!data || hiddenPosts[data.id]) {
      return null;
    }

    return (
      <View
        style={[
          commonStyles.shadow,
          styles.container,
          isFeedPost && styles.feedContainer,
          style
        ]}
      >
        <ItemCtaHeader
          isTitleBold
          mediaUrl={media.url}
          size={
            isJourneyActivation
              ? ItemCtaHeader.sizes.SMALL
              : ItemCtaHeader.sizes.MEDIUM
          }
          mediaSource={images.common.gradientGreenWithHomeisLogo}
          canNavigateToProfile={!isJourneyActivation}
        />
        {!isJourneyActivation && (
          <IconButton
            isAwesomeIcon
            name="times"
            iconColor="b60"
            iconSize={16}
            onPress={this.hideActivationCta}
            style={[commonStyles.shadow, styles.hideButton]}
          />
        )}
        <View style={styles.contentWrapper}>
          <Text
            size={isJourneyActivation ? 16 : 28}
            lineHeight={isJourneyActivation ? 20 : 32}
            color={daytColors.b30}
            bold
            style={[
              commonStyles.textAlignCenter,
              isJourneyActivation && styles.journeyActivationTitle
            ]}
          >
            {header}
          </Text>
          <DashedBorder style={styles.dashedBorder} />
          {!isJourneyActivation && (
            <Text
              size={isJourneyActivation ? 16 : 18}
              lineHeight={isJourneyActivation ? 22 : 24}
              color={daytColors.b30}
              style={commonStyles.textAlignCenter}
            >
              {body}
            </Text>
          )}
          <CallToActionArea
            onPress={this.navigateToActivationEditor}
            style={[
              commonStyles.smallShadow,
              isJourneyActivation ? styles.journeyActivationCta : styles.cta
            ]}
            textStyle={styles.placeholderText}
            text={cta}
          />
        </View>
      </View>
    );
  }

  hideActivationCta = () => {
    const { addHiddenPost, data } = this.props;
    const { id } = data;
    const timeNow = new Date();
    const expiration = timeNow.setDate(timeNow.getDate() + 1);
    addHiddenPost(id, { expiration });
  };

  navigateToActivationEditor = () => {
    const {
      data,
      scrollToFeedTop,
      originType,
      screenContextType,
      screenContextId
    } = this.props;
    const {
      fields = {},
      activationType: postSubType,
      id: activationId,
      editorFeatures
    } = data;
    const { resultHeader: title, header: headerText, cta: bodyText } = fields;

    const context =
      screenContextType && screenContextId
        ? {
            contextId: screenContextId,
            contextType: screenContextType
          }
        : {};

    navigationService.navigate(screenNames.PostEditor, {
      onCreated: scrollToFeedTop,
      mode: editModes.CREATE,
      editorFeatures,
      origin: originType,
      postData: {
        payload: { postType: postTypes.ACTIVATION },
        postSubType,
        title,
        headerText,
        bodyText,
        activationId,
        activation: data
      },
      ...context
    });
  };
}

ActivationCtaPost.propTypes = {
  originType: PropTypes.oneOf(Object.values(originTypes)),
  isFeedPost: PropTypes.bool,
  isJourneyActivation: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  data: PropTypes.object,
  hiddenPosts: PropTypes.object,
  scrollToFeedTop: PropTypes.func,
  addHiddenPost: PropTypes.func,
  screenContextType: PropTypes.string,
  screenContextId: PropTypes.string
};

const mapDispatchToProps = {
  addHiddenPost
};

const mapStateToProps = state => ({
  user: get(state, "auth.user"),
  hiddenPosts: get(state, "auth.hiddenPosts")
});

ActivationCtaPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivationCtaPost);
export default ActivationCtaPost;
