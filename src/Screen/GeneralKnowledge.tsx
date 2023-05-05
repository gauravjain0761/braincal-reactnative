import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../Helper/NavigationTypes";
import { Header } from "../Components";
import { hp, wp } from "../Helper/Constants";
import { ApplicationStyles } from "../Theme/ApplicationStyles";

const GeneralKnowledge = ({ navigation }: UniversalProps) => {
  return (
    <View style={ApplicationStyles.container}>
      <Header title={"GeneralKnowledge"} />
      <View style={ApplicationStyles.innerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GeneralKnowledge;
