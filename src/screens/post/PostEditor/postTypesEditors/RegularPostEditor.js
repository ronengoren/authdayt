import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { Text, TextArea, View } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";
import { editModes, postTypes } from "src/vars/enums";
import { arrayToStringByKey } from "src/infra/utils";

import PreviewSection from "../PreviewSection";
import { editorMediaScheme } from "./schema";

const TEXT_AREA_LINE_HEIGHT = 30;
const TEXT_AREA_MARGIN = 15;

const styles = StyleSheet.create({
  textArea: {
    minHeight: 160,
    paddingTop: 0,
    padding: 0,
    marginBottom: 20,
    paddingLeft: 0,
    margin: TEXT_AREA_MARGIN,
    fontSize: 20,
    lineHeight: TEXT_AREA_LINE_HEIGHT
  },
  headerText: {
    paddingTop: 15,
    paddingHorizontal: 15
  },
  activationWithImageOnly: {
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});

class RegularPostEditor extends Component {
  render() {
    const {
      scrapedUrl,
      openActionSheet,
      clearScraping,
      attachedMedia,
      form,
      onRegularInputChange,
      onFocusTextarea,
      onAddMedia,
      onRemoveMedia,
      header,
      headerText,
      textareaPlaceholder,
      withMentions,
      isPostTypeActivationWithOnlyImage
    } = this.props;
    const isSubmitEnabled = this.isSubmitEnabled();

    return (
      <View style={commonStyles.flex1}>
        {React.cloneElement(header, { isSubmitEnabled })}
        <TouchableOpacity
          onPress={this.inputFocus}
          style={commonStyles.flex1}
          activeOpacity={1}
        >
          {!!headerText && (
            <Text
              size={22}
              lineHeight={30}
              color={daytColors.b30}
              bold
              style={styles.headerText}
              alignLocale
            >
              {headerText}
            </Text>
          )}
          <ScrollView
            ref={scroll => {
              this.scroll = scroll;
            }}
            onLayout={this.handleLayout}
            showsVerticalScrollIndicator={false}
          >
            {!isPostTypeActivationWithOnlyImage && (
              <TextArea
                onChange={onRegularInputChange}
                value={form.text}
                placeholder={
                  textareaPlaceholder ||
                  I18n.t(`post_editor.post_placeholders.${form.postType}`)
                }
                onFocus={onFocusTextarea}
                ref={node => {
                  this.textInput = node;
                }}
                style={styles.textArea}
                withMentions={withMentions}
                testID="postTextArea"
                onContentSizeChange={this.handleInputSizeChange}
                scrollEnabled={false}
              />
            )}
            <View
              style={
                isPostTypeActivationWithOnlyImage &&
                styles.activationWithImageOnly
              }
            >
              <PreviewSection
                ctaText={
                  isPostTypeActivationWithOnlyImage ? textareaPlaceholder : null
                }
                handleAddMedia={onAddMedia}
                handleRemoveMedia={onRemoveMedia}
                openActionSheet={openActionSheet}
                deleteScrapedUrlPreview={clearScraping}
                isPostTypeGuide={false}
                attachedMedia={attachedMedia}
                scrapedUrl={scrapedUrl}
                isPostTypeActivationWithOnlyImage={
                  isPostTypeActivationWithOnlyImage
                }
              />
            </View>
          </ScrollView>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidUpdate() {
    const {
      searchMentions: { results, isSearching }
    } = this.props;
    const isMentionOptionsShown = results && (results.length || isSearching);
    const isOnLastLine =
      this.textInput && this.textInput.getWrappedInstance().isOnLastLine();
    if (isMentionOptionsShown && isOnLastLine) {
      this.scrollToSecondLine();
    }
  }

  isSubmitEnabled() {
    const {
      postData,
      scrapedUrl,
      mode,
      form: { text, postType, scheduledDate },
      attachedMedia,
      isPostTypeActivationWithOnlyImage
    } = this.props;
    const scrapedUrlId = scrapedUrl.data && scrapedUrl.data.scrapedUrlId;

    let isAllFieldsFilled = !!(text && text.length);
    if (postType === postTypes.STATUS_UPDATE) {
      isAllFieldsFilled = isAllFieldsFilled || !!attachedMedia.length;
    }

    if (isPostTypeActivationWithOnlyImage) {
      isAllFieldsFilled = !!attachedMedia.length;
    }

    switch (mode) {
      case editModes.CREATE: {
        return isAllFieldsFilled;
      }
      case editModes.EDIT: {
        const attachedMediaLocalUris = arrayToStringByKey({
          array: attachedMedia,
          key: "localUri"
        });
        const postDataMediaUrls = arrayToStringByKey({
          array: postData.mediaGallery,
          key: "url"
        });
        const isSomethingChanged = !!(
          text !== postData.text ||
          attachedMediaLocalUris !== postDataMediaUrls ||
          postType !== postData.postType ||
          (postData.link && scrapedUrlId !== postData.link.id) ||
          postData.scheduledDate !== scheduledDate
        );
        return isAllFieldsFilled && isSomethingChanged;
      }
      default:
        return false;
    }
  }

  handleInputSizeChange = ({ height, isChangeOnLastLine }) => {
    this.height = height;
    if (height > this.scrollHeight && isChangeOnLastLine) {
      this.scrollToSecondLine();
    }
  };

  scrollToSecondLine = () =>
    this.scroll &&
    this.scroll.scrollTo({
      x: 0,
      y: this.height + TEXT_AREA_MARGIN - TEXT_AREA_LINE_HEIGHT * 2,
      animated: true
    });

  handleLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    this.scrollHeight = height;
  };
}

RegularPostEditor.propTypes = {
  isPostTypeActivationWithOnlyImage: PropTypes.bool,
  withMentions: PropTypes.bool,
  textareaPlaceholder: PropTypes.string,
  headerText: PropTypes.string,
  scrapedUrl: PropTypes.object,
  openActionSheet: PropTypes.func,
  clearScraping: PropTypes.func,
  attachedMedia: PropTypes.arrayOf(editorMediaScheme),
  form: PropTypes.object,
  onRegularInputChange: PropTypes.func,
  onFocusTextarea: PropTypes.func,
  onAddMedia: PropTypes.func,
  onRemoveMedia: PropTypes.func,
  postData: PropTypes.object,
  mode: PropTypes.number,
  header: PropTypes.node,
  searchMentions: PropTypes.shape({
    results: PropTypes.array,
    isSearching: PropTypes.bool
  })
};

RegularPostEditor.defaultProps = {
  withMentions: true
};

const mapStateToProps = state => ({
  searchMentions: state.mentions.searchMentions
});

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(RegularPostEditor);
