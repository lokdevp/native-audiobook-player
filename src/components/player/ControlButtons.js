import React from 'react';
import { TouchableOpacityIcon } from '../common';
import { iconColor } from '../styles/Colors';

const iconSize = 25;

const PlayButton = ({ play, pause, playing }) =>
  (playing ? (
    <TouchableOpacityIcon onPress={pause} name="md-pause" size={50} color={iconColor} />
  ) : (
    <TouchableOpacityIcon onPress={play} name="md-play" size={50} color={iconColor} />
  ));

const SkipButton = ({ skip }) => (
  <TouchableOpacityIcon
    onPress={() => skip(20)}
    name="md-fastforward"
    size={iconSize}
    color={iconColor}
  />
);
const RewindButton = ({ rewind }) => (
  <TouchableOpacityIcon
    onPress={() => rewind(20)}
    name="md-rewind"
    size={iconSize}
    color={iconColor}
  />
);

const NextButton = ({ next }) => (
  <TouchableOpacityIcon name="md-skip-forward" onPress={next} size={iconSize} color={iconColor} />
);
const PrevButton = ({ prev }) => (
  <TouchableOpacityIcon name="md-skip-backward" onPress={prev} size={iconSize} color={iconColor} />
);

export { PlayButton, SkipButton, RewindButton, NextButton, PrevButton };
