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

import { colors } from "../theme/Colors";
import { hp, wp } from "../helper/constants";
import { commonFont } from "../theme/Fonts";
import { icons } from "../helper/iconConstant";

interface Props {
  value: string;
  onChangeText: (params: string) => void;
  onPressClose?: () => void;
}

const SearchBar: FC<Props> = ({ value, onChangeText, onPressClose }) => {
  return (
    <View style={styles.con}>
      <View style={styles.container}>
        <Image source={icons.search} style={styles.iconStyle} />
        <TextInput
          value={value}
          style={styles.inputStyle}
          placeholder={"Search"}
          onChangeText={onChangeText}
          placeholderTextColor={colors.grey}
        />
        {value?.length ? (
          <TouchableOpacity onPress={onPressClose}>
            <Image source={icons.closeRound} style={styles.iconStyle} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    padding: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    // backgroundColor: "red",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(6),
    paddingHorizontal: wp(4.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    elevation: 9,
    // bordesrWidth: 10,
    // borderColor: colors.red,
    backgroundColor: colors.white,
    borderRadius: 10,
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
