import { AsyncStorage } from 'react-native';
import { POPULATE_AUDIOBOOKS, RESTORE_AUDIOBOOKS, ASYNC_REQUEST } from './types';
import { getAudiobooks } from '../utils/GetAudiobooks';

export const populateAudiobooks = path => (dispatch) => {
  dispatch({ type: ASYNC_REQUEST });
  getAudiobooks(path).then((audiobooks) => {
    AsyncStorage.setItem('audiobookStore', JSON.stringify(audiobooks))
      .then(() =>
        dispatch({
          type: POPULATE_AUDIOBOOKS,
          payload: audiobooks,
        }))
      .catch(error => console.log(error));
  });
};

export const restoreAudiobooks = () => (dispatch) => {
  dispatch({ type: ASYNC_REQUEST });
  AsyncStorage.getItem('audiobookStore')
    .then((audiobooks) => {
      if (audiobooks) {
        dispatch({
          type: RESTORE_AUDIOBOOKS,
          payload: JSON.parse(audiobooks),
        });
      } else {
        dispatch({
          type: RESTORE_AUDIOBOOKS,
          payload: { audiobooks: {} },
        });
      }
    })
    .catch(error => console.log(error));
};
