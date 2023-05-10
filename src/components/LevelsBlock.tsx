import React, { FC } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";

interface Props {
  title?: String;
  bgColor?: any;
  onPressLevel: (() => void) | undefined;
}

const LevelsBlock: FC<Props> = ({ title, bgColor, onPressLevel }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressLevel()}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(10),
    justifyContent: "center",
    marginTop: hp(2),
  },

  titleText: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: "600",
    textAlign: "center",
  },
});

export default LevelsBlock;
