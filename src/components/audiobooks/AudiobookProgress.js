import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { formattedTime } from '../../utils/Utils';
import { whiteText, AudiobookProgressBgColor, primaryColor } from '../styles/Colors';

const AudiobookProgress = ({ totalProgressTime, duration, progressPercent }) => (
  <View>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
      <Text style={styles.text}>{formattedTime(totalProgressTime)}</Text>
      <Text style={styles.text}>{formattedTime(duration)}</Text>
    </View>
    <View style={styles.outerView}>
      <View style={[styles.innerView, { width: `${Math.ceil(progressPercent)}%` }]} />
    </View>
  </View>
);
const styles = StyleSheet.create({
  text: {
    color: whiteText,
    fontSize: 13,
  },
  outerView: {
    width: '100%',
    height: 5,
    backgroundColor: AudiobookProgressBgColor,
    marginTop: 2,
  },
  innerView: {
    height: 5,
    backgroundColor: primaryColor,
  },
});
export default AudiobookProgress;
