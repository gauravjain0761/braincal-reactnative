import { StyleSheet } from "react-native";
import { colors } from "./Utils";
import { hp } from "../Helper/Constants";

export const ApplicationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: hp(2),
    flex: 1,
  },
  favIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: "contain",
    tintColor: colors.black,
  },
});