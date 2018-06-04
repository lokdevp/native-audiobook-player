import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes.',
]);
AppRegistry.registerComponent('NativeAudiobookPlayer', () => App);
