import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Dimensions } from "react-native";
import { View, Image } from "src/components/basicComponents";
import { VideoThumbnail } from "src/components/media";
import { screenNames, mediaTypes } from "src/vars/enums";
import { navigationService } from "src/infra/navigation";

const { width, height } = Dimensions.get("window");

const openMediaGallery = ({ medias, initialSlide }) => {
  navigationService.navigate(screenNames.MediaGalleryModal, {
    medias,
    initialSlide,
    transition: {
      fade: true
    }
  });
};

const MediaGalleryListItemPreview = ({
  medias,
  media = {},
  index,
  isItemLoaded,
  LoadingComponent,
  onLoad,
  onError,
  width,
  height,
  fixedHeight,
  imageContainerStyle,
  imageStyle,
  resizeMode
}) => {
  const { type, url, ratio } = media;
  const containerHeight =
    ratio && width / ratio <= height ? width / ratio : height;

  const content = (
    <React.Fragment>
      {type === mediaTypes.IMAGE && (
        <Image
          source={{ uri: url }}
          style={[
            { width, height: fixedHeight || containerHeight },
            imageStyle
          ]}
          resizeMode={resizeMode}
          onLoad={onLoad}
          onError={onError}
        />
      )}
      {type === mediaTypes.VIDEO && (
        <VideoThumbnail
          shouldStretch
          onlyThumbnail
          style={imageStyle}
          resizeMode={resizeMode}
          media={media}
          width={width}
          maxHeight={fixedHeight || containerHeight}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </React.Fragment>
  );

  if (LoadingComponent) {
    const styleByLoadingState = !isItemLoaded
      ? { opacity: 0, height: 0 }
      : { opacity: 1, height: containerHeight };
    return (
      <View style={imageContainerStyle}>
        <React.Fragment>
          {!isItemLoaded && (
            <LoadingComponent height={containerHeight} width="100%" />
          )}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => openMediaGallery({ medias, initialSlide: index })}
          >
            <View style={styleByLoadingState}>{content}</View>
          </TouchableOpacity>
        </React.Fragment>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => openMediaGallery({ medias, initialSlide: index })}
    >
      <View style={imageContainerStyle}>{content}</View>
    </TouchableOpacity>
  );
};

MediaGalleryListItemPreview.propTypes = {
  medias: PropTypes.arrayOf(PropTypes.object),
  media: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  fixedHeight: PropTypes.number,
  imageContainerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  imageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  resizeMode: PropTypes.string,
  isItemLoaded: PropTypes.bool,
  LoadingComponent: PropTypes.func
};

MediaGalleryListItemPreview.defaultProps = {
  width,
  height,
  resizeMode: "contain"
};

export default MediaGalleryListItemPreview;
