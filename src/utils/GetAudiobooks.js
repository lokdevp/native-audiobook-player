import MediaMeta from 'react-native-media-meta';
import _ from 'lodash';

const RNFS = require('react-native-fs');

const imageTypes = ['jpg', 'jpeg', 'png', 'bmp'];
const audioTypes = [
  '3gp',
  'aac',
  'awb',
  'flac',
  'imy',
  'm4a',
  'm4b',
  'mid',
  'mka',
  'mkv',
  'mp3',
  'mp3package',
  'mp4',
  'opus',
  'mxmf',
  'oga',
  'ogg',
  'ota',
  'rtttl',
  'rtx',
  'wav',
  'webm',
  'wma',
  'xmf',
];
export const M4BFILE = 'M4BFILE';
export const M4BDIR = 'M4BDIR';
export const MP3FILE = 'MP3FILE';
export const MP3DIR = 'MP3DIR';

const getExtension = file => file.match(/\.([^/.]+$)/)[1];
const isAudio = file => audioTypes.indexOf(getExtension(file)) !== -1;
const isImage = file => imageTypes.indexOf(getExtension(file)) !== -1;
const isM4b = file => getExtension(file) === 'm4b';

export async function getAudioBookFiles(url) {
  const files = await RNFS.readDir(url);
  const audiobookFileInfos = Promise.all(files.map(async (file) => {
    const audiobookInfo = {};
    if (file.isDirectory()) {
      // If the audiobook is a directory
      let directoryFiles = await RNFS.readDir(file.path);
      directoryFiles = directoryFiles.filter(directoryFile => directoryFile.isFile());
      const audioFiles = directoryFiles.filter(({ name }) => isAudio(name));
      const imageFiles = directoryFiles.filter(({ name }) => isImage(name));
      if (audioFiles.length > 0) {
        audiobookInfo.audioFiles = audioFiles;
        audiobookInfo.path = file.path;
        audiobookInfo.type = isM4b(audioFiles[0].name) ? M4BDIR : MP3DIR;
        if (imageFiles.length !== 0) {
          audiobookInfo.coverArt = await RNFS.readFile(imageFiles[0].path, 'base64');
        }
      }
    } else if (isAudio(file.name)) {
      // If the audiobook is a file
      audiobookInfo.audioFile = file;
      audiobookInfo.type = isM4b(file.name) ? M4BFILE : MP3FILE;
    }
    return audiobookInfo;
  }));
  // .filter(audiobook => Object.keys(audiobook).length > 0)
  return audiobookFileInfos;
}

export async function getAudiobookMetadata(audiobookFileInfo) {
  const audiobook = {};
  if (audiobookFileInfo.type === M4BDIR || audiobookFileInfo.type === MP3DIR) {
    const { audioFiles } = audiobookFileInfo;
    const metadataInFiles = Promise.all(audioFiles.map(async (file) => {
      const metadata = await MediaMeta.get(file.path, {
        getChapters: audiobookFileInfo.type === M4BDIR,
        getThumb: true,
      });
      const audioFile = {};
      audioFile.title = 'album' in metadata ? metadata.album : file.name.replace(/\.[^/.]+$/, '');
      audioFile.duration = 'duration' in metadata ? metadata.duration : 0;
      audioFile.path = file.path;
      if ('thumb' in metadata) {
        audioFile.coverArt = metadata.thumb;
      } else if (audiobookFileInfo.coverArt) {
        audioFile.coverArt = audiobookFileInfo.coverArt;
      }
      audioFile.chapters =
          'chapters' in metadata
            ? metadata.chapters.map(chapter => ({ ...chapter, path: file.path }))
            : [
              {
                title: audioFile.title,
                duration: audioFile.duration,
                path: audioFile.path,
                chapter_start_time: 0,
              },
            ];
      return audioFile;
    }));
    const metadataInFilesResolved = await metadataInFiles;
    audiobook.chapters = metadataInFilesResolved.reduce((acc, cur) => acc.concat(cur.chapters), []);
    audiobook.title = metadataInFilesResolved[0].title;
    audiobook.coverArt = metadataInFilesResolved[0].coverArt;
    audiobook.path = audiobookFileInfo.path;
    audiobook.type = metadataInFilesResolved[0].chapters ? M4BDIR : MP3DIR;
    audiobook.duration = metadataInFilesResolved.reduce(
      (totalDuration, { duration }) => Number(duration) + totalDuration,
      0,
    );
  } else {
    const file = audiobookFileInfo.audioFile;
    const metadata = await MediaMeta.get(file.path, {
      getChapters: isM4b(file.name),
      getThumb: true,
    });
    audiobook.title = 'album' in metadata ? metadata.album : file.name.replace(/\.[^/.]+$/, '');
    audiobook.duration = 'duration' in metadata ? metadata.duration : 0;
    audiobook.path = file.path;
    audiobook.coverArt = 'thumb' in metadata ? metadata.thumb : null;
    if ('chapters' in metadata) {
      audiobook.chapters = metadata.chapters.map(chapter => ({ ...chapter, path: file.path }));
      audiobook.type = M4BFILE;
    } else {
      audiobook.type = MP3FILE;
      audiobook.chapters = [
        {
          title: audiobook.title,
          duration: audiobook.duration,
          path: audiobook.path,
          chapter_start_time: 0,
        },
      ];
    }
  }
  let totalProgressTime = 0;
  audiobook.chapters = audiobook.chapters.map((chapter) => {
    const chapterWithtotalProgressTime = { ...chapter, totalProgressTime };
    totalProgressTime += chapter.duration;
    return chapterWithtotalProgressTime;
  });
  audiobook.coverArt = audiobook.coverArt ? `data:image/png;base64,${audiobook.coverArt}` : null;
  return audiobook;
}

export async function getAudiobooks(url) {
  let audioBookFiles = await getAudioBookFiles(url);
  audioBookFiles = audioBookFiles.filter(audiobook => Object.keys(audiobook).length > 0);

  const audiobooksArray = await Promise.all(audioBookFiles.map(getAudiobookMetadata));
  const audiobooks = _.keyBy(audiobooksArray, 'path');

  const positions = _.mapValues(audiobooks, audiobook => ({
    currentTime: 0,
    chapterIdx: 0,
    startTime: 0,
    duration: audiobook.chapters[0].duration,
    totalProgressTime: 0,
  }));
  return { audiobooks, positions };
}
