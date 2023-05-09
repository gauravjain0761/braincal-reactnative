import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import Login from "../screens/auth/Login";
import SelectLocation from "../screens/auth/SelectLocation";
import VerifyOtp from "../screens/auth/VerifyOtp";
import { colors } from "../theme/Utils";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { icons } from "../helper/IconConstant";
import OtpSuccess from "../screens/auth/OtpSuccess";

export type RootStackParamList = {
  Login: undefined;
  SelectLocation: undefined;
  VerifyOtp: undefined;
  OtpSuccess: undefined;
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
          cardStyleInterpolator,
        }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name={"SelectLocation"}
          component={SelectLocation}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name={"Login"}
          component={Login}
        />
        <RootStack.Screen
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={ApplicationStyles.headerLeftView}
              >
                <View style={ApplicationStyles.backCircleImage}>
                  <Image
                    source={icons.backArrow}
                    style={{
                      height: 18,
                      width: 18,
                      resizeMode: "contain",
                    }}
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
          options={{ headerShown: false }}
          name={"OtpSuccess"}
          component={OtpSuccess}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
