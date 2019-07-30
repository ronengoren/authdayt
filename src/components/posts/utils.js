import I18n from "src/infra/localization";
import { postTypes, postSubTypes } from "src/vars/enums";
import {
  getDaysDifference,
  getLocaleTimeForFeed,
  translateDateTimeAMPM
} from "src/infra/utils/dateTimeUtils";

const getPostTimeText = (postType, eventTime, scheduledDate) => {
  if (scheduledDate) {
    return I18n.t("posts.header.scheduled_to", {
      scheduledDate: translateDateTimeAMPM(scheduledDate)
    });
  }
  const daysDifference = getDaysDifference(eventTime);
  const isBoardsPostType = [
    postTypes.JOB,
    postTypes.REAL_ESTATE,
    postTypes.GIVE_TAKE
  ].includes(postType);
  if (daysDifference <= 1) {
    return I18n.t("posts.header.today");
  } else if (isBoardsPostType) {
    return daysDifference <= 14
      ? I18n.t("posts.header.weeks", { count: Math.ceil(daysDifference / 7) })
      : getLocaleTimeForFeed(eventTime);
  }
  return null;
};

const getTranslatedPostType = ({ postType, postSubType, tags }) => {
  let translatedPostType = postType;
  switch (postType) {
    case postTypes.GIVE_TAKE:
      if (tags && tags.length) {
        translatedPostType = I18n.t(
          `postTypes.${postType}.${postSubType}.${tags[0]}`
        );
      } else {
        translatedPostType =
          postSubType === postSubTypes.OFFERING
            ? I18n.t(`postTypes.${postType}.generic_header`)
            : I18n.t(`postTypes.${postType}.${postSubType}`);
      }

      break;
    case postTypes.JOB:
      translatedPostType = I18n.t(`postTypes.${postType}.${postSubType}`);
      break;
    case postTypes.REAL_ESTATE:
      translatedPostType = I18n.t(
        `postTypes.${postType}.${postSubType}.${tags[0]}`,
        { defaults: [{ scope: `postTypes.${postType}.generic_header` }] }
      );
      break;
    default:
      translatedPostType = I18n.t(`postTypes.titles.${postType}`);
      translatedPostType = I18n.t(`postTypes.titles.${postType}`);
  }

  return translatedPostType;
};

export { getPostTimeText, getTranslatedPostType };
