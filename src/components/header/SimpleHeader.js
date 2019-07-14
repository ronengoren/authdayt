// import React from 'react';
// import PropTypes from 'prop-types';
// import { StatusBar, StyleSheet } from 'react-native';
// import I18n from '/infra/localization';
// import { View, Text, IconButton } from '/components/basicComponents';
// import { navigationService } from '/infra/navigation';
// import { homeisColors } from '/vars';
// import { uiConstants } from '/vars/uiConstants';
// import { debounce } from '/infra/utils';

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: uiConstants.NAVBAR_HEIGHT,
//     paddingTop: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
//     paddingHorizontal: 15,
//     backgroundColor: homeisColors.paleGreyTwo,
//     borderBottomWidth: 1,
//     borderBottomColor: homeisColors.b90
//   },
//   cancelButton: {
//     position: 'absolute',
//     left: 15,
//     bottom: 12,
//     zIndex: 1
//   },
//   textWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 55
//   },
//   title: {
//     textAlign: 'center'
//   },
//   subTitle: {
//     flex: 1,
//     marginTop: 5,
//     textAlign: 'center'
//   },
//   doneBtn: {
//     position: 'absolute',
//     right: 15,
//     bottom: 12,
//     zIndex: 1
//   },
//   backBtn: {
//     position: 'absolute',
//     left: 15,
//     bottom: 11,
//     zIndex: 1
//   }
// });

// class SimpleHeader extends React.Component {
//   render() {
//     const { showLeftButton, hasBackBtn, cancelAction, cancelText, doneAction, doneText, isDoneBtnActive = true, title, subTitle, testID } = this.props;
//     const adjustedCancelText = cancelText || I18n.t('header.cancel_button');
//     const adjustedDoneText = doneText || I18n.t('header.update_button');
//     return (
//       <View style={styles.container}>
//         <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
//         {showLeftButton &&
//           (hasBackBtn ? (
//             this.renderBackButton()
//           ) : (
//             <Text size={16} lineHeight={30} color={homeisColors.azure} onPress={cancelAction} style={styles.cancelButton}>
//               {adjustedCancelText}
//             </Text>
//           ))}
//         <View style={styles.textWrapper}>
//           <Text size={16} lineHeight={30} color={homeisColors.b30} style={styles.title} bold>
//             {title}
//           </Text>
//           {!!subTitle && (
//             <Text size={13} lineHeight={15} color={homeisColors.b60} style={styles.subTitle}>
//               {subTitle}
//             </Text>
//           )}
//         </View>
//         <Text
//           size={16}
//           lineHeight={30}
//           color={isDoneBtnActive ? homeisColors.azure : homeisColors.b70}
//           onPress={isDoneBtnActive ? debounce(doneAction, 400, { leading: true, trailing: false }) : () => {}}
//           bold
//           testID={testID}
//           style={styles.doneBtn}
//         >
//           {adjustedDoneText}
//         </Text>
//       </View>
//     );
//   }

//   renderBackButton = () => (
//     <IconButton name="back-arrow" iconColor="b30" iconSize={26} onPress={navigationService.goBack} hitSlop={uiConstants.BTN_HITSLOP} style={styles.backBtn} />
//   );
// }

// SimpleHeader.defaultProps = {
//   showLeftButton: true,
//   hasBackBtn: false,
//   isDoneBtnActive: true
// };

// SimpleHeader.propTypes = {
//   showLeftButton: PropTypes.bool,
//   hasBackBtn: PropTypes.bool,
//   cancelAction: PropTypes.func,
//   doneAction: PropTypes.func,
//   title: PropTypes.string,
//   subTitle: PropTypes.string,
//   cancelText: PropTypes.string,
//   doneText: PropTypes.string,
//   isDoneBtnActive: PropTypes.bool,
//   testID: PropTypes.string
// };

// export default SimpleHeader;
