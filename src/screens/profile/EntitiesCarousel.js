import React, { Component } from "react";
import I18n from "src/infra/localization";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { apiQuery } from "src/redux/apiQuery/actions";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import EntityCard from "./EntityCard";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  loadingState: {
    flexDirection: "row",
    marginLeft: 15
  }
});

class EntitiesCarousel extends Component {
  state = {
    data: this.props.data
  };

  static renderLoadingState = () => (
    <View style={styles.loadingState}>
      {Array.from({ length: 5 }, (item, index) =>
        EntityCard.renderPlaceholder({ marginRight: 10, index })
      )}
    </View>
  );

  render() {
    const { data } = this.state;
    const { onAllPress, style } = this.props;

    return (
      <View style={style}>
        <View style={styles.header}>
          {this.renderTitle()}
          {!!onAllPress && this.renderAllButton()}
        </View>
        {data ? this.renderList() : EntitiesCarousel.renderLoadingState()}
      </View>
    );
  }

  componentDidMount() {
    const { query } = this.props;
    query && this.getData();
  }

  renderTitle() {
    const { count, title } = this.props;
    const countText = count ? ` · ${count}` : "";

    return (
      <Text
        bold
        size={16}
        lineHeight={22}
        color={daytColors.b30}
      >{`${title}${countText}`}</Text>
    );
  }

  renderAllButton() {
    const { onAllPress } = this.props;

    return (
      <Text
        size={16}
        lineHeight={22}
        color={daytColors.azure}
        onPress={onAllPress}
      >
        {I18n.t("profile.view.carousels_all_btn")}
      </Text>
    );
  }

  renderList() {
    const { data } = this.state;
    const {
      onItemPress,
      isUserEntity,
      firstItemStyle,
      showItemBadge
    } = this.props;

    return (
      <ScrollView horizontal>
        {data.map(({ id, name, media, themeColor }, index) => (
          <EntityCard
            firstItemStyle={firstItemStyle}
            showItemBadge={showItemBadge && showItemBadge(data[index])}
            id={id}
            onPress={onItemPress}
            text={name}
            imageSrc={
              media.source ||
              (media.url && { uri: media.url }) ||
              (media.thumbnail && { uri: media.thumbnail })
            }
            themeColor={themeColor}
            key={id}
            index={index}
            isUserEntity={isUserEntity}
          />
        ))}
      </ScrollView>
    );
  }

  async getData() {
    const { apiQuery, query } = this.props;
    const response = await apiQuery({ query });
    this.setState({ data: response.data.data });
  }
}

EntitiesCarousel.propTypes = {
  firstItemStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  count: PropTypes.number,
  title: PropTypes.string,
  onAllPress: PropTypes.func,
  onItemPress: PropTypes.func,
  query: PropTypes.object,
  data: PropTypes.array,
  isUserEntity: PropTypes.bool,
  showItemBadge: PropTypes.func
};

export default connect(
  null,
  { apiQuery }
)(EntitiesCarousel);
