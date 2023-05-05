import React, { FC } from "react";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Home from "../Screen/Home";
import MathTricks from "../Screen/MathTricks";
import Languages from "../Screen/Languages";
import GeneralKnowledge from "../Screen/GeneralKnowledge";
import Maths from "../Screen/Maths";
import English from "../Screen/English";
import Science from "../Screen/Science";
import { useAppDispatch } from "../Redux/Hooks";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonFont } from "../Theme/Fonts";
import { hp, wp } from "../Helper/Constants";
import { colors } from "../Theme/Utils";
import { setToken } from "../Helper/AsyncStorage";
import { CommonActions } from "@react-navigation/native";
import { icons } from "../Helper/IconConstant";
import { RootStackParamList } from "./Navigation";
import { createStackNavigator } from "@react-navigation/stack";
import ReadMore from "../Screen/ReadMore";

export type RootDrawerParamList = {
  Home: undefined;
  MathTricks: undefined;
  Languages: undefined;
  GeneralKnowledge: undefined;
  Maths: undefined;
  English: undefined;
  Science: undefined;
  ReadMore: undefined;
};

let DrawerItemArray = [
  {
    label: "Home",
    image: icons.home,
    screen: "Home",
  },
  {
    label: "Math Tricks",
    image: icons.maths,
    screen: "MathTricks",
  },
  {
    label: "Languages",
    image: icons.maths,
    screen: "Languages",
  },

  {
    label: "General Knowledge",
    image: icons.gk,
    screen: "GeneralKnowledge",
  },
  {
    label: "11+Maths",
    image: icons.maths,
    screen: "Maths",
  },
  {
    label: "11+English",
    image: icons.english,
    screen: "English",
  },
  {
    label: "11+Science",
    image: icons.science,
    screen: "Science",
  },
  {
    label: "Profile",
    image: icons.profile,
    screen: "Profile",
  },

  {
    label: "Logout",
    image: icons.logout,
    screen: "Logout",
  },
];

function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    await setToken({});
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <DrawerContentScrollView
      style={{
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
      }}
      {...props}
    >
      <View style={styles.drawerMain}>
        <Text style={styles.titleDrawer}>Welcome</Text>
        {DrawerItemArray.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.label == "Logout") {
                  // dispatch({
                  //   type: "DELETE_MODAL",
                  //   payload: {
                  //     isVisible: true,
                  //     isDeleteAccount: true,
                  //     onDelete: () => {
                  //       onDelete();
                  //     },
                  //   },
                  // });
                  onLogout();
                } else {
                  props.navigation.navigate(item.screen);
                }
              }}
              style={{
                flexDirection: "row",
                marginVertical: 12,
                alignItems: "center",
              }}
            >
              <Image style={[styles.drawerItemIcon]} source={item.image} />
              <Text style={styles.labelStyle}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigation: FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerItemStyle: {
          borderRadius: 0,
          marginLeft: 0,
        },
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: { color: colors.white },
        headerTintColor: colors.white,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <Drawer.Screen name={"Home"} component={Home} /> */}
      <Drawer.Screen name={"MathTricks"} component={MathTricks} />
      <Drawer.Screen name={"Languages"} component={Languages} />
      <Drawer.Screen name={"GeneralKnowledge"} component={GeneralKnowledge} />
      <Drawer.Screen name={"Maths"} component={Maths} />
      <Drawer.Screen name={"English"} component={English} />
      <Drawer.Screen name={"Science"} component={Science} />
      <Drawer.Screen name={"ReadMore"} component={ReadMore} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  titleDrawer: {
    ...commonFont(700, hp(3), colors.black),
    marginVertical: hp(3),
  },
  labelStyle: {
    ...commonFont(500, wp(4.5), colors.black),
    marginLeft: 25,
  },
  drawerItemIcon: {
    resizeMode: "contain",
    height: hp(2.5),
    width: hp(2.5),
    tintColor: colors.grey,
  },
  logoutButton: {
    backgroundColor: colors.red,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    ...commonFont(600, 16, colors.white),
    alignSelf: "center",
    marginBottom: hp(3),
    borderRadius: 5,
  },
  drawerMain: {
    paddingHorizontal: hp(2),
    width: "100%",
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: colors.grey,
  },
});
