import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { primaryColor, blackText } from '../styles/Colors';

const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
    <Text style={styles.textStyle}>{children}</Text>
  </TouchableOpacity>
);
const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: blackText,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};
export { Button };
