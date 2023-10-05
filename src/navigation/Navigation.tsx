import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import Login from "../screens/auth/Login";
import VerifyOtp from "../screens/auth/VerifyOtp";
import { colors } from "../theme/Colors";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import OtpSuccess from "../screens/auth/OtpSuccess";
import DrawerNavigation from "./DrawerNavigation";
import { icons } from "../helper/iconConstant";
import ReadMore from "../screens/ReadMore";
import LevelListData from "../screens/LevelListData";
import LanguageListData from "../screens/LanguageListData";
import QuizAnswer from "../screens/QuizAnswer";
import SplashScreen from "../screens/auth/SplashScreen";
import GeneralKnowledge from "../screens/GeneralKnowledge";

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  SelectLocation: undefined;
  VerifyOtp: {
    otp_session: string;
    mobileno: string;
    countryCode: string;
    nonce: string;
  };
  OtpSuccess: undefined;
  Dashboard: undefined;
  ReadMore: undefined;
  LevelListData: undefined;
  LanguageListData: undefined;
  QuizAnswer: undefined;
  Quiz: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const cardStyleInterpolator: FC<StackCardInterpolationProps> = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                //I changed this line only
                //screen.width * -0.3 // Fully unfocused
                -screen.width,
              ],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator,
        }}
      >
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name={"SplashScreen"}
          component={SplashScreen}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name={"Login"}
          component={Login}
        />
        <RootStack.Screen
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerLeftView}
              >
                <View style={ApplicationStyles.backCircleImage}>
                  <Image
                    source={icons.backArrow}
                    style={ApplicationStyles.backBtn}
                  />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: colors.white,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          })}
          name={"VerifyOtp"}
          component={VerifyOtp}
        />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name={"OtpSuccess"}
          component={OtpSuccess}
        />
        <RootStack.Screen
          name={"ReadMore"}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.skyBlue },
            headerTitleStyle: { color: colors.white },
            headerTintColor: colors.white,
          }}
          component={ReadMore}
        />
        <RootStack.Screen
          name={"LevelListData"}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.skyBlue },
            headerTitleStyle: { color: colors.white },
            headerTintColor: colors.white,
          }}
          component={LevelListData}
        />
        <RootStack.Screen
          name={"LanguageListData"}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.skyBlue },
            headerTitleStyle: { color: colors.white },
            headerTintColor: colors.white,
          }}
          component={LanguageListData}
        />
        <RootStack.Screen
          name={"QuizAnswer"}
          options={({ navigation }) => ({
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.skyBlue },
            headerTitleStyle: { color: colors.white },
            headerTintColor: colors.white,
            title: "",
            headerTitle: "",
            headerRightContainerStyle: {
              flex: 1,
            },
          })}
          component={QuizAnswer}
        />
        <RootStack.Screen
          name={"Quiz"}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: colors.skyBlue },
            headerTitleStyle: { color: colors.white },
            headerTintColor: colors.white,
            // headerTitle: "Answer",
          }}
          component={GeneralKnowledge}
        />

        <RootStack.Screen
          options={{}}
          name={"Dashboard"}
          component={DrawerNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
