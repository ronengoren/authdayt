import { isNil, get } from "../../infra/utils";
import { screenNames, genderType } from "../../vars/enums";

// eslint-disable-next-line import/prefer-default-export
export const getRelevantOnboardingScreen = ({ user }) => {
  const isGenderNotValid =
    isNil(get(user, "gender")) || get(user, "gender") === genderType.UNKNOWN;
  const userEmail = get(user, "email", "");
  const isEmailValid = !/@facebook.ronengoren.com/.exec(userEmail);

  if (!isEmailValid) {
    return screenNames.SetUserEmail;
  }

  if (isGenderNotValid) {
    return screenNames.SetUserGender;
  }

  return screenNames.SetUserCommunity;
};
