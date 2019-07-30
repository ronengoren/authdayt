import React, { Component } from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { View, Text } from "src/components/basicComponents";
import { MediaGalleryListItemPreview } from "src/components/media";
import { AwesomeIcon } from "src/assets/icons";
import { connect } from "src/infra/instagram";
import { daytColors } from "src/vars";
import { InstagramProvider } from "src/components/instagram";

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  title: {
    marginLeft: 5
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: daytColors.realBlack
  },
  imageWrapperMargin: {
    marginRight: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  firstImage: {
    marginLeft: 15
  },
  lastImage: {
    marginRight: 15
  },
  placeholders: {
    flexDirection: "row",
    paddingLeft: 15,
    overflow: "hidden",
    alignItems: "center"
  },
  cta: {
    flexDirection: "row",
    width: "100%"
  },
  ctaImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: daytColors.white,
    borderRadius: 10,
    backgroundColor: daytColors.halfRealBlack,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  ctaImageAzure: {
    borderColor: daytColors.azure,
    backgroundColor: daytColors.transparent
  }
});

class ProfileInstagram extends Component {
  static mediaTypes = {
    IMAGE: "image",
    VIDEO: "video"
  };

  render() {
    const { token } = this.props;

    return (
      <InstagramProvider
        token={token}
        CtaComponent={this.renderCta()}
        LoadingComponent={this.renderPlaceholders()}
      >
        {({ gallery }) => this.renderGallery({ gallery })}
      </InstagramProvider>
    );
  }

  renderGallery({ gallery }) {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={gallery}
          renderItem={({ item, index }) => (
            <MediaGalleryListItemPreview
              width={60}
              fixedHeight={60}
              medias={gallery}
              media={item}
              index={index}
              resizeMode="cover"
              imageStyle={styles.image}
              imageContainerStyle={[
                styles.imageWrapper,
                styles.imageWrapperMargin,
                !index && styles.firstImage,
                index === gallery.length && styles.lastImage
              ]}
            />
          )}
          keyExtractor={item => item.url}
        />
      </View>
    );
  }

  renderCta() {
    const { isDarkPlaceholder } = this.props;
    const textWidth = Dimensions.get("window").width - 240;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={[styles.cta, styles.placeholders]}
          onPress={connect}
        >
          {Array.from({ length: 3 }, this.renderCtaImage)}
          <Text style={[styles.title, { width: textWidth }]} lineHeight={29}>
            <Text
              size={13}
              lineHeight={20}
              color={isDarkPlaceholder ? daytColors.azure : daytColors.white}
            >
              {I18n.t("profile.view.instagram.connect_btn")}{" "}
            </Text>
            <AwesomeIcon
              name="arrow-circle-right"
              size={13}
              color={isDarkPlaceholder ? daytColors.azure : daytColors.white}
              weight="solid"
            />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderCtaImage = (item, index) => {
    const { isDarkPlaceholder } = this.props;

    return (
      <View
        style={[styles.ctaImage, isDarkPlaceholder && styles.ctaImageAzure]}
        key={index}
      >
        <AwesomeIcon
          name="instagram"
          weight="brands"
          color={isDarkPlaceholder ? daytColors.azure : daytColors.white}
          size={22}
        />
      </View>
    );
  };

  renderPlaceholders() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholders}>
          {Array.from({ length: 6 }, this.renderCtaImage)}
        </View>
      </View>
    );
  }
}

ProfileInstagram.propTypes = {
  token: PropTypes.string,
  isDarkPlaceholder: PropTypes.bool
};

export default ProfileInstagram;
