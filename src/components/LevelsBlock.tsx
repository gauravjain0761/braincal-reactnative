import React, { FC } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/Colors";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";

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
    height: hp(13),
    justifyContent: "center",
    marginTop: hp(2),
  },

  titleText: {
    textAlign: "center",
    ...commonFont(400, 17, colors.white),
  },
});

export default LevelsBlock;
