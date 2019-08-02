import React from "react";
import I18n from "src/infra/localization";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";
import connect from "react-redux/es/connect/connect";
import { entityTypes } from "src/vars/enums";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    height: 55,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 2
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    color: daytColors.b60,
    textAlign: "left",
    flex: 1
  },
  avatar: {
    marginLeft: 10,
    marginRight: 10
  },
  postText: {
    fontWeight: "bold",
    color: daytColors.azure,
    marginRight: 15,
    fontSize: 16
  }
});

class PostButton extends React.Component {
  render() {
    const { text, user, onPress, testID } = this.props;
    const { id, themeColor, name, media } = user;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[commonStyles.shadow, styles.wrapper]}
      >
        <Avatar
          style={styles.avatar}
          size="medium1"
          entityId={id}
          entityType={entityTypes.USER}
          themeColor={themeColor}
          name={name}
          thumbnail={media ? media.thumbnail : null}
          linkable={false}
        />
        <Text
          numberOfLines={1}
          style={styles.textStyle}
          key="text"
          testID={testID}
        >
          {text}
        </Text>
        <Text style={styles.postText}>{I18n.t("home.post_button")}</Text>
      </TouchableOpacity>
    );
  }
}

PostButton.defaultProps = {
  testID: "postButton"
};

PostButton.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
  onPress: PropTypes.func,
  testID: PropTypes.string
};

// const mapStateToProps = (state) => ({
//   user: state.auth.user
// });

// PostButton = connect(mapStateToProps)(PostButton);
export default PostButton;
