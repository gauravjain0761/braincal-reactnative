import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Utils";
import { useNavigation } from "@react-navigation/native";

const English = ({}: UniversalProps) => {
  const navigation = useNavigation();
  const onPressLevel = (typeValue: number, heading: string) => {
    navigation.navigate("LevelListData", {
      type: "english_11",
      typeValue: typeValue,
      heading: heading,
    });
  };
  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <LevelsBlock
          title={"Level 1"}
          onPressLevel={() => {
            onPressLevel(27, "11 Plus English Level 1");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Level 2"}
          onPressLevel={() => {
            onPressLevel(28, "11 Plus English Level 2");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Level 3"}
          onPressLevel={() => {
            onPressLevel(29, "11 Plus English Level 3");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"11+English Marathon Test"}
          onPressLevel={() => {}}
          bgColor={colors.pink}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default English;
