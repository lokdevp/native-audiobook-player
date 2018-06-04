// Start with two routes: The Main screen, with the Login screen on top.
import {
  PLAY,
  PAUSE,
  POPULATE_AUDIOBOOKS,
  RESTORE_AUDIOBOOKS,
  ASYNC_REQUEST,
} from '../actions/types';

const initialState = { playing: false, loading: false };

export default function player(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      return { ...state, playing: true };
    case PAUSE:
      return { ...state, playing: false };
    case ASYNC_REQUEST:
      return { ...state, loading: true };
    case POPULATE_AUDIOBOOKS:
      return { ...state, loading: false };
    case RESTORE_AUDIOBOOKS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
