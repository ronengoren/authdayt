import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated } from "react-native";
import { Avatar } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const animationConsts = {
  initialValue: 0,
  targetValue: -6,
  delay: 150,
  duration: 500
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 30
  },
  bubblesContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 45,
    padding: 10,
    marginLeft: 5,
    borderRadius: 28,
    backgroundColor: daytColors.paleGreyFour
  },
  bubble: {
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: daytColors.b60,
    marginRight: 5
  }
});

class TypingIndicator extends Component {
  state = {
    bubblesY: [
      new Animated.Value(animationConsts.initialValue),
      new Animated.Value(animationConsts.initialValue),
      new Animated.Value(animationConsts.initialValue)
    ]
  };

  render() {
    const { bubblesY } = this.state;
    const { participantAvatar, participantName } = this.props;
    return (
      <View style={styles.container}>
        <Avatar
          size="small1"
          style={styles.image}
          entityId={""}
          entityType="user"
          name={participantName}
          thumbnail={participantAvatar}
        />
        <View style={styles.bubblesContainer}>
          {bubblesY.map((animatedY, index) => (
            <Animated.View
              key={index}
              style={[
                styles.bubble,
                { transform: [{ translateY: animatedY }] }
              ]}
            /> // eslint-disable-line react/no-array-index-key
          ))}
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.stagger(animationConsts.delay, [
      this.animateUpAndDown(0),
      this.animateUpAndDown(1),
      this.animateUpAndDown(2)
    ]).start();
  }

  animateUpAndDown(i) {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.bubblesY[i], {
          toValue: animationConsts.targetValue,
          duration: animationConsts.duration,
          useNativeDriver: true
        }),
        Animated.timing(this.state.bubblesY[i], {
          toValue: animationConsts.initialValue,
          duration: animationConsts.duration,
          useNativeDriver: true
        })
      ])
    );
  }
}

TypingIndicator.propTypes = {
  participantAvatar: PropTypes.string,
  participantName: PropTypes.string
};

export default TypingIndicator;
