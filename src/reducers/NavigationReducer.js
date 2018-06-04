import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import { SELECT_AUDIOBOOK } from '../actions/types';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Player':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Player' }),
        state,
      );
      break;
    case SELECT_AUDIOBOOK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Player' }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
