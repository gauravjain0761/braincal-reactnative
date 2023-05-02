import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UniversalProps} from '../helper/navigationTypes';
import {Header} from '../components';
import {wp} from '../helper/constants';

const Home = ({navigation}: UniversalProps) => {
  return (
    <View style={styles.container}>
      <Header title={'Signup'} />
      <View style={styles.innerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: wp(4),
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default Home;
