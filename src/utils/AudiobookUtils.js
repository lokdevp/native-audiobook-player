import { getIn } from 'immutable';

export const getPathFromId = (audiobook, state) => {
  const chapterIdx = getIn(state.position, ['positions', audiobook.get('path'), 'chapterIdx']);
  return audiobook
    .get('chapters')
    .get(chapterIdx)
    .get('path');
};

export const getPathFromState = (state) => {
  const selectedAudiobook = state.position.get('selectedAudiobook');
  const chapterIdx = getIn(state.position, ['positions', selectedAudiobook.get('path'), 'chapterIdx']);
  return selectedAudiobook.get('chapters').get(chapterIdx).get('path');
};
export const getCurrentTimeAbsolute = (state) => {
  const selectedAudiobookId = state.position.get('selectedAudiobookId');
  const position = state.position.get('positions').get(selectedAudiobookId);
  const startTime = position.get('startTime');
  const currentTime = position.get('currentTime');
  return startTime + currentTime;
};

export const getNextChapter = (state) => {
  const selectedAudiobookId = state.position.get('selectedAudiobookId');
  const selectedAudiobook = state.position.get('selectedAudiobook');
  let chapterIdx = getIn(state.position, ['positions', selectedAudiobookId, 'chapterIdx']);
  const noOfchapters = selectedAudiobook.get('chapters').size;
  if (chapterIdx + 1 >= noOfchapters) {
    return { startTime: -1, path: '', chapterIdx: -1 };
  }
  chapterIdx += 1;
  const chapter = getIn(state.audiobook, [
    'audiobookList',
    selectedAudiobookId,
    'chapters',
    chapterIdx,
  ]);
  const startTime = chapter.get('chapter_start_time');
  const path = chapter.get('path');
  return { startTime, path, chapterIdx };
};

export const getPrevChapter = (state) => {
  const selectedAudiobookId = state.position.get('selectedAudiobookId');
  const position = state.position.get('positions').get(selectedAudiobookId);
  let chapterIdx = getIn(position, ['chapterIdx']);
  if (chapterIdx <= 0) {
    return { startTime: -1, path: '', chapterIdx: -1 };
  }
  chapterIdx -= 1;
  const chapter = getIn(state.audiobook, [
    'audiobookList',
    selectedAudiobookId,
    'chapters',
    chapterIdx,
  ]);
  const startTime = chapter.get('chapter_start_time');
  const path = chapter.get('path');
  return { startTime, path, chapterIdx };
};

export const getChapter = (state, chapterIdx) => {
  const chapter = getIn(state.position, [
    'selectedAudiobook',
    'chapters',
    chapterIdx,
  ]);
  const startTime = chapter.get('chapter_start_time');
  const path = chapter.get('path');
  return { startTime, path };
};

