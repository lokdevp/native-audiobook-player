import { createMaterialTopTabNavigator } from 'react-navigation';
import Preferences from '../components/tab/Preferences';
import About from '../components/tab/About';

export default createMaterialTopTabNavigator({
  Preferences: { screen: Preferences },
  About: { screen: About },
});
