import { Linking, Platform, Clipboard } from "react-native";
// import branch from 'react-native-branch';
import { isObject, delayInMilliseconds } from "src/infra/utils";
import config from "src/config";
// import Logger from "src/reporting/Logger";

// const launchURL = async url => {
//   try {
//     const supported = await Linking.canOpenURL(url);

//     if (!supported) {
//       Logger.error(`This url is no supported: ${url}`);
//     } else {
//       await Linking.openURL(url);
//     }
//   } catch (err) {
//     if (url.includes("telprompt")) {
//       // telprompt was cancelled and Linking openURL method sees this as an error
//       // it is not a true error so ignore it to prevent apps crashing
//       // see https://github.com/anarchicknight/react-native-communications/issues/39
//     } else {
//       Logger.error(`Linking.openUrl failed; url: ${url}, error: ${err}`);
//     }
//   }
// };

// const mailto = async to => {
//   let url = "mailto:";
//   url += encodeURIComponent(to);

//   launchURL(url);
// };

// const call = phoneNumber => {
//   let url = Platform.OS !== "android" ? "telprompt:" : "tel:";
//   url += phoneNumber;

//   launchURL(url);
// };

// const isIosAndItunesLink = link => {
//   const match =
//     Platform.OS === "ios" && !!link.match(/^https?:\/\/itunes.apple.com/);

//   return match;
// };

// const getHomeisWebLink = ({ entityId, entityType }) => {
//   const user = global.store.getState().auth.user;
//   if (user && user.community) {
//     const {
//       community: { slug }
//     } = user;
//     return `${config.web.url}/${slug}/${entityType.toLowerCase()}s/${entityId}`;
//   }
//   return config.web.url;
// };

// const setClipboardHomeisWebLink = ({ entityId, entityType }) => {
//   const link = getHomeisWebLink({ entityId, entityType });
//   Clipboard.setString(link);
// };

// const getQueryStringParams = query =>
//   query
//     ? (/^[?#]/.test(query) ? query.slice(1) : query)
//         .split("&")
//         .reduce((params, param) => {
//           const [key, value] = param.split("=");
//           // eslint-disable-next-line no-param-reassign
//           params[key] = value
//             ? decodeURIComponent(value.replace(/\+/g, " "))
//             : "";
//           return params;
//         }, {})
//     : {};

// /* eslint-disable camelcase */
// const extractBranchLinkData = async () => {
//   let data = { channel: "Organic" };
//   let branchLinkData = await branch.getFirstReferringParams();
//   const { data_parsed, ...restBranchData } = branchLinkData;
//   if (isObject(branchLinkData)) {
//     if (!Object.keys(branchLinkData).length) {
//       await delayInMilliseconds(1000);
//       branchLinkData = await branch.getFirstReferringParams();
//     }
//     if (Object.keys(branchLinkData).length) {
//       data = {
//         campaign: branchLinkData["~campaign"],
//         channel: branchLinkData["~channel"],
//         tags: branchLinkData["~tags"],
//         linkId: branchLinkData["~id"],
//         thirdParty: branchLinkData.$3p,
//         ...restBranchData,
//         ...data_parsed
//       };
//     }
//   }
//   return data;
// };
// /* eslint-enable camelcase */

// export {
//   extractBranchLinkData,
//   mailto,
//   call,
//   isIosAndItunesLink,
//   getHomeisWebLink,
//   setClipboardHomeisWebLink,
//   getQueryStringParams
// };
