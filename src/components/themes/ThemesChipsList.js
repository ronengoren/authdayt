import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "src/components/basicComponents";
import { ThemeChip, MY_HOOD } from "src/components/themes";
import { screenNames, originTypes } from "src/vars/enums";
import { stylesScheme } from "src/schemas";
import { navigationService } from "src/infra/navigation";

class ThemesChipsList extends React.Component {
  render() {
    const { themes, chipSize, style } = this.props;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style}
      >
        {themes.map(theme => (
          <ThemeChip
            key={theme}
            theme={theme}
            onPress={this.navigateToThemePage}
            size={chipSize}
            withArrow
          />
        ))}
      </ScrollView>
    );
  }

  navigateToThemePage = ({ theme }) => {
    const { isShowSaved, originType, preNavAction } = this.props;
    preNavAction && preNavAction();

    if (theme === MY_HOOD) {
      navigationService.navigate(screenNames.MyNeighborhoodView, {
        isShowSaved
      });
    } else {
      navigationService.navigate(screenNames.MyThemeView, {
        theme,
        originType,
        isShowSaved
      });
    }
  };
}

ThemesChipsList.propTypes = {
  themes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isShowSaved: PropTypes.bool,
  originType: PropTypes.oneOf(Object.values(originTypes)),
  chipSize: PropTypes.oneOf(Object.values(ThemeChip.sizes)),
  style: stylesScheme,
  preNavAction: PropTypes.func
};

export default ThemesChipsList;
