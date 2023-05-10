import React, { FC } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import RenderHtml from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { SET_READ_MORE_DATA } from "../actions/types";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { icons } from "../helper/IconConstant";
import { commonFont } from "../theme/Fonts";
import { hp, wp } from "../helper/Constants";
import { colors } from "../theme/Utils";

interface Props {
  data?: any;
}

const TricksRow: FC<Props> = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onPressRow = () => {
    dispatch({ type: SET_READ_MORE_DATA, payload: data });
    navigation.navigate("ReadMore");
  };
  const favouritesId = useAppSelector((e) => e.common.favouritesId);
  console.log("favouritesId", favouritesId);

  const onPressFavourite = () => {
    if (favouritesId.indexOf(data.id) == -1) {
      addFavourite();
    } else {
      removeFavourite();
    }
  };

  const addFavourite = () => {};

  const removeFavourite = () => {};

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => onPressFavourite()}
        style={styles.favouriteView}
      >
        <Image
          source={
            favouritesId.indexOf(data.id) == -1
              ? icons.favourite
              : icons.favouriteFilled
          }
          style={ApplicationStyles.favIcon}
        />
      </TouchableOpacity>
      <RenderHtml
        contentWidth={Dimensions.get("window").width - hp(4)}
        tagsStyles={{
          p: {
            ...commonFont(500, 20, colors.black),
            paddingHorizontal: hp(2),
          },
        }}
        source={{
          html: `
      <p style='text-align:center;'>
        ${data.title.rendered}
      </p>`,
        }}
      />
      <TouchableOpacity onPress={() => onPressRow()}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  innerContainer: {
    padding: wp(4),
  },
  titleText: {
    textAlign: "center",
    ...commonFont(500, 20, colors.black),
    paddingHorizontal: hp(2),
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteGrey,
  },
  favouriteView: {
    paddingTop: hp(2),
    alignSelf: "flex-end",
    paddingHorizontal: hp(2),
  },
  readMoreText: {
    ...commonFont(400, 16, colors.black),
    textAlign: "center",
    paddingVertical: hp(2),
  },
});

export default TricksRow;
