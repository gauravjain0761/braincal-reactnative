import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Utils";
import { useNavigation } from "@react-navigation/native";

const Science = ({}: UniversalProps) => {
  const navigation = useNavigation();

  const onPressLevel = (typeValue: number, heading: string) => {
    navigation.navigate("LevelListData", {
      type: "science_11",
      typeValue: typeValue,
      heading: heading,
    });
  };
  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <LevelsBlock
          title={"Biology"}
          onPressLevel={() => {
            onPressLevel(39, "11 Plus Biology");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Chemistry"}
          onPressLevel={() => {
            onPressLevel(38, "11 Plus Chemistry");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Physics"}
          onPressLevel={() => {
            onPressLevel(37, "11 Plus Physics");
          }}
          bgColor={colors.skyBlue1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Science;
