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
import { colors } from "../../Theme/Utils";
import { hp, wp } from "../../Helper/Constants";
import { commonFont } from "../../Theme/Fonts";
import { icons } from "../../Helper/IconConstant";
import { ApplicationStyles } from "../../Theme/ApplicationStyles";
import RenderHtml from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../Redux/Hooks";
import { dispatchAction } from "../../APIServices/CommonFunction";

interface Props {
  data?: any;
}

const TricksRow: FC<Props> = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onPressRow = () => {
    dispatchAction(dispatch, "SET_READ_MORE_DATA", data);
    navigation.navigate("ReadMore");
  };
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.favouriteView}>
        <Image source={icons.favourite} style={ApplicationStyles.favIcon} />
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
