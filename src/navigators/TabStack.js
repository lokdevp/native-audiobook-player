import { createTabNavigator } from 'react-navigation';
import Preferences from '../components/tab/Preferences';
import About from '../components/tab/About';

export default createTabNavigator({
  Preferences: { screen: Preferences },
  About: { screen: About },
});
