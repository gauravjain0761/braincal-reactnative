import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UniversalProps} from '../../helper/navigationTypes';
import {CountrySelector, Header} from '../../components';
import {wp} from '../../helper/constants';
import {colors} from '../../helper/utils';

const Login = ({navigation}: UniversalProps) => {
  const [country, setCountry] = useState('India');
  return (
    <View style={styles.container}>
      <Header title={'Login'} />
      <View style={styles.innerContainer}>
        <CountrySelector
          country={country}
          onSelectCountry={(res: any) => setCountry(res?.name)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: wp(4),
    flex: 1,
  },
});

export default Login;
