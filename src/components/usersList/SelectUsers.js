import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { addMembers } from "src/redux/groups/actions";
import { SimpleHeader, UsersList, EmptySearch } from "src/components";
import {
  View,
  Checkbox,
  TextInput,
  QueryCancelIcon,
  Text
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors, commonStyles } from "src/vars";
import { get } from "src/infra/utils";

const styles = StyleSheet.create({
  inputOuterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    backgroundColor: daytColors.white,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  searchIcon: {
    position: "absolute",
    top: 21,
    left: 25,
    zIndex: 1
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    width: "100%",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: daytColors.veryLightPink
  },
  inputContainer: {
    width: "100%",
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: daytColors.transparent
  },
  inputContainerFocused: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.azure
  },
  input: {
    fontSize: 16,
    color: daytColors.b30,
    padding: 0,
    paddingLeft: 35,
    paddingRight: 25
  },
  cancelIcon: {
    position: "absolute",
    top: 12,
    right: 10
  },
  userStatus: {
    borderWidth: 1,
    borderColor: daytColors.b90,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});

const UserStatusType = {
  NONE: 0,
  INVITED: 1,
  PENDING: 2,
  MEMBER: 3,
  FOLLOWING: 4
};

class SelectUsers extends React.Component {
  state = {
    queryField: null,
    selectedUsers: new Map(),
    searchTerm: "",
    isSearchFocused: false
  };

  render() {
    const {
      queryField,
      searchTerm,
      selectedUsers,
      isSearchFocused
    } = this.state;
    const {
      headerProps: { mandatorySelect, doneAction, doneText, title },
      subHeader,
      listProps
    } = this.props;
    const apiQuery = {
      ...listProps.apiQuery,
      params: { ...listProps.apiQuery.params, perPage: 15, searchTerm }
    };
    const isSubmitEnabled = mandatorySelect ? selectedUsers.size > 0 : true;

    return (
      <View style={commonStyles.flex1}>
        <SimpleHeader
          hasBackBtn
          doneAction={() => doneAction({ selectedUsers })}
          doneText={doneText}
          isDoneBtnActive={isSubmitEnabled}
          title={title}
          testID="selectUsersSubmitCommand"
        />
        {subHeader}
        <View style={styles.inputOuterWrapper}>
          <AwesomeIcon
            name="search"
            size={17}
            color={daytColors.b60}
            style={styles.searchIcon}
            weight="solid"
          />
          <View style={styles.inputWrapper}>
            <TextInput
              onChange={val => this.setState({ queryField: val })}
              onChangeDebounced={query => this.setState({ searchTerm: query })}
              debounceTime={250}
              containerStyle={[
                styles.inputContainer,
                isSearchFocused && styles.inputContainerFocused
              ]}
              autoCapitalize="none"
              value={queryField}
              placeholder={I18n.t("select_users.search_input_placeholder")}
              placeholderTextColor={daytColors.b60}
              inputStyle={styles.input}
              height={38}
              autoFocus={false}
              onFocus={() =>
                !isSearchFocused && this.setState({ isSearchFocused: true })
              }
              onBlur={() =>
                isSearchFocused && this.setState({ isSearchFocused: false })
              }
            />
            {!!searchTerm && (
              <QueryCancelIcon
                onPress={() => this.setState({ queryField: null })}
                iconColor={daytColors.b70}
                style={styles.cancelIcon}
              />
            )}
          </View>
        </View>
        <View style={commonStyles.flex1}>
          <UsersList
            reducerStatePath={listProps.reducerStatePath}
            apiQuery={apiQuery}
            extraData={this.state}
            renderRightComponent={this.renderRightComponent}
            ListEmptyComponent={
              <EmptySearch text={I18n.t("select_users.empty_state")} />
            }
          />
        </View>
      </View>
    );
  }

  renderRightComponent = ({ user }) => {
    const { userStatusType } = user;
    if (userStatusType && userStatusType !== UserStatusType.NONE) {
      return (
        <Text style={styles.userStatus} color={daytColors.b60}>
          {I18n.t(`select_users.user_status_type.${userStatusType}`)}
        </Text>
      );
    }
    return (
      <Checkbox
        testID="selectUserCheckbox"
        value={this.isSelected({ userId: user.id })}
        onChange={this.toggleUserSelect({ user })}
        size="small"
        selectedBackgroundColor={daytColors.azure}
      />
    );
  };

  toggleUserSelect = ({ user }) => () => {
    this.setState(state => {
      const selectedUsers = new Map(state.selectedUsers);
      selectedUsers.has(user.id)
        ? selectedUsers.delete(user.id)
        : selectedUsers.set(user.id, { user });
      return { selectedUsers };
    });
  };

  isSelected = ({ userId }) => !!this.state.selectedUsers.get(userId);
}

SelectUsers.defaultProps = {
  subHeader: null
};

SelectUsers.propTypes = {
  listProps: PropTypes.shape({
    apiQuery: PropTypes.shape({ params: PropTypes.object }),
    reducerStatePath: PropTypes.string
  }),
  headerProps: PropTypes.shape({
    mandatorySelect: PropTypes.bool,
    doneAction: PropTypes.func,
    doneText: PropTypes.string,
    title: PropTypes.string
  }),
  subHeader: PropTypes.node
};

const mapStateToProps = (state, ownProps) => ({
  data: get(state, `${ownProps.listProps.reducerStatePath}.data`, [])
});

const mapDispatchToProps = {
  addMembers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectUsers);
