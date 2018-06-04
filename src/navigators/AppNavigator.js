import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import AudiobookList from '../components/audiobooks/AudiobookList';
import Player from '../components/player/Player';
import TabStack from './TabStack';

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: AudiobookList,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Native',
        headerLeft: (
          <Icon
            onPress={() => navigation.navigate('Menu')}
            name="md-menu"
            size={25}
            color="#fff"
            style={{ marginLeft: 15 }}
          />
        ),
      }),
    },
    Player: {
      screen: Player,
      navigationOptions: ({ navigation }) => {
        const { params } = navigation.state;
        return {
          title: params ? params.playerTitle : 'Player',
        };
      },
    },
    Menu: {
      screen: TabStack,
      navigationOptions: {
        headerTitle: 'Menu',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#444',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

class AppWithoutNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  onBackPress() {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = {
      dispatch,
      state: nav,
      addListener,
    };

    return <AppNavigator navigation={navigation} />;
  }
}

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');

AppWithoutNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(AppWithoutNavigationState);
