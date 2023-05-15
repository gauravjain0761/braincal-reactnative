import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";

interface Props {
  value: any;
  onChangeText: any;
  label: String;
  placeholder: string;
}

const Input: FC<Props> = ({ value, onChangeText, label, placeholder }) => {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: isFocus
            ? value?.trim()?.length
              ? colors.green
              : colors.red
            : colors.whiteGrey,
        },
      ]}
    >
      <Text style={styles.textStyle}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...commonFont(500, 16, colors.primary),
    marginRight: wp(3),
  },
  row: {
    borderBottomWidth: 2,
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    ...commonFont(500, 16, colors.black),
  },
});

export default Input;
