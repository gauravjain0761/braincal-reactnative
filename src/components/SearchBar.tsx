import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";
import { icons } from "../helper/IconConstant";

interface Props {
  value: string;
  onChangeText: (params: string) => void;
  onPressClose?: () => void;
}

const SearchBar: FC<Props> = ({ value, onChangeText, onPressClose }) => {
  return (
    <View style={styles.container}>
      <Image source={icons.search} style={styles.iconStyle} />
      <TextInput
        value={value}
        style={styles.inputStyle}
        placeholder={"Search"}
        onChangeText={onChangeText}
      />
      {value?.length ? (
        <TouchableOpacity onPress={onPressClose}>
          <Image source={icons.closeRound} style={styles.iconStyle} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(6.5),
    paddingHorizontal: wp(4.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteGrey,
  },
  iconStyle: {
    height: wp(5),
    width: wp(5),
    tintColor: colors.grey,
  },
  inputStyle: {
    marginHorizontal: wp(4),
    ...commonFont(400, wp(4), colors.black),
    paddingVertical: 0,
    flex: 1,
    height: hp(6),
  },
});

export default SearchBar;
