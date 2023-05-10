import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { colors } from "../theme/Utils";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";

interface Props {
  item: any;
}

const SearchItemView: FC<Props> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{item.title?.rendered}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchItemView;
