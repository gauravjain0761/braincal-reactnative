import React, {FC} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../helper/utils';
import {wp} from '../../helper/constants';

interface Props {
  title?: String;
}

const Header: FC<Props> = ({title}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  innerContainer: {
    padding: wp(4),
  },
  titleText: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
