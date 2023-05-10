import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Utils";
import { useAppDispatch } from "../redux/Hooks";
import { useNavigation } from "@react-navigation/native";

const Maths = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onPressLevel = (typeValue: number, heading: string) => {
    navigation.navigate("LevelListData", {
      type: "maths_11",
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
            onPressLevel(24, "11 Plus Maths Level 1");
          }}
          bgColor={colors.primary}
        />
        <LevelsBlock
          title={"Level 2"}
          onPressLevel={() => {
            onPressLevel(23, "11 Plus Maths Level 2");
          }}
          bgColor={colors.darkBlue}
        />
        <LevelsBlock
          title={"Level 3"}
          onPressLevel={() => {
            onPressLevel(25, "11 Plus Maths Level 3");
          }}
          bgColor={colors.primary}
        />
        <LevelsBlock
          title={"11+Maths Marathon Test"}
          onPressLevel={() => {}}
          bgColor={colors.darkBlue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Maths;
