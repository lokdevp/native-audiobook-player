import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

export const TouchableOpacityIcon = ({
  onPress, name, size, color,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name={name} size={size} color={color} />
  </TouchableOpacity>
);
