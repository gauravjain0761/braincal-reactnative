import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";
import { SET_READ_MORE_DATA } from "../actions/types";
import { useAppDispatch } from "../redux/Hooks";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../helper/IconConstant";

interface Props {
  item: any;
}

const SearchItemView: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const onPressItem = () => {
    dispatch({ type: SET_READ_MORE_DATA, payload: item });
    navigate("ReadMore");
  };

  return (
    <TouchableOpacity onPress={onPressItem} style={styles.container}>
      <Text style={styles.textStyle}>{item.title?.rendered}</Text>
      <Image style={styles.iconStyle} source={icons.next} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4.5),
    backgroundColor: colors.primary,
  },
  textStyle: {
    ...commonFont(500, wp(4), colors.white),
    flex: 1,
  },
  iconStyle: {
    height: wp(5),
    width: wp(5),
    tintColor: colors.white,
  },
});

export default SearchItemView;
