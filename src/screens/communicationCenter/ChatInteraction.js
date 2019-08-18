import React from "react";
import PropTypes from "prop-types";
import { StatusBar, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import I18n from "src/infra/localization";
import { Screen, Header } from "src/components";
import {
  View,
  Image,
  Text,
  DashedBorder,
  TextArea,
  KeyboardAvoidingView,
  NewTextButton
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { isEmpty, get } from "src/infra/utils";
import { isRTL } from "src/infra/utils/stringUtils";
// import { analytics } from '/infra/reporting';
import { userScheme } from "src/schemas";
// import { showSnackbar } from '/redux/general/actions';
import { navigationService } from "src/infra/navigation";
import images from "src/assets/images";
import { postTypes, chatInteractioDefinitions } from "src/vars/enums";
import { commonStyles, daytColors } from "src/vars";
// import { PostContentMeta } from '/components/posts';

const BTN_ICON_MARGIN = 7;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  content: {
    padding: 15,
    flex: 1,
    flexDirection: "column"
  },
  interactionBox: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  interactionBoxRtl: {
    flexDirection: "row-reverse"
  },
  interactionHeaderRtl: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 15
  },
  interactionHeader: {
    flex: 1,
    marginLeft: 15
  },
  mediaWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: daytColors.white,
    borderColor: daytColors.b97,
    borderWidth: 1
  },
  upperIcon: {
    position: "absolute"
  },
  dashedBorder: {
    marginTop: 20,
    marginBottom: 5
  },
  textInput: {
    flex: 1,
    marginBottom: 15,
    padding: 0
  },
  button: {
    shadowColor: daytColors.azure20,
    borderColor: daytColors.transparent,
    borderRadius: 10
  },
  buttonIcon: {
    marginRight: BTN_ICON_MARGIN,
    color: daytColors.white
  },
  buttonText: {
    fontWeight: "bold",
    color: daytColors.white,
    fontSize: 16
  }
});

class ChatInteraction extends React.Component {
  state = {
    text: null,
    isDisabled: true
  };

  render() {
    const { user, interaction } = this.props;
    const { text, isDisabled } = this.state;
    const { type: interactionType } = interaction;
    const firstName =
      get(user, "firstName") || get(user, "name", "").split(" ")[0];
    const isHeaderRtl = isRTL(
      I18n.t(`chat.interactions.${interactionType}.interaction_screen.title`, {
        firstName
      })
    );

    const isBoardsInteraction = Object.values(postTypes).includes(
      interactionType
    );
    const InteractionComponent = isBoardsInteraction
      ? this.renderBoardInteraction({ interaction, isHeaderRtl, firstName })
      : this.renderChatInteractions({ interaction, isHeaderRtl, firstName });

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.select({ ios: "padding", android: null })}
      >
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <Header
          hasBackButton
          title={I18n.t(
            `chat.interactions.${interactionType}.interaction_screen.header_title`,
            { firstName }
          )}
          titleColor={daytColors.b30}
          buttonColor="b30"
          backgroundColor={daytColors.white}
        />

        <View style={styles.content}>
          <View
            style={[
              styles.interactionBox,
              isHeaderRtl && styles.interactionBoxRtl
            ]}
          >
            {InteractionComponent}
          </View>

          <DashedBorder style={styles.dashedBorder} />

          <TextArea
            onChange={this.handleFormChange}
            value={text}
            placeholder={I18n.t(
              `chat.interactions.${interactionType}.interaction_screen.input_placeholder`,
              { firstName }
            )}
            autoFocus
            style={styles.textInput}
            selectionColor={daytColors.azure}
            backgroundColor={daytColors.transparent}
          />

