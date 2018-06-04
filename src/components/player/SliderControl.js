import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Slider from 'react-native-slider';
import { formattedTime } from '../../utils/Utils';
import { whiteText, sliderBgColor, sliderColor } from '../styles/Colors';

const window = Dimensions.get('window');
const songPercentage = (currentTime, duration) =>
  (duration !== undefined ? currentTime / duration : 0);

const SliderControl = ({
  currentTime, duration, slidingStart, slidingChange, slidingComplete,
}) => (
  <View style={styles.sliderContainer}>
    <Slider
      onSlidingStart={slidingStart}
      onSlidingComplete={slidingComplete}
      onValueChange={value => slidingChange(value, duration)}
      style={styles.slider}
      trackStyle={sliderStyles.track}
      thumbStyle={sliderStyles.thumb}
      minimumTrackTintColor={sliderColor}
      thumbTouchSize={{ width: 50, height: 40 }}
      value={songPercentage(currentTime, duration)}
    />

    <View style={styles.timeInfo}>
      <Text style={styles.time}>{formattedTime(currentTime)}</Text>
      <Text style={styles.timeRight}>{formattedTime(duration)}</Text>
    </View>
  </View>
);
const sliderStyles = StyleSheet.create({
  track: {
    height: 2,
    backgroundColor: sliderBgColor,
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: sliderColor,
    borderRadius: 10 / 2,
    shadowColor: sliderColor,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
});
const styles = StyleSheet.create({
  sliderContainer: {
    width: window.width - 40,
  },
  slider: {
    height: 20,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: whiteText,
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: whiteText,
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
});
export default SliderControl;
