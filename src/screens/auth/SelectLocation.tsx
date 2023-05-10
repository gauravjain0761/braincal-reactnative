import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UniversalProps } from "../../helper/NavigationTypes";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import { hp } from "../../helper/Constants";
import { icons } from "../../helper/IconConstant";
import { commonFont } from "../../theme/Fonts";
import { colors } from "../../theme/Utils";
import { Dropdown } from "react-native-element-dropdown";
import CommonButton from "../../components/CommonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "../../helper/Global";
import { setUserInfo } from "../../actions";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const SelectLocation = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const preLoader = useAppSelector((e) => e.common.preLoader);
  const navigation = useNavigation();
  const [locationValue, setLocationValue] = useState("");

  const getScreen = async () => {
    dispatch({ type: "PRE_LOADER", payload: false });
    const token = await AsyncStorage.getItem("@token");

    if (token) {
      const user = await getUserInfo();
      dispatch(setUserInfo(user));
      setIsLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Dashboard" }],
        })
      );
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getScreen();
  }, []);

  const onPressSubmit = () => {
    navigation.navigate("Login");
  };
  if (preLoader == false) {
    return (
      <View style={ApplicationStyles.container}>
        {isLoading ? (
          <View style={styles.centerConatiner}>
            <ActivityIndicator size={"large"} color={colors.darkBlue} />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <Image
              source={icons.locationAnimation}
              style={styles.locationAnimationImage}
            />
            <Text style={styles.titleText}>Choose Your Location</Text>
            <Dropdown
              value={locationValue}
              onChange={(item) => {
                setLocationValue(item.value);
              }}
              style={[styles.dropdown]}
              placeholderStyle={{ ...commonFont(500, 15, colors.darkBlue) }}
              labelField="label"
              valueField="value"
              data={data}
              searchPlaceholder="Select Location"
              placeholder="Select Location"
              maxHeight={200}
              itemTextStyle={{ ...commonFont(500, 15, colors.darkBlue) }}
              selectedTextStyle={{ ...commonFont(500, 15, colors.darkBlue) }}
            />
            <View style={{ width: "100%" }}>
              <CommonButton onPress={() => onPressSubmit()} title={"Submit"} />
            </View>
          </View>
        )}
      </View>
    );
  } else {
    <View></View>;
  }
};

export default SelectLocation;

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: hp(3),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  locationAnimationImage: {
    height: hp(25),
    resizeMode: "contain",
  },
  titleText: {
    ...commonFont(700, 25, colors.black),
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightSkyBlue,
    borderRadius: 10,
    height: hp(7),
    paddingHorizontal: hp(2),
    marginBottom: hp(2),
  },
  centerConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
