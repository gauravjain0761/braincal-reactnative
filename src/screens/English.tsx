import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";

const English = ({ navigation }: UniversalProps) => {
  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default English;