          <View style={commonStyles.flexDirectionRow}>
            <NewTextButton
              iconName="paper-plane"
              onPress={!isDisabled ? this.handleFormSubmit : null}
              disabled={isDisabled}
              activeOpacity={0.75}
              iconSize={16}
              iconWeight="solid"
              iconStyle={styles.buttonIcon}
              style={styles.button}
              size={NewTextButton.sizes.BIG55}
              customColor={isDisabled ? daytColors.azure20 : daytColors.azure}
              textStyle={styles.buttonText}
              withShadow={!isDisabled}
            >
              {I18n.t(
                `chat.interactions.${interactionType}.interaction_screen.cta_button`
              )}
            </NewTextButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  renderChatInteractions = ({ interaction, isHeaderRtl, firstName }) => {
    const { type: interactionType } = interaction;
    const { iconName, iconColor } = chatInteractioDefinitions[interactionType];
    return (
      <React.Fragment>
        <View style={[styles.mediaWrapper, commonStyles.smallShadow]}>
          <AwesomeIcon
            name={iconName}
            size={35}
            color={iconColor}
            weight="solid"
          />
          <AwesomeIcon
            name={iconName}
            size={35}
            color={daytColors.b30}
            weight="light"
            style={styles.upperIcon}
          />
        </View>

        <View
          style={
            isHeaderRtl ? styles.interactionHeaderRtl : styles.interactionHeader
          }
        >
          <Text size={22} lineHeight={32} color={daytColors.b30} bold>
            {I18n.t(
              `chat.interactions.${interactionType}.interaction_screen.title`,
              { firstName }
            )}
          </Text>
          <Text size={18} lineHeight={22} color={daytColors.b30}>
            {I18n.t(
              `chat.interactions.${interactionType}.interaction_screen.subtitle`
            )}
          </Text>
        </View>
      </React.Fragment>
    );
  };

  renderBoardInteraction = ({ interaction, isHeaderRtl }) => {
    const { entity, isPostPage } = this.props;
    const { type: interactionType } = interaction;
    const payload = get(entity, "payload", {});
    const mediaUrl = get(payload, "mediaGallery.[0].url");
    const imgSource = !isEmpty(mediaUrl)
      ? { uri: mediaUrl }
      : get(images, `entityImagePlaceholders.${interactionType}`);
    const title = get(payload, "title");
    const price = get(payload, "templateData.price");

    return (
      <React.Fragment>
        <View style={commonStyles.smallShadow}>
          <Image source={imgSource} style={styles.mediaWrapper} />
        </View>

        <View
          style={
            isHeaderRtl ? styles.interactionHeaderRtl : styles.interactionHeader
          }
        >
          <PostContentMeta
            withMarginTop={false}
            withBorderTop={false}
            isRtl={isHeaderRtl}
            tags={entity.tags}
            isPostPage={isPostPage}
            contentType={payload.postType}
            postSubType={payload.postSubType}
            context={entity.context}
            price={price}
          />
          <Text
            size={22}
            lineHeight={28}
            color={daytColors.b30}
            bold
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </React.Fragment>
    );
  };

  handleFormChange = text => {
    this.setState({ text, isDisabled: !(text && text.trim()) });
  };

  handleFormSubmit = async () => {
    const { channel, interaction, user, ownUser } = this.props;
    const { text } = this.state;
    const message = { text: text.trim() };

    message.isFromContext = true;
    message.interaction = interaction;

    try {
      this.setState({ text: "", isDisabled: true });
      await channel.sendMessage(message);
      analytics.actionEvents
        .chatMessageAction({ senderId: ownUser.id, recipientId: user.id })
        .dispatch();
      navigationService.goBack();
      // showSnackbar(
      //   { snackbarType: snackbarTypes.CHAT, user },
      //   { dismissAfter: 5000 }
      // );
    } catch (err) {
      console.log("Failed! \n ", err);
    } finally {
      this.setState({ isDisabled: false });
    }
  };
}

ChatInteraction.propTypes = {
  user: userScheme,
  entity: PropTypes.object,
  interaction: PropTypes.object,
  channel: PropTypes.object,
  isPostPage: PropTypes.bool,
  showSnackbar: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  ownUser: get(state, "auth.user"),
  user: get(ownProps.navigation, "state.params.user"),
  entity: get(ownProps.navigation, "state.params.entity", {}),
  interaction: get(ownProps.navigation, "state.params.interaction", {}),
  channel: get(ownProps.navigation, "state.params.channel"),
  isPostPage: get(ownProps.navigation, "state.params.isPostPage")
});

// const mapDispatchToProps = {
//   showSnackbar
// };

// ChatInteraction = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ChatInteraction);
// ChatInteraction = Screen()(ChatInteraction);

export default ChatInteraction;
