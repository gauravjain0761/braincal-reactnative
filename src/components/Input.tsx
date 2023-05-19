import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";

interface Props {
  value: any;
  onChangeText: any;
  label: String;
  placeholder: string;
  maxLength?: number;
  keyboardType?: any;
}

const Input: FC<Props> = ({
  value,
  onChangeText,
  label,
  placeholder,
  maxLength,
  keyboardType,
}) => {
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
        maxLength={maxLength}
        keyboardType={keyboardType ? keyboardType : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...commonFont(500, 16, colors.skyBlue1),
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
