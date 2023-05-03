import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { hp, wp } from "../../Helper/Constants";
import { colors } from "../../Theme/Utils";
import { icons } from "../../Helper/IconConstant";
import CountryPicker from "react-native-country-picker-modal";
import { commonFont } from "../../Theme/Fonts";

interface props {
  onSelectCountry: any;
  country: String;
}

const CountrySelector: FC<props> = ({ onSelectCountry, country }) => {
  const [isCountryModal, setIsCountryModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsCountryModal(true)}
      style={styles.container}
    >
      <Text style={styles.countryNameTextStyle}>{country}</Text>
      <Image
        resizeMode="contain"
        source={icons.down}
        style={styles.iconStyle}
      />
      {isCountryModal && (
        <CountryPicker
          countryCode={"IN"}
          withFilter
          visible={isCountryModal}
          onClose={() => setIsCountryModal(false)}
          onSelect={(res) => {
            onSelectCountry(res);
            setIsCountryModal(false);
          }}
        />
      )}
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
