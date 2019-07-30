import React from "react";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { EntityListsView } from "src/components";
import { CarouselItem } from "src/components/entityCarousel";
import { daytColors } from "src/vars";
import {
  entityTypes,
  originTypes,
  componentNamesForAnalytics,
  screenGroupNames
} from "src/vars/enums";
import { navigationService } from "src/infra/navigation";

const entitiesCreateScreenName = {
  [entityTypes.GROUP]: screenGroupNames.CREATE_GROUP_MODAL,
  [entityTypes.PAGE]: screenGroupNames.CREATE_PAGE_MODAL
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  createEntityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

class ProfileEntitiesList extends React.Component {
  static renderCreateButton({ entityType }) {
    return (
      <TouchableOpacity
        onPress={() =>
          ProfileEntitiesList.navigateToCreateEntity({ entityType })
        }
        style={styles.createEntityButton}
        activeOpacity={1}
      >
        <Text size={16} lineHeight={21} color={daytColors.b30}>
          {I18n.t("profile_entities_list.create_button")}
        </Text>
      </TouchableOpacity>
    );
  }

  static navigateToCreateEntity = ({ entityType }) => {
    const screenName = entitiesCreateScreenName[entityType];
    screenName && navigationService.navigate(screenName);
  };

  render() {
    const {
      topSectionSubHeaderProps,
      bottomSectionSubHeaderProps,
      topSectionListProps,
      bottomSectionListProps
    } = this.props;
    return (
      <View style={styles.container}>
        <EntityListsView
          topSectionSubHeaderProps={topSectionSubHeaderProps}
          bottomSectionSubHeaderProps={bottomSectionSubHeaderProps}
          topSectionListProps={{
            ...topSectionListProps,
            EntityComponent: this.renderAdminGroupComponent()
          }}
          bottomSectionListProps={bottomSectionListProps}
          componentColor={daytColors.golden}
        />
      </View>
    );
  }

  renderAdminGroupComponent = () => ({ data, index }) => {
    const { entityType } = this.props;

    return (
      <CarouselItem
        size={
          this.isViewingOwnLists
            ? CarouselItem.sizes.SMALL_ACTIONLESS
            : CarouselItem.sizes.SMALL
        }
        itemNumber={index}
        item={data}
        key={data.id}
        entityType={entityType}
        originType={originTypes.VIEW}
        componentName={componentNamesForAnalytics.FEED_ITEM}
      />
    );
  };

  isViewingOwnLists = this.props.appUserId === this.props.userProfileId;
}

ProfileEntitiesList.propTypes = {
  appUserId: PropTypes.string,
  userProfileId: PropTypes.string,
  entityType: PropTypes.oneOf(Object.values(entityTypes)),
  topSectionSubHeaderProps: PropTypes.shape({
    leftText: PropTypes.string
  }),
  bottomSectionSubHeaderProps: PropTypes.shape({
    leftText: PropTypes.string
  }),
  topSectionListProps: PropTypes.shape({
    apiQuery: PropTypes.object,
    reducerStatePath: PropTypes.string,
    EntityComponent: PropTypes.func
  }),
  bottomSectionListProps: PropTypes.shape({
    apiQuery: PropTypes.object,
    reducerStatePath: PropTypes.string,
    entityComponent: PropTypes.node,
    listEmptyState: PropTypes.node,
    listLoadingComponent: PropTypes.node
  })
};

const mapStateToProps = state => ({
  appUserId: state.auth.user.id
});

ProfileEntitiesList = connect(mapStateToProps)(ProfileEntitiesList);
export default ProfileEntitiesList;
