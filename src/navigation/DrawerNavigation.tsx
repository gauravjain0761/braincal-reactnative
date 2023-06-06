import React, { FC, useEffect } from "react";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Home from "../screens/Home";
import MathTricks from "../screens/MathTricks";
import Languages from "../screens/Languages";
import GeneralKnowledge from "../screens/GeneralKnowledge";
import Maths from "../screens/Maths";
import English from "../screens/English";
import Science from "../screens/Science";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonFont } from "../theme/Fonts";
import { hp, wp } from "../helper/Constants";
import { colors } from "../theme/Colors";
import { setToken } from "../helper/AsyncStorage";
import { CommonActions } from "@react-navigation/native";
import { icons } from "../helper/IconConstant";
import Feedback from "../screens/Feedback";
import { clearAsync } from "../helper/Global";
import Profile from "../screens/Profile";
import Favourites from "../screens/Favourites";
import { LOGOUT } from "../actions/types";

export type RootDrawerParamList = {
  Home: undefined;
  MathTricks: undefined;
  Languages: undefined;
  GeneralKnowledge: undefined;
  Maths: undefined;
  English: undefined;
  Science: undefined;
  ReadMore: undefined;
  Feedback: undefined;
  Profile: undefined;
  Favourites: undefined;
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
    label: "Favourites",
    image: icons.favouriteFilled,
    screen: "Favourites",
  },
  {
    label: "Feedback",
    image: icons.profile,
    screen: "Feedback",
  },
  {
    label: "Logout",
    image: icons.logout,
    screen: "Logout",
  },
];

function CustomDrawerContent(props: any) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.common);
  const _TOAST = useAppSelector((e) => e.common.toast);

  const onLogout = async () => {
    clearAsync();
    dispatch({ type: LOGOUT, payload: {} });
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Login" }],
      })
    );
  };

  useEffect(() => {
    if (
      _TOAST.message == "Seems your session is expired. Please login again."
    ) {
      onLogout();
    }
  }, [_TOAST]);

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
        <Text style={styles.nameTextStyle}>
          {user?.firstname + " " + user?.lastname}
        </Text>
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
              <Image
                resizeMode="contain"
                style={[styles.drawerItemIcon]}
                source={item.image}
              />
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
        headerShown: true,
        drawerItemStyle: {
          borderRadius: 0,
          marginLeft: 0,
        },
        drawerStyle: { width: "70%" },
        headerStyle: { backgroundColor: colors.skyBlue },
        headerTitleStyle: { color: colors.white },
        headerTintColor: colors.white,
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={"Home"} component={Home} />
      <Drawer.Screen
        options={{ headerTitle: "Math Tricks" }}
        name={"MathTricks"}
        component={MathTricks}
      />
      <Drawer.Screen name={"Languages"} component={Languages} />
      <Drawer.Screen
        options={{
          headerTitle: "General Knowledge",
          // headerLeft: () => <View></View>,
        }}
        name={"GeneralKnowledge"}
        component={GeneralKnowledge}
      />
      <Drawer.Screen
        options={{ headerTitle: "11 Plus Maths" }}
        name={"Maths"}
        component={Maths}
      />
      <Drawer.Screen
        options={{ headerTitle: "11 Plus English" }}
        name={"English"}
        component={English}
      />
      <Drawer.Screen
        options={{ headerTitle: "11 Plus Science" }}
        name={"Science"}
        component={Science}
      />
      <Drawer.Screen
        options={{ headerTitle: "Edit Profile" }}
        name={"Profile"}
        component={Profile}
      />
      <Drawer.Screen name={"Favourites"} component={Favourites} />
      <Drawer.Screen name={"Feedback"} component={Feedback} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  titleDrawer: {
    ...commonFont(700, hp(3), colors.black),
    marginTop: hp(3),
  },
  nameTextStyle: {
    ...commonFont(500, wp(4), colors.black),
    marginBottom: hp(3),
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
