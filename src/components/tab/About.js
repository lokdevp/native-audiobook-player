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
        <Text style={{ marginTop: 50, lineHeight: 19 }}>
          The app-icon was made by modifying{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://www.flaticon.com/authors/roundicons')}
          >
            roundicons
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.freepik.com/')}>
            freepik
          </Text>{' '}
          from{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.flaticon.com/')}>
            flaticon
          </Text>
          , rest of the icons are{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://ionicframework.com/docs/ionicons/')}
          >
            Ionicons
          </Text>.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: '8%',
  },
  githubLink: {
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  link: {
    color: primaryColor,
  },
});
