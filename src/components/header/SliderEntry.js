import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "./SliderEntry.style";
import { SaveModal } from "src/components/modals";

const sidesBuffer = 46; // marginHorizontal - (borderWidth * 2) - 2 (Android border fix)

class SliderEntry extends Component {
  state = {
    // throwError: null,
    showSaveModal: false
    // scrollY: 0,
    // itemsSortBy: this.props.initialSortBy || (this.props.isLocationPermitted ? itemsSortTypes.DISTANCE : itemsSortTypes.VOTERS)
  };
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.25)"}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { title, subtitle },
      even
    } = this.props;
    const { showSaveModal } = this.state;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={1}
      >
        {title}
        {/* <Text style={styles.dayt}>dayt</Text> */}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.toggleSaveModal();
        }}
      >
        {/* <SaveModal
          onClose={this.toggleSaveModal}
          // entityType={entityTypes.LIST}
          // entityId={entityId}
          // creator={data.creator}
          // name={data.name}
          // preSelectedThemes={data.tags}
          // originType={originTypes.LIST_PAGE}
          // componentName={componentNamesForAnalytics.FEED_ITEM}
        /> */}
        <View style={styles.shadow} />
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          {uppercaseTitle}
          {/* <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {subtitle}
          </Text> */}
          {showSaveModal && (
            <SaveModal
              onClose={this.toggleSaveModal}
              // entityType={entityTypes.LIST}
              // entityId={entityId}
              // creator={data.creator}
              // name={data.name}
              // preSelectedThemes={data.tags}
              // originType={originTypes.LIST_PAGE}
              // componentName={componentNamesForAnalytics.FEED_ITEM}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
  toggleOpenModal() {
    return (
      <SaveModal
        onClose={this.toggleSaveModal}
        // entityType={entityTypes.LIST}
        // entityId={entityId}
        // creator={data.creator}
        // name={data.name}
        // preSelectedThemes={data.tags}
        // originType={originTypes.LIST_PAGE}
        // componentName={componentNamesForAnalytics.FEED_ITEM}
      />
    );
  }

  toggleSaveModal = () =>
    this.setState({ showSaveModal: !this.state.showSaveModal });
}

export default SliderEntry;
