import { fromJS, setIn, getIn } from 'immutable';
import { SELECT_AUDIOBOOK, POPULATE_AUDIOBOOKS, GET_CURRENT_TIME, GOTO } from '../actions/types';

const initialState = fromJS({ selectedAudiobookId: '', selectedAudiobook: {}, positions: {} });

function calcPosition(state, seconds) {
  const selectedAudiobookId = state.get('selectedAudiobookId');
  const position = getIn(state, ['positions', selectedAudiobookId]);
  const playingAudiobook = state.get('selectedAudiobook');
  let currentTime;
  let duration;
  let chapterIdx;
  let startTime;
  let totalProgressTime;

  chapterIdx = position.get('chapterIdx');
  duration = getIn(playingAudiobook, ['chapters', chapterIdx, 'duration']);
  startTime = getIn(playingAudiobook, ['chapters', chapterIdx, 'chapter_start_time']);
  currentTime = seconds - startTime;
  totalProgressTime =
    getIn(playingAudiobook, ['chapters', chapterIdx, 'totalProgressTime']) + currentTime;
  if (currentTime > duration) {
    chapterIdx += 1;
    duration = getIn(playingAudiobook, ['chapters', chapterIdx, 'duration']);
    startTime = getIn(playingAudiobook, ['chapters', chapterIdx, 'chapter_start_time']);
    totalProgressTime = getIn(playingAudiobook, ['chapters', chapterIdx, 'totalProgressTime']);
    currentTime = seconds - startTime;
    return position.merge({
      chapterIdx,
      currentTime,
      startTime,
      duration,
      totalProgressTime,
    });
  }
  return position.merge({ currentTime, duration, totalProgressTime });
}
function next(state, chapterIdx) {
  const selectedAudiobookId = state.get('selectedAudiobookId');
  const position = getIn(state, ['positions', selectedAudiobookId]);
  const playingAudiobook = state.get('selectedAudiobook');
  const duration = getIn(playingAudiobook, ['chapters', chapterIdx, 'duration']);
  const startTime = getIn(playingAudiobook, ['chapters', chapterIdx, 'chapter_start_time']);
  const totalProgressTime = getIn(playingAudiobook, ['chapters', chapterIdx, 'totalProgressTime']);
  const currentTime = 0;
  return position.merge({
    chapterIdx,
    currentTime,
    startTime,
    duration,
    totalProgressTime,
  });
}
export default function PositionReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_AUDIOBOOK:
      return state.withMutations(tempstate =>
        tempstate
          .set('selectedAudiobookId', action.payload.get('path'))
          .set('selectedAudiobook', action.payload));
    case POPULATE_AUDIOBOOKS:
      return state.withMutations(tempstate =>
        tempstate
          .set('selectedAudiobookId', '')
          .set('selectedAudiobook', {})
          .set('positions', fromJS(action.payload.positions)));
    case GET_CURRENT_TIME:
      return setIn(
        state,
        ['positions', state.get('selectedAudiobookId')],
        calcPosition(state, action.payload),
      );
    case GOTO:
      return setIn(
        state,
        ['positions', state.get('selectedAudiobookId')],
        next(state, action.payload),
      );
    default:
      return state;
  }
}
