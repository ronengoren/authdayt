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
import I18n from "src/infra/localization";
import { AwesomeIcon } from "src/assets/icons";

const styles = StyleSheet.create({
  itemContainer: {
    // height: 260
    marginHorizontal: 10,
    // marginTop: 15,
    marginBottom: 10
    // backgroundColor: daytColors.white,
    // borderRadius: 15,
    // shadowColor: daytColors.boxShadow,
    // shadowOffset: {
    //   width: 0,
    //   height: 5
    // },
    // shadowRadius: 10,
    // shadowOpacity: 1,
    // elevation: 3
  },
  compactItemContainer: {
    height: 160
  },
  itemTopSection: {
    flexDirection: "row"
    // padding: 15
  },
  itemMiddleSection: {
    marginTop: 5
    // paddingHorizontal: 15
  },
  compactActionPlaceholder: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    // padding: 20
  },
  box: {
    // marginTop: 10,
    // backgroundColor: "white",
    alignItems: "center",
    // shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
    // paddingTop: 10
  },
  profileImage: {
    width: 100,
    height: 100
    // marginBottom: 10
  },
  name: {
    fontSize: 20,
    alignContent: "center",
    // marginBottom: 20,
    // fontWeight: "bold",
    color: "#5eadbb",
    marginLeft: 30
    // marginTop: 4
  },
  buttonContainer: {
    flexDirection: "row"
    // marginTop: 20
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 20,
    borderRadius: 30,

    margin: 10
    // shadowColor: "black",
    // shadowOpacity: 0.8,
    // shadowOffset: {
    //   height: 2,
    //   width: -2
    // },
    // elevation: 4
  },
  buttonMessage: {
    // backgroundColor: "#00BFFF",
    borderWidth: 0.6,
    borderColor: "black"
  },
  buttonLike: {
    borderWidth: 0.6,
    borderColor: "black"
  },
  buttonLove: {
    borderWidth: 0.6,
    borderColor: "black"
  },
  buttonCall: {
    borderWidth: 0.6,
    borderColor: "black"
  },
  icon: {
    width: 35,
    height: 35
  },
  pagination: {
    margin: -20
  },
  horizontalMarginContent: {
    marginHorizontal: 40,
    marginTop: 5
  },

  detailsRowIcon: {
    marginRight: 10
    // marginTop: 5
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center"
    // marginVertical: 5
  },
  detailsRowText: {
    color: "#4D4A4B",
    fontSize: 13
    // paddingRight: 15
  }
});

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 0;

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
  get pagination() {
    const { entries, slider1ActiveSlide } = this.state;
    return (
      <Pagination
        dotsLength={ENTRIES1.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          color: "#5eadbb",
          width: 5,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#5eadbb"
        }}
        inactiveDotStyle={{
          backgroundColor: "grey"
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
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
          inactiveSlideShift={0}
          containerCustomStyle={carouseleStyles.slider}
          contentContainerCustomStyle={carouseleStyles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />

        <View style={styles.pagination}>
          <Text style={styles.name}>John Doe, 27</Text>

          <View style={styles.horizontalMarginContent}>
            <View style={[styles.detailsRow]}>
              <AwesomeIcon
                name={"ruler"}
                size={20}
                color={daytColors.b70}
                style={styles.detailsRowIcon}
              />

              <Text
                color={daytColors.b30}
                style={styles.detailsRowText}
                lineHeight={22}
              >
                1.77m
              </Text>
            </View>
            <View style={[styles.detailsRow]}>
              <AwesomeIcon
                name={"home"}
                size={20}
                color={daytColors.b70}
                style={styles.detailsRowIcon}
              />

              <Text
                color={daytColors.b30}
                style={styles.detailsRowText}
                lineHeight={22}
              >
                Brooklyn, NY
              </Text>
            </View>
            <View style={[styles.detailsRow]}>
              <AwesomeIcon
                name={"suitcase"}
                size={20}
                color={daytColors.b70}
                style={styles.detailsRowIcon}
              />

              <Text
                color={daytColors.b30}
                style={styles.detailsRowText}
                lineHeight={22}
              >
                Heart Doctor
              </Text>
            </View>
          </View>
          {this.pagination}
        </View>
      </View>
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
    return (
      <View style={styles.itemContainer} key={key}>
        <View style={styles.buttonContainer}>
          {/* <View style={styles.itemMiddleSection}>
            <PlaceholderRectangle width={270} />
            <PlaceholderRectangle width={315} />
            <PlaceholderRectangle width={135} />
          </View> */}
          {/* <TouchableHighlight
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
            style={styles.compactActionPlaceholder}
          /> */}
        </View>
      </View>
    );
  }
  renderDetailsRow({ iconName }) {
    return (
      <View style={[styles.detailsRow]}>
        <AwesomeIcon
          name={iconName}
          // size={iconSize}
          // color={daytColors.b70}
          // style={styles.detailsRowIcon}
        />
        )}
      </View>
    );
  }

  render() {
    const { type } = this.props;
    const example1 = this.mainExample(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );
    return (
      <SafeAreaView style={carouseleStyles.safeArea}>
        <View style={carouseleStyles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={"rgba(0, 0, 0, 0.3)"}
            barStyle={"light-content"}
          />
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 1)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 2)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 3)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 4)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 5)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 6)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 7)}
          </ScrollView>
          <ScrollView
            style={carouseleStyles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            {example1}
            {EntitiesLoadingState.renderPlaceholderFeedItem(type, 8)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

EntitiesLoadingState.defaultProps = {
  type: EntitiesLoadingState.COMPONENT_TYPE.REGULAR
};

EntitiesLoadingState.propTypes = {
  type: PropTypes.oneOf(Object.values(EntitiesLoadingState.COMPONENT_TYPE))
};

export default EntitiesLoadingState;
