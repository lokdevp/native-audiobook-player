import {
  PLAY,
  PAUSE,
  SKIP,
  REWIND,
  CHANGE_SPEED,
  GET_CURRENT_TIME,
  GOTO,
  SELECT_AUDIOBOOK,
} from './types';
import Audio from '../audio/audio';
import {
  getCurrentTimeAbsolute,
  getPathFromState,
  getNextChapter,
  getPrevChapter,
  getChapter,
  getPathFromId,
} from '../utils/AudiobookUtils';

let timer = null;
let newPosition;

const updateTime = dispatch =>
  Audio.getTheTime()
    .then((seconds) => {
      dispatch({ type: GET_CURRENT_TIME, payload: Math.floor(seconds) });
    })
    .catch(() => dispatch({ type: GET_CURRENT_TIME, payload: 0 }));

const progressInterval = dispatch =>
  setInterval(() => updateTime(dispatch), 1000);

const playAudio = (dispatch, getState, path, startTime) => {
  if (!Audio.isCurrentPath(path)) {
    Audio.setSourceTimeAndPlay(path, startTime, next(), dispatch, getState);
  } else {
    Audio.setTimeAndPlay(startTime, next(), dispatch, getState);
  }
  dispatch({ type: PLAY });
  clearInterval(timer);
  timer = progressInterval(dispatch);
};

const pauseAudio = (dispatch) => {
  Audio.pause();
  dispatch({ type: PAUSE });
  clearInterval(timer);
};

export const play = () => (dispatch, getState) => {
  const path = getPathFromState(getState());
  const startTime = getCurrentTimeAbsolute(getState());
  playAudio(dispatch, getState, path, startTime);
};

export const pause = () => (dispatch) => {
  pauseAudio(dispatch);
};

export const skip = seconds => (dispatch) => {
  Audio.skip(seconds);
  updateTime(dispatch);
  dispatch({ type: SKIP, payload: seconds });
};

export const rewind = seconds => (dispatch) => {
  Audio.rewind(seconds);
  updateTime(dispatch);
  dispatch({ type: REWIND, payload: seconds });
};

const goToNextOrPrev = (dispatch, getState, nextorprev) => {
  const { startTime, path, chapterIdx } = nextorprev(getState());
  if (chapterIdx === -1) {
    pauseAudio(dispatch);
    return;
  }
  if (getState().player.playing) {
    playAudio(dispatch, getState, path, startTime);
  }
  dispatch({
    type: GOTO,
    payload: chapterIdx,
  });
};

export const next = () => (dispatch, getState) => {
  goToNextOrPrev(dispatch, getState, getNextChapter);
};

export const prev = () => (dispatch, getState) => {
  goToNextOrPrev(dispatch, getState, getPrevChapter);
};

export const goToChapter = chapterIdx => (dispatch, getState) => {
  const { startTime, path } = getChapter(getState(), chapterIdx);
  if (getState().player.playing) {
    playAudio(dispatch, getState, path, startTime);
  }
  dispatch({
    type: GOTO,
    payload: chapterIdx,
  });
};

export const changeSpeed = (speed = 1) => (dispatch) => {
  Audio.setSpeed(speed);
  dispatch({ type: CHANGE_SPEED, payload: speed });
};

export const slidingStart = () => () => {
  clearInterval(timer);
};

export const slidingChange = (value, duration) => () => {
  newPosition = value * duration;
};

export const slidingComplete = () => (dispatch, getState) => {
  const selectedAudiobookId = getState().position.get('selectedAudiobookId');
  const startTime = getState()
    .position.get('positions')
    .get(selectedAudiobookId)
    .get('startTime');
  Audio.setCurrentTime(newPosition + startTime);
  timer = progressInterval(dispatch);
};

export const selectAudiobook = audiobook => (dispatch, getState) => {
  dispatch({
    type: SELECT_AUDIOBOOK,
    payload: audiobook,
  });
  if (!Audio.isCurrentPath(getPathFromId(audiobook, getState()))) {
    Audio.stopAndRelease();
    dispatch({ type: PAUSE });
    clearInterval(timer);
  }
};
