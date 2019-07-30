import React from "react";
import { StyleSheet } from "react-native";
import { View, PlaceholderRectangle } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: daytColors.white,
    marginHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 15
  }
});

class ProfileDetailsEmptyState extends React.Component {
  render() {
    return (
      <View style={[commonStyles.shadow, styles.card]}>
        <PlaceholderRectangle
          height={19}
          width="30%"
          borderRadius={10}
          marginBottom={15}
        />
        <PlaceholderRectangle
          width="100%"
          borderRadius={10}
          marginBottom={13}
        />
        <PlaceholderRectangle
          width="100%"
          borderRadius={10}
          marginBottom={13}
        />
        <PlaceholderRectangle width="80%" borderRadius={10} />
      </View>
    );
  }
}

export default ProfileDetailsEmptyState;
