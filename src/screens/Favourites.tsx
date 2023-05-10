import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppSelector } from "../redux/Hooks";

const Favourites = ({ navigation }: UniversalProps) => {
  const favouritesId = useAppSelector((e) => e.common.favouritesId);
  console.log(favouritesId);
  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Favourites;
