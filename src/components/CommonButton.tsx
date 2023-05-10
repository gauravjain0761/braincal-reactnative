import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { UniversalProps } from "../helper/NavigationTypes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../theme/Utils";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/Constants";
interface Props {
  title?: String;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
}
const CommonButton: FC<Props> = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[styles.buttonView, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: { ...commonFont(600, 17, colors.white) },
});
