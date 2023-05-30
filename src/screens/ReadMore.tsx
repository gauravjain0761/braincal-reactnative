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
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { UniversalProps } from "../navigation/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/Constants";
import { colors } from "../theme/Colors";
import { icons } from "../helper/IconConstant";
import {
  dispatchErrorAction,
  getToken,
  setUserInfoAsync,
} from "../helper/Global";
import { setUserInfo, updateUser } from "../actions";
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "../actions/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ReadMore = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const READ_MORE_DATA = useAppSelector((e) => e.common.reactMoreData);
  const [firstNumber, setfirstNumber] = useState("");
  const [secondNumber, setsecondNumber] = useState("");
  const [Answer, setAnswer] = useState("");
  const [AnswerShow, setAnswerShow] = useState(false);
  const favouritesId = useAppSelector((e) => e.common.favouritesId);
  const { width } = useWindowDimensions();
  console.log("READ_MORE_DATA---------", READ_MORE_DATA.content.rendered);
  useEffect(() => {
    // navigation.setOptions({
    //   headerTitle: () => (
    //     <View>
    //       <RenderHTML
    //         tagsStyles={{
    //           strong: {
    //             ...commonFont(500, 20, colors.white),
    //             // paddingLeft: hp(1),
    //             margin: 0,
    //             padding: 0,
    //             // width: 250,
    //             backgroundColor: "red",
    //           },
    //         }}
    //         source={{
    //           html: `
    //   <strong'>
    //     ${READ_MORE_DATA.title.rendered}
    //   </strong><strong>
    //     ....
    //   </strong>`,
    //         }}
    //       />
    //     </View>
    //   ),
    // });
    navigation.setOptions({
      headerTitle: "Read More",
    });
  }, []);

  const onPressFavourite = () => {
    if (favouritesId.indexOf(READ_MORE_DATA.id) == -1) {
      addFavourite();
    } else {
      removeFavourite();
    }
  };

  const addFavourite = async () => {
    dispatch({ type: ADD_FAVOURITE, payload: READ_MORE_DATA.id });
    let ids = Object.assign([], favouritesId);
    ids.push(READ_MORE_DATA.id);
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
    dispatch({ type: REMOVE_FAVOURITE, payload: READ_MORE_DATA.id });
    let ids = Object.assign([], favouritesId);
    ids = ids.filter((e) => e !== READ_MORE_DATA.id);
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
  const onPressShowResult = () => {
    if (firstNumber == "" || secondNumber == "") {
      Alert.alert("Invalid Input");
      setAnswer("");
    } else {
      setAnswer(eval(firstNumber + READ_MORE_DATA.expression + secondNumber));
    }
  };
  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };
  return (
    <View style={ApplicationStyles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.titleView}>
          <View style={{ flex: 1 }}>
            <RenderHTML
              tagsStyles={{
                p: {
                  ...commonFont(500, 18, colors.white),
                  paddingLeft: hp(1),
                  margin: 0,
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

          <TouchableOpacity
            onPress={() => onPressFavourite()}
            style={styles.favouriteView}
          >
            <Image
              source={
                favouritesId.indexOf(READ_MORE_DATA.id) == -1
                  ? icons.favourite
                  : icons.favouriteFilled
              }
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
                <Text style={styles.answerText1}>
                  Correct Answer is:{" "}
                  <Text style={styles.answerText}>{READ_MORE_DATA.answer}</Text>
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
            contentWidth={width}
            tagsStyles={{
              p: {
                color: colors.black,
                marginVertical: hp(1),
              },
              h3: {
                color: colors.black,
              },
              strong: { color: colors.black },
              div: {},
              td: { color: colors.black },
              i: { color: colors.black },
              li: { color: colors.black },
              img: {
                width: width - hp(2),
                resizeMode: "contain",
              },
              figure: {
                maxWidth: width - hp(4),
                margin: 0,
                padding: 0,
              },
              figcaption: { color: colors.black },
            }}
            source={{
              html: READ_MORE_DATA.content.rendered,
            }}
            renderersProps={renderersProps}
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
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    backgroundColor: colors.skyBlue1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
    marginHorizontal: hp(2),
    paddingVertical: hp(1),
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
    ...commonFont(600, 17, colors.black),
    margin: hp(2),
  },
  answerText1: {
    ...commonFont(400, 17, colors.black),
    margin: hp(2),
  },
});

export default ReadMore;
