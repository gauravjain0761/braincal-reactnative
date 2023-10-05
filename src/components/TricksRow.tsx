import React, { FC, useEffect, useState } from "react";
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
import {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  SET_READ_MORE_DATA,
} from "../actions/types";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { icons } from "../helper/iconConstant";
import { commonFont } from "../theme/Fonts";
import { hp, wp } from "../helper/constants";
import { colors } from "../theme/Colors";
import {
  dispatchErrorAction,
  getToken,
  setUserInfoAsync,
} from "../helper/global";
import { setUserInfo, updateUser } from "../actions";

interface Props {
  data?: any;
  index?: any;
}

const TricksRow: FC<Props> = ({ data, index }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onPressRow = () => {
    dispatch({ type: SET_READ_MORE_DATA, payload: data });
    navigation.navigate("ReadMore");
  };
  const favouritesId = useAppSelector((e) => e.common.favouritesId);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (index % 2 == 0) setBgColor(colors.skyBlue1);
    else setBgColor(colors.pink);
  }, []);

  const onPressFavourite = () => {
    if (favouritesId.indexOf(data.id) == -1) {
      addFavourite();
    } else {
      removeFavourite();
    }
  };

  const addFavourite = async () => {
    dispatch({ type: ADD_FAVOURITE, payload: data.id });
    let ids = Object.assign([], favouritesId);
    ids.push(data.id);
    const cookie = await getToken();
    let dataTemp = {
      cookie: cookie,
      meta_key: "favorites", //favorites
      meta_value: ids.map(Number).toString(), //favorites.map(Number).toString()
    };
    let request = {
      data: dataTemp,
      onSuccess: (res: any) => {
        if (res?.status === "ok") {
          dispatch(setUserInfo(res?.user));
          setUserInfoAsync(res?.user);
        } else {
          dispatchErrorAction(dispatch, res?.error);
        }
      },
      onFail: () => {},
    };
    dispatch(updateUser(request));
  };

  const removeFavourite = async () => {
    dispatch({ type: REMOVE_FAVOURITE, payload: data.id });
    let ids = Object.assign([], favouritesId);
    ids = ids.filter((e) => e !== data.id);
    const cookie = await getToken();
    let dataTemp = {
      cookie: cookie,
      meta_key: "favorites", //favorites
      meta_value: ids.map(Number).toString(), //favorites.map(Number).toString()
    };
    let request = {
      data: dataTemp,
      onSuccess: (res: any) => {
        if (res?.status === "ok") {
          dispatch(setUserInfo(res?.user));
          setUserInfoAsync(res?.user);
        } else {
          dispatchErrorAction(dispatch, res?.error);
        }
      },
      onFail: () => {},
    };
    dispatch(updateUser(request));
  };

  return (
    <View style={[styles.row, { backgroundColor: bgColor }]}>
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
            ...commonFont(500, 20, colors.white),
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
    // borderBottomWidth: 1,
    // borderBottomColor: colors.whiteGrey,
  },
  favouriteView: {
    paddingTop: hp(2),
    alignSelf: "flex-end",
    paddingHorizontal: hp(2),
  },
  readMoreText: {
    ...commonFont(400, 16, colors.white),
    textAlign: "center",
    paddingVertical: hp(2),
  },
});

export default TricksRow;
