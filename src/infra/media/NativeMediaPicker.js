import ImagePicker from "react-native-image-crop-picker";
import { Alert } from "react-native";
import I18n from "../../infra/localization";
import { openActionSheet } from "../../redux/controllers/actions";
import { mediaTypes } from "../../vars/enums";

// const mapMediaTypes = {
//   image: "photo",
//   video: "video",
//   any: "any"
// };
// const errorCodes = {
//   USER_CANCELLED: "E_PICKER_CANCELLED",
//   NO_PHOTO_LIBRARY_PERMISSIONS: "E_PERMISSION_MISSING"
// };

// class NativeMediaPicker {
//   static show({ mediaType, options }) {
//     return new Promise((resolve, reject) => {
//       const onCancel = () => resolve();
//       const onPickerChosen = () => {
//         setTimeout(
//           () =>
//             NativeMediaPicker.openPicker({ mediaType, options })
//               .then(resolve)
//               .catch(reject),
//           1000
//         );
//       };
//       const onCameraChosen = () => {
//         setTimeout(
//           () =>
//             NativeMediaPicker.openCamera({ mediaType })
//               .then(resolve)
//               .catch(reject),
//           1000
//         );
//       };

//       NativeMediaPicker._showActionSheet({
//         mediaType,
//         onCancel,
//         onPickerChosen,
//         onCameraChosen
//       });
//     });
//   }

//   static _showActionSheet({
//     mediaType,
//     onCancel,
//     onPickerChosen,
//     onCameraChosen
//   }) {
//     const actionSheetDefinitions = NativeMediaPicker.getActionSheetDefinitions({
//       mediaType,
//       onCancel,
//       onPickerChosen,
//       onCameraChosen
//     });
//     global.store.dispatch(openActionSheet(actionSheetDefinitions));
//   }

//   static getActionSheetDefinitions({
//     mediaType,
//     onCancel,
//     onPickerChosen,
//     onCameraChosen
//   }) {
//     return {
//       options: [
//         {
//           id: "camera",
//           text:
//             mediaType === mediaTypes.VIDEO
//               ? I18n.t("image_picker.options.video_camera")
//               : I18n.t("image_picker.options.image_camera"),
//           shouldClose: true,
//           action: onCameraChosen
//         },
//         {
//           id: "picker",
//           text: I18n.t("image_picker.options.gallery"),
//           shouldClose: true,
//           action: onPickerChosen
//         }
//       ],
//       hasCancelButton: true,
//       onCancel
//     };
//   }

//   static openPicker({ mediaType, options = {} }) {
//     return new Promise((resolve, reject) => {
//       ImagePicker.openPicker({
//         mediaType: mapMediaTypes[mediaType] || mapMediaTypes.any,
//         compressImageQuality: 0.8,
//         compressImageMaxWidth: 2048,
//         compressImageMaxHeight: 2048,
//         multiple: false,
//         maxFiles: 5,
//         ...options
//       })
//         .then(res => {
//           if (Array.isArray(res)) {
//             const medias = res.map(media => ({
//               localUri: media.path,
//               fileName: NativeMediaPicker._getFileName(media.path),
//               mediaType
//             }));
//             resolve(medias);
//           } else {
//             const media = {
//               localUri: res.path,
//               fileName: NativeMediaPicker._getFileName(res.path),
//               mediaType
//             };
//             options.multiple ? resolve([media]) : resolve(media);
//           }
//         })
//         .catch(err => {
//           switch (err.code) {
//             case errorCodes.USER_CANCELLED:
//               resolve();
//               break;
//             case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
//               Alert.alert(
//                 I18n.t("image_picker.permission_error.header"),
//                 I18n.t("image_picker.permission_error.body"),
//                 [{ text: I18n.t("image_picker.permission_error.button") }]
//               );
//               // TODO: add opensettings lib (https://github.com/yonahforst/react-native-permissions)
//               resolve();
//               break;
//             default:
//               reject(err);
//           }
//         });
//     });
//   }

//   static openCamera({ mediaType, options = {} }) {
//     return new Promise((resolve, reject) => {
//       ImagePicker.openCamera({
//         mediaType: mapMediaTypes[mediaType],
//         width: 300,
//         height: 400,
//         ...options
//       })
//         .then(({ path }) => {
//           const media = {
//             localUri: path,
//             fileName: NativeMediaPicker._getFileName(path),
//             mediaType
//           };
//           options.multiple ? resolve([media]) : resolve(media);
//         })
//         .catch(err => {
//           switch (err.code) {
//             case errorCodes.USER_CANCELLED:
//               resolve();
//               break;
//             case errorCodes.NO_PHOTO_LIBRARY_PERMISSIONS:
//               Alert.alert(
//                 I18n.t("image_picker.permission_error.header"),
//                 I18n.t("image_picker.permission_error.body"),
//                 [{ text: I18n.t("image_picker.permission_error.button") }]
//               );
//               // TODO: add opensettings lib (https://github.com/yonahforst/react-native-permissions)
//               resolve();
//               break;
//             default:
//               reject(err);
//           }
//         });
//     });
//   }

//   static _getFileName(path) {
//     return path.split("/").pop();
//   }
// }

// export default NativeMediaPicker;
