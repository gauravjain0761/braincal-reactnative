import { StyleSheet } from "react-native";
import { hp } from "../helper/Constants";
import { colors } from "./Utils";

export const ApplicationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: hp(3),
    flex: 1,
  },
  headerLeftView: {
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
  },
  backCircleImage: {
    borderWidth: 1,
    borderColor: colors.lightSkyBlue,
    height: hp(5),
    width: hp(5),
    borderRadius: hp(5) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  favIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: "contain",
    tintColor: colors.black,
  },
});
