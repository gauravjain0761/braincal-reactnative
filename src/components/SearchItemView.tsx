import React, { FC, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { colors } from "../theme/Colors";
import { hp, wp } from "../helper/Constants";
import { commonFont } from "../theme/Fonts";
import { SET_READ_MORE_DATA } from "../actions/types";
import { useAppDispatch } from "../redux/Hooks";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../helper/IconConstant";
import RenderHTML from "react-native-render-html";

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
      <View style={{ flex: 1 }}>
        <RenderHTML
          contentWidth={Dimensions.get("window").width - hp(4)}
          tagsStyles={{
            p: {
              ...commonFont(500, wp(4), colors.white),
              margin: 0,
              paddingHorizontal: hp(1),
            },
          }}
          source={{
            html: `
      <p>
        ${item.title?.rendered}
      </p>`,
          }}
        />
      </View>

      {/* <Text style={styles.textStyle}>{item.title?.rendered}</Text> */}
      <Image style={styles.iconStyle} source={icons.next} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4.5),
    backgroundColor: colors.searchBackground,
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
