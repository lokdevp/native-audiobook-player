import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor, iconColor } from '../styles/Colors';

export default class About extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.githubLink}>
          <Text
            style={{ fontSize: 25 }}
            onPress={() => Linking.openURL('https://github.com/lokdevp/native-audiobook-player')}
          >
            <Icon name="logo-github" size={30} color={iconColor} /> github
          </Text>
        </View>
        <Text>This app is still in development</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '10%',
  },
  githubLink: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
});
