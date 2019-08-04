import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView
} from "react-native";
import { View, PlaceholderRectangle } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import Carousel, { Pagination } from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import { sliderWidth, itemWidth } from "./SliderEntry.style";
import { ENTRIES1, ENTRIES2 } from "./static/entries";
import { scrollInterpolators, animatedStyles } from "./utils/animations";
import carouseleStyles, { colors } from "./index.style";
import SliderEntry from "./SliderEntry";

const styles = StyleSheet.create({
  itemContainer: {
    height: 260,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: daytColors.white,
    borderRadius: 15,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  compactItemContainer: {
    height: 160
  },
  itemTopSection: {
    flexDirection: "row",
    padding: 15
  },
  itemMiddleSection: {
    paddingHorizontal: 15
  },
  compactActionPlaceholder: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  box: {
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    paddingTop: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  name: {
    fontSize: 20,
    // marginBottom: 20,
    fontWeight: "bold",
    color: "#1E90FF"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4
  },
  buttonMessage: {
    backgroundColor: "#00BFFF"
  },
  buttonLike: {
    backgroundColor: "#228B22"
  },
  buttonLove: {
    backgroundColor: "#FF1493"
  },
  buttonCall: {
    backgroundColor: "#40E0D0"
  },
  icon: {
    width: 35,
    height: 35
  }
});

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

class EntitiesLoadingState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }
  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }
  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }
  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={carouseleStyles.exampleContainer}>
        {/* <Text style={carouseleStyles.title}>{`Example ${number}`}</Text>
        <Text style={carouseleStyles.subtitle}>{title}</Text> */}
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={carouseleStyles.slider}
          contentContainerCustomStyle={carouseleStyles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={carouseleStyles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={carouseleStyles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  momentumExample(number, title) {
    return (
      <View style={carouseleStyles.exampleContainer}>
        <Text style={carouseleStyles.title}>{`Example ${number}`}</Text>
        <Text style={carouseleStyles.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES2}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={"start"}
          containerCustomStyle={carouseleStyles.slider}
          contentContainerCustomStyle={carouseleStyles.sliderContentContainer}
          activeAnimationType={"spring"}
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
        />
      </View>
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === "tinder";
    return (
      <View
        style={[
          carouseleStyles.exampleContainer,
          isTinder
            ? carouseleStyles.exampleContainerDark
            : carouseleStyles.exampleContainerLight
        ]}
      >
        <Text
          style={[carouseleStyles.title, isTinder ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text
          style={[
            carouseleStyles.subtitle,
            isTinder ? {} : carouseleStyles.titleDark
          ]}
        >
          {title}
        </Text>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={carouseleStyles.slider}
          contentContainerCustomStyle={carouseleStyles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return (
      <View
        style={[
          carouseleStyles.exampleContainer,
          isEven
            ? carouseleStyles.exampleContainerDark
            : carouseleStyles.exampleContainerLight
        ]}
      >
        <Text
          style={[carouseleStyles.title, isEven ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text
          style={[
            carouseleStyles.subtitle,
            isEven ? {} : carouseleStyles.titleDark
          ]}
        >
          {title}
        </Text>
        <Carousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={carouseleStyles.slider}
          contentContainerCustomStyle={carouseleStyles.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
      // ) : (
      //   false
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={carouseleStyles.gradient}
      />
    );
  }
  static COMPONENT_TYPE = {
    COMPACT: "compact",
    REGULAR: "regular"
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  static renderPlaceholderFeedItem(type, key) {
    const isCompact = type === EntitiesLoadingState.COMPONENT_TYPE.COMPACT;
    return (
      <View
        style={[styles.itemContainer, isCompact && styles.compactItemContainer]}
        key={key}
      >
        <View style={styles.itemTopSection}>
          {/* <PlaceholderRectangle
            width={isCompact ? 60 : 35}
            height={isCompact ? 60 : 35}
            borderRadius={isCompact ? 10 : 30}
          /> */}
          <View>
            {/* <PlaceholderRectangle width={109} height={15} borderRadius={3} /> */}
            <Text style={styles.name}>John Doe, 27, Brooklyn</Text>

            {/* <PlaceholderRectangle width={65} /> */}
          </View>
        </View>
        {!isCompact && (
          <View style={styles.itemMiddleSection}>
            <PlaceholderRectangle width={270} />
            <PlaceholderRectangle width={315} />
            <PlaceholderRectangle width={135} marginBottom={25} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[styles.button, styles.buttonMessage]}
            onPress={() => this.onClickListener("message")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/cocktail.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonLike]}
            onPress={() => this.onClickListener("like")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/50/000000/sunset.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonLove]}
            onPress={() => this.onClickListener("love")}
          >
            <Image
              style={styles.icon}
              source={{
                uri:
                  "https://img.icons8.com/pastel-glyph/64/000000/tent-in-the-forest.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonCall]}
            onPress={() => this.onClickListener("phone")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/ticket.png"
              }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.buttonCall]}
            onPress={() => this.onClickListener("phone")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/ticket.png"
              }}
            />
          </TouchableHighlight>
          <PlaceholderRectangle
            // width={"100%"}
            // height={60}
            borderRadius={0}
            style={isCompact && styles.compactActionPlaceholder}
          />
        </View>
      </View>
    );
  }

  render() {
    const { type } = this.props;
    const example1 = this.mainExample(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );
    const example2 = this.momentumExample(
      2,
      "Momentum | Left-aligned | Active animation"
    );
    const example3 = this.layoutExample(
      3,
      '"Stack of cards" layout | Loop',
      "stack"
    );
    const example4 = this.layoutExample(
      4,
      '"Tinder-like" layout | Loop',
      "tinder"
    );
    const example5 = this.customExample(
      5,
      "Custom animation 1",
      1,
      this._renderItem
    );
    const example6 = this.customExample(
      6,
      "Custom animation 2",
      2,
      this._renderLightItem
    );
    const example7 = this.customExample(
      7,
      "Custom animation 3",
      3,
      this._renderDarkItem
    );
    const example8 = this.customExample(
      8,
      "Custom animation 4",
      4,
      this._renderLightItem
    );
    return (
      <SafeAreaView style={carouseleStyles.safeArea}>
        <View style={carouseleStyles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          {this.gradient}
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {example2}
            {example3}
            {example4}
            {example5}
            {example6}
            {example7}
            {example8}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
    // return [
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 1),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 2),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 3),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 4),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 5),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 6),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 7),
    //   EntitiesLoadingState.renderPlaceholderFeedItem(type, 8)
    // ];
  }
}

EntitiesLoadingState.defaultProps = {
  type: EntitiesLoadingState.COMPONENT_TYPE.REGULAR
};

EntitiesLoadingState.propTypes = {
  type: PropTypes.oneOf(Object.values(EntitiesLoadingState.COMPONENT_TYPE))
};

export default EntitiesLoadingState;
