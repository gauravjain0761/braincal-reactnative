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
  TextInput,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { UniversalProps } from "../helper/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/Constants";
import { colors } from "../theme/Utils";
import { icons } from "../helper/IconConstant";

const ReadMore = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const READ_MORE_DATA = useAppSelector((e) => e.common.reactMoreData);
  const [firstNumber, setfirstNumber] = useState("");
  const [secondNumber, setsecondNumber] = useState("");
  const [Answer, setAnswer] = useState("");
  const [AnswerShow, setAnswerShow] = useState(false);

  const onPressShowResult = () => {
    if (firstNumber == "" || secondNumber == "") {
      Alert.alert("Invalid Input");
      setAnswer("");
    } else {
      setAnswer(eval(firstNumber + READ_MORE_DATA.expression + secondNumber));
    }
  };

  return (
    <View style={ApplicationStyles.container}>
      <ScrollView>
        <View style={styles.titleView}>
          <View style={{ flex: 1 }}>
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
          </View>

          <TouchableOpacity style={styles.favouriteView}>
            <Image
              source={icons.favourite}
              style={[ApplicationStyles.favIcon, { tintColor: colors.white }]}
            />
          </TouchableOpacity>
        </View>
        {READ_MORE_DATA.type &&
          READ_MORE_DATA.type == "11_plus" &&
          READ_MORE_DATA.answer &&
          READ_MORE_DATA.answer !== "" && (
            <View>
              {AnswerShow == false ? (
                <TouchableOpacity
                  onPress={() => setAnswerShow(true)}
                  style={styles.showAnswerView}
                >
                  <Text style={styles.showAnswer}>Show Answer</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.answerText}>
                  Correct Answer is: {READ_MORE_DATA.answer}
                </Text>
              )}
            </View>
          )}

        {READ_MORE_DATA.cover_image && READ_MORE_DATA.cover_image !== "" && (
          <View>
            <Image
              source={{ uri: READ_MORE_DATA.cover_image }}
              style={styles.coverImage}
            />
          </View>
        )}
        <View style={{ paddingHorizontal: hp(2) }}>
          <RenderHTML
            tagsStyles={{
              p: {
                color: colors.black,
              },
              div: {},
            }}
            source={{
              html: READ_MORE_DATA.content.rendered,
            }}
          />
        </View>

        {READ_MORE_DATA.expression && READ_MORE_DATA.expression !== "" && (
          <View style={{ marginBottom: hp(5) }}>
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
  showAnswerView: {
    marginHorizontal: hp(2),

    alignItems: "flex-start",
  },
  showAnswer: {
    ...commonFont(400, 16, colors.black),
    paddingVertical: hp(2),
  },
  answerText: {
    ...commonFont(600, 20, colors.black),
    margin: hp(2),
  },
});

export default ReadMore;