import React, {FC, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {hp, wp} from '../../helper/constants';
import {colors} from '../../helper/utils';
import {icons} from '../../helper/iconConstant';
import CountryPicker from 'react-native-country-picker-modal';

interface props {
  onSelectCountry: any;
  country: String;
}

const CountrySelector: FC<props> = ({onSelectCountry, country}) => {
  const [isCountryModal, setIsCountryModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsCountryModal(true)}
      style={styles.container}>
      <Text style={styles.countryNameTextStyle}>{country}</Text>
      <Image
        resizeMode="contain"
        source={icons.down}
        style={styles.iconStyle}
      />
      {isCountryModal && (
        <CountryPicker
          countryCode={'IN'}
          withFilter
          visible={isCountryModal}
          onClose={() => setIsCountryModal(false)}
          onSelect={res => {
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
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(6),
    backgroundColor: colors.whiteGrey,
    marginVertical: hp(2),
    justifyContent: 'center',
  },
  countryNameTextStyle: {
    fontSize: wp(4.5),
    color: colors.black,
    textAlign: 'center',
  },
  iconStyle: {
    height: wp(4),
    width: wp(4),
    tintColor: colors.grey,
    position: 'absolute',
    right: wp(4),
  },
});

export default CountrySelector;
