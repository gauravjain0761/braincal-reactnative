import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/Constants";
import { colors } from "../theme/Utils";
import { icons } from "../helper/IconConstant";

interface props {
  onSelectCountry: any;
  country: String;
}

const CountrySelector: FC<props> = ({ onSelectCountry, country }) => {
  const [isCountryModal, setIsCountryModal] = useState(true);
  const [code, setcode] = useState("IN");

  return (
    <TouchableOpacity
      onPress={() => setIsCountryModal(true)}
      style={styles.container}
    >
      <CountryPicker
        countryCode={code}
        withFilter
        visible={isCountryModal}
        onClose={() => setIsCountryModal(false)}
        onSelect={(res) => {
          onSelectCountry(res);
          setIsCountryModal(false);
          setcode(res.cca2);
        }}
        withFlag={true}
        withFlagButton={true}
        withCallingCode={true}
        withCallingCodeButton={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(6),
    backgroundColor: colors.whiteGrey,
    marginVertical: hp(2),
    justifyContent: "center",
    width: "60%",
  },
  countryNameTextStyle: {
    textAlign: "center",
    ...commonFont(400, 20, colors.black),
  },
  iconStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: colors.grey,
    position: "absolute",
    right: hp(2),
  },
});

export default CountrySelector;
