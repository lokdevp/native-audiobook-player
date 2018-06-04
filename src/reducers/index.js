import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import PlayerReducer from './PlayerReducer';
import AudiobookReducer from './AudiobookReducer';
import PositionReducer from './PositionReducer';

const AppReducer = combineReducers({
  nav: NavigationReducer,
  player: PlayerReducer,
  audiobook: AudiobookReducer,
  position: PositionReducer,
});

export default AppReducer;
