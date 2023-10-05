import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import { colors } from "../theme/Colors";
import { commonFont } from "../theme/Fonts";
import { hp, wp } from "../helper/constants";
import { UniversalProps } from "../navigation/NavigationTypes";
import { ApplicationStyles } from "../theme/ApplicationStyles";

const Home = ({ navigation }: UniversalProps) => {
  const data = [
    {
      id: 1,
      url: "https://braincal.com/wp-content/uploads/braincal-banner-768x274.jpg",
      title_1: "Education gives you wings to fly.",
      title_2: "BrainCal can give you all the skills to fly.",
    },
    {
      id: 2,
      url: "https://braincal.com/wp-content/uploads/braincal-banner2-768x274.jpg",
      title_1: "Education is not an expense, it’s an investment",
      title_2:
        "BrainCal is the platform where your investment gets best results.",
    },
  ];

  interface _renderItemProps {
    item: {
      id: Number;
      title_1: String;
      title_2: String;
      url: any;
    };
    index: Number;
  }

  const _renderItem = ({ item, index }: _renderItemProps) => {
    return (
      <View key={index.toString()} style={styles.itemContainer}>
        <Image
          resizeMode="cover"
          source={{ uri: item.url }}
          style={styles.itemImgStyle}
        />
        <Text style={styles.itemTitleStyle}>{item.title_1}</Text>
        <Text style={styles.itemTitleStyle}>{item.title_2}</Text>
      </View>
    );
  };

  return (
    <View style={ApplicationStyles.container}>
      <View
        style={{ ...ApplicationStyles.innerContainer, paddingHorizontal: 0 }}
      >
        <View>
          <Carousel
            loop={true}
            data={data}
            autoplay={true}
            autoplayInterval={5000}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
          />
        </View>
        <Text style={styles.textStyle}>
          Our vision is to shape your future, slowly and gradually, you would be
          directed and supported in doing hands on work at each stage. This
          unique learning experience that anybody can get on Braincal gives them
          a structured guidance on how you think, troubleshoot each task and
          learn in an innovative way. It builds your computational ability to
          solve the most difficult problem in seconds which is a vital criteria
          for any entrance exam. This innovative approach is welcomed by both
          parents and children. Our approach is to help your child understand
          how to improve in all dimensions with time.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: hp(3),
    alignSelf: "center",
  },
  itemImgStyle: {
    height: hp(20),
    width: wp(92),
  },
  itemTitleStyle: {
    ...commonFont(500, 17, colors.black),
    textAlign: "center",
    marginTop: hp(1.5),
  },
  textStyle: {
    ...commonFont(500, 16, colors.black),
    marginHorizontal: wp(5),
    textAlign: "justify",
  },
});

export default Home;
