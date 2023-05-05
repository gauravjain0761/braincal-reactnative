import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../Theme/Utils";
import { hp, wp } from "../../Helper/Constants";
import { commonFont } from "../../Theme/Fonts";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  value: any;
  onChangeText: any;
  label: String;
}

const Input: FC<Props> = ({ value, onChangeText, label }) => {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View
      style={{
        borderBottomWidth: 2,
        height: hp(7),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp(4),
        borderBottomColor: isFocus
          ? value?.trim()?.length
            ? colors.green
            : colors.red
          : colors.grey,
      }}
    >
      <Text
        style={{ ...commonFont(700, 18, colors.primary), marginRight: wp(3) }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ flex: 1, paddingVertical: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
