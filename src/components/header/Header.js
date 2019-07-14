// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import {
//   StyleSheet,
//   Keyboard,
//   TouchableOpacity,
//   StatusBar
// } from "react-native";
// import I18n from "/infra/localization";
// import { View, Text, IconButton } from "/components/basicComponents";
// import { homeisColors, uiConstants, commonStyles } from "/vars";
// import { screenNames } from "/vars/enums";
// import { navigationService } from "/infra/navigation";
// import HeaderSearch from "./HeaderSearch";

// const MIN_TITLE_HORIZONTAL_MARGIN = 10;

// const styles = StyleSheet.create({
//   wrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//     height: uiConstants.NAVBAR_HEIGHT,
//     paddingTop: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
//     paddingHorizontal: 10
//   },
//   wrapperBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: homeisColors.b90
//   },
//   left: {
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     marginRight: 10
//   },
//   center: {
//     flex: 1
//   },
//   titleWrapper: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   titleText: {
//     textAlign: "center"
//   },
//   right: {
//     justifyContent: "center",
//     alignItems: "center",
//     minWidth: 30,
//     height: "100%",
//     marginLeft: 10
//   }
// });

// const leftButtonHitSlop = { left: 15, right: 0, top: 0, bottom: 0 };
// const rightButtonHitSlop = { right: 15, left: 5, bottom: 10, top: 10 };

// class Header extends Component {
//   state = {
//     leftComponentWidth: 0,
//     rightComponentWidth: 0
//   };

//   render() {
//     const { searchMode, backgroundColor, withBorderBottom } = this.props;

//     return (
//       <View
//         style={[
//           styles.wrapper,
//           withBorderBottom && styles.wrapperBorder,
//           { backgroundColor },
//           commonStyles.tinyShadow
//         ]}
//       >
//         <StatusBar
//           translucent
//           barStyle="dark-content"
//           backgroundColor="transparent"
//         />
//         <View onLayout={this.calcLeftComponentWidth}>
//           {!searchMode && this.renderLeftSection()}
//         </View>
//         {this.renderMiddleSection()}
//         <View onLayout={this.calcRightComponentWidth}>
//           {this.renderRightSection()}
//         </View>
//       </View>
//     );
//   }

//   renderLeftSection = () => {
//     const {
//       backIconName,
//       buttonColor,
//       leftComponent,
//       hasBackButton,
//       testIdPrefix,
//       leftBtnIconName,
//       leftBtnAction
//     } = this.props;
//     let leftSection;

//     if (leftComponent) {
//       leftSection = leftComponent;
//     } else if (hasBackButton) {
//       leftSection = this.renderIconButton({
//         name: backIconName,
//         onPress: this.navigateBackWrapper,
//         hitSlop: { left: 15, right: 5, top: 5, bottom: 5 },
//         testID: `${testIdPrefix}BackBtn`,
//         buttonColor
//       });
//     } else if (leftBtnIconName) {
//       leftSection = this.renderIconButton({
//         name: leftBtnIconName,
//         onPress: leftBtnAction,
//         hitSlop: leftButtonHitSlop,
//         buttonColor
//       });
//     }
//     return leftSection ? (
//       <View style={[styles.left]}>{leftSection}</View>
//     ) : null;
//   };

//   renderMiddleSection = () => {
//     const { leftComponentWidth, rightComponentWidth } = this.state;
//     const {
//       title,
//       titleOnPress,
//       titleColor,
//       subTitle,
//       searchMode,
//       searchAddressMode,
//       isHideSearch
//     } = this.props;
//     const marginRight =
//       Math.max(leftComponentWidth - rightComponentWidth, 0) +
//       MIN_TITLE_HORIZONTAL_MARGIN;
//     const marginLeft =
//       Math.max(rightComponentWidth - leftComponentWidth, 0) +
//       MIN_TITLE_HORIZONTAL_MARGIN;

