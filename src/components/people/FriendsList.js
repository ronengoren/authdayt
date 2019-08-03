import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import {
  approveFriendRequest,
  declineFriendRequest
} from "src/redux/friendships/actions";
import { EntityListsView } from "src/components";
import { GenericEmptyState } from "src/components/emptyState";
import {
  UserEntityComponent,
  UserEntityLoadingState
} from "src/components/entity";
import { View, Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { originTypes } from "src/vars/enums";
import { get } from "src/infra/utils";
import { stylesScheme } from "src/schemas";
import DeclineFriendshipModal from "./DeclineFriendshipModal";
import FriendshipRequestComponent from "./FriendshipRequestComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  firstInRow: {
    marginLeft: 15
  },
  subHeader: {
    marginTop: 20
  }
});

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeclineFriendshipModal: false,
      declinedUser: null
    };

    this.topSectionListProps = {
      // reducerStatePath: "friendships.requests",
      apiQuery: { domain: "friendships", key: "requests", params: {} },
      EntityComponent: this.renderFriendshipRequestComponent
    };
  }
  render() {
    const {
      additionalHeaderComponent,
      headerStyle,
      onScroll,
      floatingHeader,
      friendRequestsNumber,
      hideTopSection
    } = this.props;
    const { showDeclineFriendshipModal } = this.state;

    const bottomSectionListProps = this.getBottomSectionListProps();
    const topSectionSubHeaderProps = {
      leftText: I18n.t("people.sub_tabs.sub_tab_2"),
      badge: friendRequestsNumber,
      badgeColor: daytColors.pinkishRed,
      style: styles.subHeader
    };
    return (
      <View style={styles.container}>
        <EntityListsView
          ref={node => {
            this.entityListsView = node;
          }}
          topSectionSubHeaderProps={!hideTopSection && topSectionSubHeaderProps}
          topSectionListProps={!hideTopSection && this.topSectionListProps}
          bottomSectionListProps={bottomSectionListProps}
          componentColor={daytColors.pinkishRed}
          additionalHeaderComponent={additionalHeaderComponent}
          headerStyle={headerStyle}
          onScroll={onScroll}
        />

        {showDeclineFriendshipModal && (
          <DeclineFriendshipModal
            onCancel={this.toggleDeclineFriendshipModal}
            onConfirm={this.onUserRequestDecline}
          />
        )}
      </View>
    );
  }

  renderFriendshipRequestComponent = ({ data, index }) => (
    <FriendshipRequestComponent
      data={data}
      key={data.id}
      style={!index && styles.firstInRow}
      onFriendshipRequestApproval={this.onFriendshipRequestApproval}
      showDeclineFriendshipModal={this.setDeclinedUserAndToggleDeclinedModal}
    />
  );

  setDeclinedUserAndToggleDeclinedModal = ({ declinedUser }) => {
    this.setState({ declinedUser });
    this.toggleDeclineFriendshipModal();
  };

  toggleDeclineFriendshipModal = () => {
    const { showDeclineFriendshipModal } = this.state;
    this.setState({ showDeclineFriendshipModal: !showDeclineFriendshipModal });
  };

  onFriendshipRequestApproval = async ({ approvedUser }) => {
    const { approveFriendRequest } = this.props;
    const { id, name } = approvedUser;
    if (Platform.OS === "ios") {
      LayoutAnimation.easeInEaseOut();
    }
    approveFriendRequest({ userId: id, name });
  };

  onUserRequestDecline = async () => {
    const { declineFriendRequest } = this.props;
    const {
      declinedUser: { id, name }
    } = this.state;
    this.toggleDeclineFriendshipModal();

    if (Platform.OS === "ios") {
      LayoutAnimation.easeInEaseOut();
    }
    declineFriendRequest({ userId: id, name });
  };

  getBottomSectionListProps = () => {
    const { filters } = this.props;
    const staticBottomSectionListProps = {
      listItemProps: {
        originType: originTypes.DISCOVER
      },
      ListItemComponent: UserEntityComponent,
      listLoadingComponent: <UserEntityLoadingState />,
      listEmptyState: (
        <GenericEmptyState
          iconName="cat"
          isDaytIcon={false}
          headerText={I18n.t("empty_states.users.header")}
          bodyText={I18n.t("empty_states.users.body")}
        />
      )
    };

    const isFiltersEmpty =
      !filters || Object.values(filters).every(filterValue => !filterValue);

    if (filters && !isFiltersEmpty) {
      return {
        ...staticBottomSectionListProps,
        // reducerStatePath: "users.results",
        apiQuery: { domain: "users", key: "getUsers", params: filters }
      };
    }

    return {
      ...staticBottomSectionListProps,
      // reducerStatePath: "friendships.recommended",
      apiQuery: { domain: "friendships", key: "recommended" }
    };
  };

  scrollToOffset({ offset, force }) {
    this.entityListsView &&
      this.entityListsView
        .getWrappedInstance()
        .scrollToOffset({ offset, force });
  }
}

FriendsList.propTypes = {
  onScroll: PropTypes.func,
  friendRequestsNumber: PropTypes.number,
  approveFriendRequest: PropTypes.func,
  declineFriendRequest: PropTypes.func,
  additionalHeaderComponent: PropTypes.node,
  headerStyle: stylesScheme,
  filters: PropTypes.object,
  floatingHeader: PropTypes.node,
  hideTopSection: PropTypes.bool
};

export default FriendsList;
