import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from "react-native";
import { View, PlaceholderRectangle } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  itemContainer: {
    height: 260,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: daytColors.white,
    borderRadius: 15,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  compactItemContainer: {
    height: 160
  },
  itemTopSection: {
    flexDirection: "row",
    padding: 15
  },
  itemMiddleSection: {
    paddingHorizontal: 15
  },
  compactActionPlaceholder: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  box: {
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2,
    paddingTop: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  name: {
    fontSize: 20,
    // marginBottom: 20,
    fontWeight: "bold",
    color: "#1E90FF"
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20
  },

  button: {
    width: 60,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4
  },
  buttonMessage: {
    backgroundColor: "#00BFFF"
  },
  buttonLike: {
    backgroundColor: "#228B22"
  },
  buttonLove: {
    backgroundColor: "#FF1493"
  },
  buttonCall: {
    backgroundColor: "#40E0D0"
  },
  icon: {
    width: 35,
    height: 35
  }
});

class EntitiesLoadingState extends Component {
  constructor(props) {
    super(props);
  }
  static COMPONENT_TYPE = {
    COMPACT: "compact",
    REGULAR: "regular"
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };
  static renderPlaceholderFeedItem(type, key) {
    const isCompact = type === EntitiesLoadingState.COMPONENT_TYPE.COMPACT;
    return (
      <View
        style={[styles.itemContainer, isCompact && styles.compactItemContainer]}
        key={key}
      >
        <View style={styles.itemTopSection}>
          {/* <PlaceholderRectangle
            width={isCompact ? 60 : 35}
            height={isCompact ? 60 : 35}
            borderRadius={isCompact ? 10 : 30}
          /> */}
          <View>
            {/* <PlaceholderRectangle width={109} height={15} borderRadius={3} /> */}
            <Text style={styles.name}>John Doe, 27, Brooklyn</Text>

            {/* <PlaceholderRectangle width={65} /> */}
          </View>
        </View>
        {!isCompact && (
          <View style={styles.itemMiddleSection}>
            <PlaceholderRectangle width={270} />
            <PlaceholderRectangle width={315} />
            <PlaceholderRectangle width={135} marginBottom={25} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={[styles.button, styles.buttonMessage]}
            onPress={() => this.onClickListener("message")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/cocktail.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonLike]}
            onPress={() => this.onClickListener("like")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/50/000000/sunset.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonLove]}
            onPress={() => this.onClickListener("love")}
          >
            <Image
              style={styles.icon}
              source={{
                uri:
                  "https://img.icons8.com/pastel-glyph/64/000000/tent-in-the-forest.png"
              }}
            />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, styles.buttonCall]}
            onPress={() => this.onClickListener("phone")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/ticket.png"
              }}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.buttonCall]}
            onPress={() => this.onClickListener("phone")}
          >
            <Image
              style={styles.icon}
              source={{
                uri: "https://img.icons8.com/ios/64/000000/ticket.png"
              }}
            />
          </TouchableHighlight>
          <PlaceholderRectangle
            // width={"100%"}
            // height={60}
            borderRadius={0}
            style={isCompact && styles.compactActionPlaceholder}
          />
        </View>
      </View>
    );
  }

  render() {
    const { type } = this.props;
    return [
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 1),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 2),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 3),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 4),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 5),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 6),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 7),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 8)
    ];
  }
}

EntitiesLoadingState.defaultProps = {
  type: EntitiesLoadingState.COMPONENT_TYPE.REGULAR
};

EntitiesLoadingState.propTypes = {
  type: PropTypes.oneOf(Object.values(EntitiesLoadingState.COMPONENT_TYPE))
};

export default EntitiesLoadingState;
