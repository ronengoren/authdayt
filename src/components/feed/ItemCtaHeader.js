import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  ImageBottomRound,
  Avatar
} from "src/components/basicComponents";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { daytColors, commonStyles } from "src/vars";
import { userScheme } from "src/schemas";

const HORIZONTAL_PADDING = 15;

const sizeStyles = {
  small: {
    height: 93,
    avatarSize: 67
  },
  medium: {
    height: 150,
    avatarSize: 86
  }
};

const styles = StyleSheet.create({
  userImageWrapper: {
    alignSelf: "center",
    marginBottom: 5,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: daytColors.white,
    backgroundColor: daytColors.white
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 45
  },
  textContainer: {
    position: "absolute",
    flexDirection: "column",
    paddingTop: 40,
    alignSelf: "center",
    height: 160,
    justifyContent: "center",
    paddingHorizontal: HORIZONTAL_PADDING
  },
  title: {
    textAlign: "center",
    color: daytColors.white,
    marginBottom: 5,
    textShadowColor: daytColors.boxShadow,
    textShadowOffset: {
      width: 0,
      height: 5
    },
    maxHeight: 100,
    textShadowRadius: 10
  },
  subTitle: {
    textAlign: "center",
    color: daytColors.white,
    height: 30
  }
});

class ItemCtaHeader extends Component {
  static sizes = {
    SMALL: "small",
    MEDIUM: "medium"
  };

  render() {
    const {
      size,
      mediaUrl,
      mediaSource,
      title,
      subTitle,
      isTitleBold,
      canNavigateToProfile,
      isPostPage,
      withCreatorAvatar
    } = this.props;
    const {
      user: { id, media, themeColor, name }
    } = this.props;
    const { height, avatarSize } = sizeStyles[size];
    const imageBottomProps = { withBorderRadius: !isPostPage, height };
    if (mediaUrl) {
      imageBottomProps.mediaUrl = mediaUrl;
    } else {
      imageBottomProps.source = mediaSource;
    }
    const imageBottomRoundComponent = React.createElement(
      ImageBottomRound,
      imageBottomProps
    );
    return (
      <React.Fragment>
        {imageBottomRoundComponent}
        {withCreatorAvatar && (
          <View
            style={[
              styles.userImageWrapper,
              commonStyles.shadow,
              {
                width: avatarSize,
                height: avatarSize,
                marginTop: -avatarSize / 2
              }
            ]}
          >
            <Avatar
              imageStyle={styles.userImage}
              size="large1"
              entityId={id}
              entityType="user"
              themeColor={themeColor}
              thumbnail={media.thumbnail}
              name={name}
              linkable={canNavigateToProfile}
            />
          </View>
        )}
        {(!!title || !!subTitle) && (
          <View style={styles.textContainer}>
            {!!title && (
              <Text
                bold={isTitleBold}
                size={22}
                lineHeight={34}
                style={[styles.title]}
                alignLocale
              >
                {title}
              </Text>
            )}
            {!!subTitle && (
              <Text
                size={16}
                lineHeight={22}
                style={[styles.subTitle]}
                alignLocale
              >
                {subTitle}
              </Text>
            )}
          </View>
        )}
      </React.Fragment>
    );
  }

  navigateToUserProfile = () => {
    const {
      canNavigateToProfile,
      user: {
        id,
        name,
        media: { thumbnail },
        themeColor
      }
    } = this.props;
    if (canNavigateToProfile) {
      navigationService.navigateToProfile({
        entityId: id,
        data: { name, thumbnail, themeColor }
      });
    }
  };
}

ItemCtaHeader.propTypes = {
  isPostPage: PropTypes.bool,
  withCreatorAvatar: PropTypes.bool,
  canNavigateToProfile: PropTypes.bool,
  isTitleBold: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  mediaUrl: PropTypes.string,
  mediaSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  user: userScheme,
  size: PropTypes.string
};

ItemCtaHeader.defaultProps = {
  withCreatorAvatar: true,
  size: "medium"
};

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user || get(state, "auth.user")
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCtaHeader);
