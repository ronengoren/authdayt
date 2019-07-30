// import { AfterReportModal } from "/components/modals";
import I18n from "src/infra/localization";
import { reportTypes } from "src/vars/enums";
import { daytColors } from "src/vars";

const mainActionSheetDefinition = ({
  withReport,
  withUnfriend,
  onUnFriend,
  onReport,
  userName
}) => {
  const options = [];
  if (withUnfriend) {
    options.push({
      id: "unfriend",
      text: I18n.t("profile.action_sheets.unfriend", { userName }),
      iconName: "remove-friend",
      shouldClose: true,
      action: onUnFriend
    });
  }
  if (withReport) {
    options.push({
      id: "report",
      text: I18n.t("profile.action_sheets.report.button", { userName }),
      iconName: "flag",
      action: onReport
    });
  }
  return {
    options,
    hasCancelButton: true
  };
};

const reportActionSheetDefinition = ({ entityType, entityId }) => ({
  apiCommand
}) => {
  const report = async reportType => {
    await apiCommand("reports.create", { entityType, entityId, reportType });
    // AfterReportModal.showAlert();
  };

  return {
    header: {
      text: I18n.t("profile.action_sheets.report.title")
    },
    options: [
      {
        id: "report/inappropriate",
        text: I18n.t("profile.action_sheets.report.inappropriate"),
        shouldClose: true,
        action: () => report(reportTypes.OFFENSIVE)
      },
      {
        id: "report/scam",
        text: I18n.t("profile.action_sheets.report.scam"),
        shouldClose: true,
        action: () => report(reportTypes.SCAM)
      }
    ],
    hasCancelButton: true
  };
};

const cancelFriendRequestActionSheetDefinition = ({ cancelFriendRequest }) => ({
  options: [
    {
      id: "cancelFriendRequest",
      text: I18n.t("profile.action_sheets.cancel_friend_request"),
      shouldClose: true,
      action: cancelFriendRequest
    }
  ],
  hasCancelButton: true
});

const confirmOrDeleteFriendshipRequest = ({
  confirmFriendshipRequest,
  deleteFriendshipRequest
}) => ({
  options: [
    {
      id: "confirmFriendshipRequest",
      text: I18n.t("profile.action_sheets.confirm_friend_request"),
      shouldClose: true,
      action: confirmFriendshipRequest
    },
    {
      id: "deleteFriendshipRequest",
      text: I18n.t("profile.action_sheets.delete_friend_request"),
      shouldClose: true,
      color: daytColors.red,
      action: deleteFriendshipRequest
    }
  ],
  hasCancelButton: true
});

export {
  mainActionSheetDefinition,
  reportActionSheetDefinition,
  cancelFriendRequestActionSheetDefinition,
  confirmOrDeleteFriendshipRequest
};
