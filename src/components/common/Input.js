import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({
  label, value, onChangeText, placeholder, secureTextEntry,
}) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      {label ? <Text style={labelStyle}>{label}</Text> : null}
      <TextInput
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        onChangeText={onChangeText}
        value={value}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
    </View>
  );
};
const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  labelStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
  },
  inputStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 2,
    fontSize: 18,
    color: '#000',
  },
};

export { Input };
