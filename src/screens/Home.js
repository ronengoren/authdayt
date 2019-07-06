import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import City from "../components/presentation/City";
import Filters from "../components/presentation/Filters";
import CardItem from "../components/presentation/CardItem";
import styles from "../assets/styles";
import Demo from "../assets/data/demo.js";

const Home = () => {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>
        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
        >
          {Demo.map((item, index) => (
            <Card key={index}>
              <CardItem
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default Home;
