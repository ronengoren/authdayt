import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
// import { VideoPlayer } from '/components';
import {
  View,
  Text,
  Image,
  CallToActionArea,
  IconButton,
  Spinner
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { commonStyles, daytColors } from "src/vars";
import { mediaTypes } from "src/vars/enums";
import { get } from "src/infra/utils";
import actionSheetDefinition from "./entityActionSheetDefinitions";
import EntityPreview from "./EntityPreview";

const MEDIA_MARGIN = 3;
const ACTIVATION_IMAGE_ONLY_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  removeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: daytColors.lightBlack,
    borderRadius: 10,
    padding: 5
  },
  activationSingleImageIcon: {
    backgroundColor: daytColors.lightBlack,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: daytColors.b90
  },
  mediaPlaceholder: {
    height: 130,
    alignItems: "center"
  },
  secondaryMediaPlaceholder: {
    minHeight: ACTIVATION_IMAGE_ONLY_HEIGHT,
    marginVertical: 15,
    backgroundColor: daytColors.paleGreyTwo,
    borderColor: daytColors.azure,
    padding: 10
  },
  secondaryPlaceholderText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    color: daytColors.azure
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 30,
    textAlignVertical: "center",
    color: daytColors.placeholderGrey
  },
  mediaContainer: {
    backgroundColor: daytColors.realBlack,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3
  },
  imageWrapper: {
    flex: 1
  },
  imageWrapperCentered: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  guideImage: {
    width: "100%",
    height: 130,
    borderRadius: 12
  },
  activationSingleImage: {
    width: "100%",
    height: ACTIVATION_IMAGE_ONLY_HEIGHT,
    borderRadius: 12
  },
  scrapedUrlSeparator: {
    height: 1,
    backgroundColor: daytColors.disabledGrey,
    marginHorizontal: 15
  },
  spinner: {
    marginTop: 50,
    alignSelf: "center"
  },
  errorState: {
    position: "absolute",
    backgroundColor: daytColors.paleWatermelon,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  errorStateText: {
    textAlign: "center",
    color: daytColors.white,
    marginTop: 5
  },
  bigErrorStateText: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 24
  }
});

class PreviewSection extends React.Component {
  static renderErrorState({ big }) {
    return (
      <View style={styles.errorState}>
        <AwesomeIcon
          name="exclamation-circle"
          size={big ? 22 : 16}
          weight="solid"
          color={daytColors.white}
        />
        <Text style={[styles.errorStateText, big && styles.bigErrorStateText]}>
          {I18n.t("post_editor.image_upload_error.image_cover")}
        </Text>
      </View>
    );
  }

  static renderScrapingSpinner() {
    return (
      <View>
        <View style={styles.scrapedUrlSeparator} />
        <Spinner
          center
          color={daytColors.green}
          size="large"
          style={styles.spinner}
        />
      </View>
    );
  }

  render() {
    const {
      isPostTypeGuide,
      isPostTypeActivationWithOnlyImage,
      attachedMedia,
      scrapedUrl = {}
    } = this.props;

    const hasAttachment = get(attachedMedia, "[0].localUri", false);

    if (!hasAttachment) {
      if (isPostTypeActivationWithOnlyImage || isPostTypeGuide) {
        return this.renderCallToActionArea();
      } else if (scrapedUrl.scraping) {
        return PreviewSection.renderScrapingSpinner();
      } else if (scrapedUrl.data) {
        return this.renderScrapedPreview();
      } else {
        return null;
      }
    } else {
      if (isPostTypeGuide) {
        return this.renderGuidePreviewImage();
      }
      if (isPostTypeActivationWithOnlyImage) {
        return this.renderActivationWithOnlyImagePreviewImage({
          withAdd: true
        });
      }
      return (
        <View style={styles.container}>
          {attachedMedia.map((media, index) =>
            this.renderMedia({ media, index })
          )}
        </View>
      );
    }
  }

