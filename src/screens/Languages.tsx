import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../navigation/NavigationTypes";
import { hp, wp } from "../helper/constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Colors";
import { useAppDispatch } from "../redux/Hooks";
import { useNavigation } from "@react-navigation/native";

const Languages = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onPressLevel = (type: string, heading: string) => {
    navigation.navigate("LanguageListData", {
      type: type,
      heading: heading,
    });
  };

  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <LevelsBlock
          title={"English"}
          onPressLevel={() => {
            onPressLevel("english", "English");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"French"}
          onPressLevel={() => {
            onPressLevel("french", "French");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Spanish"}
          onPressLevel={() => {
            onPressLevel("spanish", "Spanish");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Hindi"}
          onPressLevel={() => {
            onPressLevel("hindi", "Hindi");
          }}
          bgColor={colors.pink}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Languages;
