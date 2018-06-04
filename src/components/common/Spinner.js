import { StyleSheet, View } from 'react-native';
import React from 'react';
import { BarIndicator } from 'react-native-indicators';
import { primaryColor } from '../styles/Colors';

const Spinner = () => (
  <View style={styles.activityIndicatorWrapper}>
    <BarIndicator color={primaryColor} count={5} />
  </View>
);

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
});

export { Spinner };
