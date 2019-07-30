import { daytColors } from "src/vars";

const UI_DEFINITIONS = {
  myhood: { iconName: "map-marker-alt", backgroundColor: daytColors.skyBlue },
  family: {
    iconName: "male",
    secondIconName: "female",
    backgroundColor: daytColors.liliac
  },
  eatDrink: { iconName: "utensils", backgroundColor: daytColors.pinky },
  essentials: {
    iconName: "toolbox",
    backgroundColor: daytColors.periwinkleBlue
  },
  health: { iconName: "user-md", backgroundColor: daytColors.sandYellow },
  lifestyle: {
    iconName: "paint-brush",
    backgroundColor: daytColors.tiffanyBlue
  },
  legal: { iconName: "gavel", backgroundColor: daytColors.lightTeal },
  travel: { iconName: "plane", backgroundColor: daytColors.apricotTwo },
  other: { iconName: "feather-alt", backgroundColor: daytColors.lightGreyBlue },
  default: { iconName: "folder", backgroundColor: daytColors.silver }
};

export const getThemeUI = theme =>
  UI_DEFINITIONS[theme] || UI_DEFINITIONS.default; // eslint-disable-line import/prefer-default-export

export const MY_HOOD = "myhood";
