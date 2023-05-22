import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { UniversalProps } from "../../navigation/NavigationTypes";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import { useAppDispatch } from "../../redux/Hooks";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { setUserInfo } from "../../actions";
import { getUserInfo } from "../../helper/Global";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onNavigate = (screen: any) => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: screen }],
        })
      );
    }, 3000);
  };

  const getScreen = async () => {
    const token = await AsyncStorage.getItem("@token");
    if (token) {
      const user = await getUserInfo();
      dispatch(setUserInfo(user));
      onNavigate("Dashboard");
    } else {
      onNavigate("Login");
    }
  };

  useEffect(() => {
    getScreen();
  }, []);

  return (
    <View style={ApplicationStyles.container}>
      <Image
        source={require("../../assets/splash.jpeg")}
        style={{ resizeMode: "cover", height: "100%", width: "100%" }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