//     if (title) {
//       return (
//         <TouchableOpacity
//           onPress={titleOnPress}
//           style={[styles.titleWrapper, { marginLeft, marginRight }]}
//           activeOpacity={1}
//         >
//           <Text
//             numberOfLines={1}
//             size={16}
//             color={titleColor}
//             medium
//             style={styles.titleText}
//           >
//             {title}
//           </Text>
//           {!!subTitle && (
//             <Text numberOfLines={1} size={12} color={homeisColors.b60}>
//               {subTitle}
//             </Text>
//           )}
//         </TouchableOpacity>
//       );
//     } else if (!isHideSearch) {
//       return (
//         <View style={styles.center}>
//           <HeaderSearch
//             searchMode={searchMode}
//             searchAddressMode={searchAddressMode}
//             handleSearchFocus={this.handleSearchFocus}
//           />
//         </View>
//       );
//     }
//     return null;
//   };

//   renderRightSection = () => {
//     const {
//       searchMode,
//       rightComponent,
//       closeAction,
//       rightBtnIconName,
//       rightBtnIconSize,
//       rightBtnAction
//     } = this.props;
//     let rightSection = null;

//     if (searchMode) {
//       rightSection = this.renderCancelSearch();
//     } else if (rightComponent) {
//       rightSection = rightComponent;
//     } else if (closeAction) {
//       rightSection = this.renderIconButton({
//         name: "close",
//         size: 22,
//         onPress: closeAction,
//         hitSlop: rightButtonHitSlop
//       });
//     } else if (rightBtnIconName) {
//       rightSection = this.renderIconButton({
//         name: rightBtnIconName,
//         size: rightBtnIconSize,
//         onPress: rightBtnAction,
//         hitSlop: rightButtonHitSlop
//       });
//     }
//     return rightSection ? (
//       <View style={styles.right}>{rightSection}</View>
//     ) : null;
//   };

//   renderCancelSearch = () => (
//     <Text
//       size={16}
//       lineHeight={30}
//       color={homeisColors.azure}
//       onPress={this.handleSearchCancelPress}
//     >
//       {I18n.t("header.cancel_button")}
//     </Text>
//   );

//   renderIconButton = ({
//     buttonColor,
//     name,
//     size = 26,
//     onPress,
//     testID,
//     hitSlop
//   }) => (
//     <IconButton
//       name={name}
//       style={styles.removeIcon}
//       iconColor={buttonColor}
//       iconSize={size}
//       onPress={onPress}
//       testID={testID}
//       hitSlop={hitSlop}
//     />
//   );

//   handleSearchFocus = () => {
//     const { searchMode } = this.props;
//     if (!searchMode) {
//       navigationService.navigate(screenNames.Search, {
//         withPeopleSearch: true
//       });
//     }
//   };

//   handleSearchCancelPress = () => {
//     Keyboard.dismiss();
//     navigationService.goBack();
//   };

//   calcLeftComponentWidth = e => {
//     this.setState({ leftComponentWidth: e.nativeEvent.layout.width });
//   };

//   calcRightComponentWidth = e => {
//     this.setState({ rightComponentWidth: e.nativeEvent.layout.width });
//   };

//   navigateBackWrapper = () => {
//     const { backAction } = this.props;

//     if (backAction) {
//       backAction();
//     } else {
//       Keyboard.dismiss();
//       navigationService.goBack();
//     }
//   };
// }

// Header.propTypes = {
//   backIconName: PropTypes.string,
//   withBorderBottom: PropTypes.bool,
//   hasBackButton: PropTypes.bool,
//   testIdPrefix: PropTypes.string,
//   title: PropTypes.string,
//   titleOnPress: PropTypes.func,
//   subTitle: PropTypes.string,
//   closeAction: PropTypes.func,
//   backAction: PropTypes.func,
//   leftComponent: PropTypes.node,
//   leftBtnIconName: PropTypes.string,
//   leftBtnAction: PropTypes.func,
//   rightComponent: PropTypes.node,
//   rightBtnIconName: PropTypes.string,
//   rightBtnIconSize: PropTypes.number,
//   rightBtnAction: PropTypes.func,
//   searchMode: PropTypes.bool,
//   searchAddressMode: PropTypes.bool,
//   backgroundColor: PropTypes.string,
//   isHideSearch: PropTypes.bool,
//   buttonColor: PropTypes.string,
//   titleColor: PropTypes.string
// };

// Header.defaultProps = {
//   withBorderBottom: true,
//   backIconName: "back-arrow",
//   testIdPrefix: "",
//   backgroundColor: homeisColors.white,
//   titleColor: homeisColors.b30,
//   buttonColor: "b30"
// };

// export default Header;