  renderMedia({ media, index }) {
    const { attachedMedia } = this.props;
    const itemsCount = attachedMedia.length;
    const { width: screenWidth } = Dimensions.get("window");

    const itemsInRow = itemsCount >= 3 ? 3 : itemsCount;
    const totalMargins = (itemsInRow - 1) * MEDIA_MARGIN;
    const width = (screenWidth - totalMargins) / itemsInRow;
    const height = itemsCount === 2 ? width * 0.6 : width;
    const marginRight =
      (itemsCount === 2 && index === 0) || (itemsCount > 2 && index % 3 !== 2)
        ? 3
        : 0;

    let mediaItem;
    switch (media.type) {
      case mediaTypes.IMAGE:
        mediaItem = (
          <Image source={{ uri: media.localUri }} style={{ width, height }} />
        );
        break;
      case mediaTypes.VIDEO:
        // mediaItem = <VideoPlayer url={media.localUri} width={width} height={height} maxHeight={height} />;
        break;
      default:
        return null;
    }

    return (
      <View
        style={[styles.mediaContainer, { width, height, marginRight }]}
        key={media.localUri}
      >
        {mediaItem}
        {media.err === "failed"
          ? PreviewSection.renderErrorState({ big: itemsCount === 1 })
          : this.renderRemoveIcon(index)}
      </View>
    );
  }

  renderRemoveIcon(index) {
    const { handleRemoveMedia } = this.props;
    return (
      <IconButton
        name="delete"
        style={styles.removeIcon}
        iconColor="white"
        onPress={() => handleRemoveMedia({ index })}
      />
    );
  }

  renderCallToActionArea() {
    const {
      handleAddMedia,
      isPostTypeActivationWithOnlyImage,
      ctaText
    } = this.props;

    return (
      <CallToActionArea
        style={
          !isPostTypeActivationWithOnlyImage
            ? styles.mediaPlaceholder
            : [commonStyles.smallShadow, styles.secondaryMediaPlaceholder]
        }
        text={ctaText || I18n.t("post_editor.preview_section.cta_title")}
        iconName={isPostTypeActivationWithOnlyImage ? "camera" : "photo"}
        onPress={() => handleAddMedia(mediaTypes.IMAGE)}
        textStyle={
          !isPostTypeActivationWithOnlyImage
            ? styles.placeholderText
            : styles.secondaryPlaceholderText
        }
        iconColor={
          !isPostTypeActivationWithOnlyImage
            ? daytColors.placeholderGrey
            : daytColors.azure
        }
        iconSize={isPostTypeActivationWithOnlyImage ? 40 : 30}
        mediumWeight
        isSecondary={isPostTypeActivationWithOnlyImage}
      />
    );
  }

  renderScrapedPreview() {
    const { scrapedUrl } = this.props;
    const { title, description, url, image } = scrapedUrl.data;

    return (
      <View>
        <View style={styles.scrapedUrlSeparator} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.openActionSheetWrapper}
        >
          <EntityPreview
            title={title}
            subtitle={description}
            detailsText={url}
            imageUrl={image && image.url}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderGuidePreviewImage() {
    const { attachedMedia } = this.props;

    return (
      <View style={styles.imageWrapper} key={attachedMedia[0].localUri}>
        <Image
          source={{ uri: attachedMedia[0].localUri }}
          style={styles.guideImage}
        />
        {this.renderRemoveIcon(0)}
      </View>
    );
  }

  renderActivationWithOnlyImagePreviewImage() {
    const { attachedMedia, handleAddMedia } = this.props;

    return (
      <View style={styles.imageWrapper} key={attachedMedia[0].localUri}>
        <Image
          source={{ uri: attachedMedia[0].localUri }}
          style={styles.activationSingleImage}
        />
        <View style={styles.imageWrapperCentered}>
          <IconButton
            iconSize={40}
            size="xlarge"
            name="camera"
            style={styles.activationSingleImageIcon}
            iconColor="white"
            onPress={() => handleAddMedia({ index: 0 })}
          />
        </View>
      </View>
    );
  }

  openActionSheetWrapper = () => {
    const { openActionSheet, deleteScrapedUrlPreview } = this.props;

    const actionSheet = actionSheetDefinition({
      onDelete: deleteScrapedUrlPreview
    });
    openActionSheet(actionSheet);
  };
}

PreviewSection.propTypes = {
  handleAddMedia: PropTypes.func,
  handleRemoveMedia: PropTypes.func,
  openActionSheet: PropTypes.func,
  deleteScrapedUrlPreview: PropTypes.func,
  isPostTypeActivationWithOnlyImage: PropTypes.bool,
  isPostTypeGuide: PropTypes.bool,
  attachedMedia: PropTypes.arrayOf(PropTypes.object),
  scrapedUrl: PropTypes.object,
  ctaText: PropTypes.string
};

export default PreviewSection;
