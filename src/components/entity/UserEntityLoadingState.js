import React from "react";
import { StyleSheet } from "react-native";
import { View, PlaceholderRectangle } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: daytColors.white,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4
  },
  itemTopSection: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: daytColors.white,
    borderRadius: 15
  }
});

class UserEntityLoadingState extends React.PureComponent {
  static renderPlaceholderItem(key) {
    return (
      <View style={styles.itemContainer} key={key}>
        <View style={styles.itemTopSection}>
          <PlaceholderRectangle
            width={100}
            height={120}
            borderRadius={10}
            marginRight={15}
            marginBottom={0}
          />
          <View>
            <PlaceholderRectangle
              width={110}
              height={16}
              borderRadius={7}
              marginRight={0}
              marginBottom={8}
            />
            <PlaceholderRectangle
              width={140}
              height={13}
              borderRadius={6}
              marginRight={0}
              marginBottom={6}
            />
            <PlaceholderRectangle
              width={60}
              height={13}
              borderRadius={6}
              marginRight={0}
              marginBottom={20}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return [
      UserEntityLoadingState.renderPlaceholderItem(1),
      UserEntityLoadingState.renderPlaceholderItem(2),
      UserEntityLoadingState.renderPlaceholderItem(3),
      UserEntityLoadingState.renderPlaceholderItem(4),
      UserEntityLoadingState.renderPlaceholderItem(5)
    ];
  }
}

export default UserEntityLoadingState;
