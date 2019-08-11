import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import I18n from "src/infra/localization";
import { commonStyles, daytColors } from "src/vars";
import { connect } from "react-redux";
import { Screen, mentionUtils } from "src/components";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Spinner
} from "src/components/basicComponents";
import {
  postTypes,
  entityTypes,
  editModes,
  editorFeaturesTypes,
  screenGroupNames,
  screenNames,
  screenStateTypes,
  uploadStateTypes
} from "src/vars/enums";
import {
  get,
  getFilePathFromLocalUri,
  arrayToStringByKey,
  uniqueId,
  pick,
  isAppAdmin
} from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { userScheme } from "src/schemas";
import { HomeTab } from "src/screens";
import PostEditorHeader from "./PostEditorHeader";
import PostTypePicker from "./PostTypePicker";
import BottomSection from "./BottomSection";
import ContextSlider from "./ContextSlider";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import images from "src/assets/images";
import { AwesomeIcon } from "src/assets/icons";

// import {
//   RegularPostEditor
//   // SharePostEditor,
//   // GuidePostEditor,
//   // JobPostEditor,
//   // RealEstatePostEditor,
//   // GiveTakePostEditor,
//   // TitledPostEditor,
//   // ListPostEditor,
//   // RecommendationPostEditor
// } from "./postTypesEditors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.7,
    alignItems: "center",
    height: "100%"
  },
  confirmationModalText: {
    // paddingHorizontal: 20,
    // marginBottom: 30,
    // textAlign: "center"
  }
});

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 2,
      itemList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Now"],
      scrollY: new Animated.Value(0)
    };
  }
  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <AwesomeIcon name="add" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
          <AwesomeIcon name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    });
  }

  onAddItem = () => {
    var name = "司马懿";
    if (this.state.itemList.indexOf(name) == -1) {
      this.state.itemList.push(name);
    }
    this.setState({
      selectedItem: this.state.itemList.indexOf(name)
    });
  };
  renderScrollView() {
    const {
      renderContent,
      scrollEventThrottle,
      scrollViewStyle,
      contentContainerStyle,
      innerContainerStyle,
      scrollViewProps
    } = this.props;
    const { scrollY } = this.state;
    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
        {...scrollViewProps}
      >
        <View
          style={[
            { marginTop: this.getHeaderMaxHeight() },
            innerContainerStyle
          ]}
        >
          {/* {renderContent()} */}
        </View>
      </Animated.ScrollView>
    );
  }
  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }
  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity
          }
        ]}
      />
    );
  }
  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight()
      ],
      extrapolate: "clamp"
    });
  }
  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    });
  }
  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }
  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }
  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }
  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }
  renderHeaderTitle() {
    const { title, titleStyle, headerTitleStyle } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslateY }],
            height: this.getHeaderHeight(),
            opacity: titleOpacity
          },
          headerTitleStyle
        ]}
      >
        {typeof title === "string" && (
          <Text style={[styles.headerText, titleStyle]}>{title}</Text>
        )}
        {typeof title !== "string" && title}
      </Animated.View>
    );
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowTitle } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: "clamp"
    });
  }
  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: "clamp"
    });
  }
  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }
  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor
          }
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }
  getImageOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
  }
  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }]
        }}
      />
    );
  }
  getImageTranslate() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: "clamp"
    });
  }
  getImageScale() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: "clamp"
    });
  }
  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }
  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity
          }
        ]}
      >
        {renderNavBar()}
      </Animated.View>
    );
  }
  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: "clamp"
    });
  }
  render() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <StatusBar backgroundColor={statusBarColor || navbarColor} />
        {this.renderScrollView()}
        {this.renderNavbarBackground()}
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderForeground()}
      </View>
    );
  }
}

export default PostEditor;
