import { fromJS } from 'immutable';
import { POPULATE_AUDIOBOOKS, RESTORE_AUDIOBOOKS } from '../actions/types';

const initialState = fromJS({ audiobookList: {} });

export default function AudiobookReducer(state = initialState, action) {
  switch (action.type) {
    case POPULATE_AUDIOBOOKS:
      return state.set('audiobookList', fromJS(action.payload.audiobooks));
    case RESTORE_AUDIOBOOKS:
      return state.set('audiobookList', fromJS(action.payload.audiobooks));
    default:
      return state;
  }
}
