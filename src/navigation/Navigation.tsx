import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screen/Home";
import Login from "../Screen/Auth/Login";
import {
  StackCardInterpolationProps,
  TransitionSpecs,
  createStackNavigator,
} from "@react-navigation/stack";
import { Animated } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
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
          headerShown: false, //Optional
          cardStyleInterpolator,

          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid, //
        }}
      >
        <RootStack.Screen name={"Login"} component={Login} />
        <RootStack.Screen
          options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
          }}
          name={"Home"}
          component={Home}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
