import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../Helper/NavigationTypes";
import { Header } from "../Components";
import { hp, wp } from "../Helper/Constants";
import { ApplicationStyles } from "../Theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { getTricks } from "../APIServices/ApiServices";
import TricksRow from "../Components/Common/TricksRow";
import RenderHTML from "react-native-render-html";
import { commonFont } from "../Theme/Fonts";
import { colors } from "../Theme/Utils";
import { icons } from "../Helper/IconConstant";
import { TextInput } from "react-native-gesture-handler";

const ReadMore = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const READ_MORE_DATA = useAppSelector((e) => e.common.reactMoreData);
  const [firstNumber, setfirstNumber] = useState("");
  const [secondNumber, setsecondNumber] = useState("");
  const [Answer, setAnswer] = useState("");
  console.log(READ_MORE_DATA);

  const onPressShowResult = () => {
    if (firstNumber == "" || secondNumber == "") {
      Alert.alert("Invalid Input");
      setAnswer("");
    } else {
      setAnswer(eval(firstNumber + READ_MORE_DATA.expression + secondNumber));
    }
    console.log("hereee");
  };

  return (
    <View style={ApplicationStyles.container}>
      <ScrollView>
        <View style={styles.titleView}>
          <RenderHTML
            tagsStyles={{
              p: {
                ...commonFont(500, 20, colors.white),
                paddingLeft: hp(1),
              },
            }}
            source={{
              html: `
      <p>
        ${READ_MORE_DATA.title.rendered}
      </p>`,
            }}
          />
          <TouchableOpacity style={styles.favouriteView}>
            <Image
              source={icons.favourite}
              style={[ApplicationStyles.favIcon, { tintColor: colors.white }]}
            />
          </TouchableOpacity>
        </View>

        {READ_MORE_DATA.cover_image && READ_MORE_DATA.cover_image !== "" && (
          <View>
            <Image
              source={{ uri: READ_MORE_DATA.cover_image }}
              style={styles.coverImage}
            />
          </View>
        )}

        <RenderHTML
          tagsStyles={{
            p: {
              color: colors.black,
              paddingHorizontal: hp(2),
            },
          }}
          source={{
            html: READ_MORE_DATA.content.rendered,
          }}
        />

        {READ_MORE_DATA.expression && READ_MORE_DATA.expression !== "" && (
          <View>
            <Text style={styles.titleText}>Excersie Here</Text>
            <TextInput
              value={firstNumber}
              onChangeText={(text) => setfirstNumber(text)}
              keyboardType="numeric"
              placeholder="First Number"
              placeholderTextColor={colors.grey}
              style={styles.textIput}
            />
            <Text style={styles.titleText}>{READ_MORE_DATA.expression}</Text>
            <TextInput
              value={secondNumber}
              onChangeText={(text) => setsecondNumber(text)}
              keyboardType="numeric"
              placeholder="Second Number"
              placeholderTextColor={colors.grey}
              style={styles.textIput}
            />
            <TouchableOpacity
              onPress={() => onPressShowResult()}
              style={styles.showResultView}
            >
              <Text style={styles.showResult}>Show Result</Text>
            </TouchableOpacity>
            {Answer !== "" && (
              <Text style={styles.titleText}>Answer: {Answer}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
    marginHorizontal: hp(2),
  },
  favouriteView: {
    paddingHorizontal: hp(1),
  },
  coverImage: {
    height: hp(25),
    resizeMode: "contain",
    marginHorizontal: hp(2),
    marginTop: hp(1),
  },
  titleText: {
    ...commonFont(600, 20, colors.black),
    marginHorizontal: hp(2),
  },
  textIput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginHorizontal: hp(2),
    height: hp(6),
    marginBottom: hp(2),
    ...commonFont(400, 16, colors.black),
  },
  showResult: {
    ...commonFont(400, 16, colors.white),
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
  },
  showResultView: {
    marginHorizontal: hp(2),

    alignItems: "flex-start",
  },
});

export default ReadMore;
