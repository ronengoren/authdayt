// import { Platform, Alert } from 'react-native';
// import Permissions from 'react-native-permissions';
// import I18n from '/infra/localization';
// import { addSpaceOnCapitalsAndCapitalize, capitalize } from '/infra/utils/stringUtils';

// const isIOS = Platform.OS === 'ios';

// const responseTypes = {
//   AUTHORIZED: 'authorized',
//   DENIED: 'denied',
//   RESTRICTED: 'restricted',
//   UNDETERMINED: 'undetermined'
// };

// class permissionsService {
//   static async isPermitted(type) {
//     const result = await Permissions.check(type);
//     return result === responseTypes.AUTHORIZED;
//   }

//   static async requestPermission(type) {
//     const result = await Permissions.request(type);
//     return result;
//   }

//   static popGoToSettingsModal({ type, actionText }) {
//     const permissionText = I18n.t(`modals.settings.permission_types.${type}`, { defaultValue: addSpaceOnCapitalsAndCapitalize(type) });
//     const canOpenSettings = Permissions.canOpenSettings();
//     const buttons = [
//       {
//         text: I18n.t('modals.settings.dismiss_button'),
//         style: 'cancel'
//       }
//     ];
//     if (canOpenSettings) {
//       buttons.push({
//         text: I18n.t('modals.settings.settings_button'),
//         onPress: Permissions.openSettings,
//         style: 'cancel'
//       });
//     }
//     const title = I18n.t('modals.settings.text', { permissionText, actionText });
//     const message = canOpenSettings
//       ? I18n.t('modals.settings.with_go_to_setting_button_text', { permissionText, actionText })
//       : I18n.t('modals.settings.without_go_to_setting_button_text', { permissionText, actionText });
//     Alert.alert(title, message, buttons);
//   }

//   static popPremissionNotAvailableModal({ type }) {
//     const permissionText = capitalize(I18n.t(`modals.settings.permission_types.${type}`, { defaultValue: addSpaceOnCapitalsAndCapitalize(type) }));
//     const title = I18n.t('modals.permission_restricted', { permissionText });
//     Alert.alert(title);
//   }

//   static async requestPermissionConditionally(type, options = {}) {
//     let result = await Permissions.check(type);
//     switch (result) {
//       case responseTypes.AUTHORIZED:
//         break;
//       case responseTypes.UNDETERMINED:
//         result = await this.requestPermission(type);
//         break;
//       case responseTypes.DENIED:
//         if (!options.requestOnlyUndetermined) {
//           if (isIOS) {
//             this.popGoToSettingsModal({ type, actionText: options.actionText });
//           } else {
//             result = await this.requestPermission(type);
//           }
//         }
//         break;
//       case responseTypes.RESTRICTED:
//         if (!options.requestOnlyUndetermined) {
//           if (isIOS) {
//             this.popPremissionNotAvailableModal({ type });
//           } else {
//             this.popGoToSettingsModal({ type, actionText: options.actionText });
//           }
//         }
//         break;
//       default:
//         this.popGoToSettingsModal({ type, actionText: options.actionText });
//     }

//     return result === responseTypes.AUTHORIZED;
//   }
// }

// export default permissionsService;
