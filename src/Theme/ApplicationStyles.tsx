import { StyleSheet } from "react-native";
import { hp } from "../helper/Constants";
import { colors } from "./Colors";
import { commonFont } from "./Fonts";

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
    tintColor: colors.white,
  },
  container2: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: hp(2),
  },
  backBtn: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  noDataText: {
    ...commonFont(500, 20, colors.darkBlue),
    textAlign: "center",
    // marginTop: hp(10),
  },
  nodataView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
