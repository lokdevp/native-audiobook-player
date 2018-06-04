import Sound from 'react-native-sound';

export default (function player() {
  let sound;
  let path = '';
  return {
    pause() {
      sound.pause(() => {
      });
    },
    stopAndRelease() {
      path = '';
      if (sound) {
        sound.stop();
        sound.release();
      }
    },
    skip(seconds) {
      sound.getCurrentTime(currentTime => sound.setCurrentTime(currentTime + seconds));
    },
    rewind(seconds) {
      sound.getCurrentTime(currentTime => sound.setCurrentTime(currentTime - seconds));
    },
    setSpeed(speed) {
      sound.setSpeed(speed);
    },
    changeSrc(url) {
      if (sound) {
        sound.stop();
        sound.release();
      }
      sound = new Sound(url, null, (error) => {
        if (error) {
          console.log(error);
        }
      });
      path = url;
    },
    getTheTime() {
      if (sound.isLoaded()) {
        return new Promise(resolve => sound.getCurrentTime(seconds => resolve(seconds)));
      }
      return Promise.reject(new Error('Audio not loaded'));
    },
    setCurrentTime(seconds) {
      sound.setCurrentTime(seconds);
    },
    setTimeAndPlay(seconds, next, dispatch, getState) {
      sound.setCurrentTime(seconds).play(() => next(dispatch, getState));
    },
    setSourceTimeAndPlay(url, startTime, next, dispatch, getState) {
      if (sound) {
        sound.stop();
        sound.release();
      }
      sound = new Sound(url, null, (error) => {
        if (error) {
          console.log(error);
          return;
        }
        sound.setCurrentTime(startTime).play(() => {
          next(dispatch, getState);
        });
      });
      path = url;
    },
    isCurrentPath(url) {
      return path === url;
    },
  };
}());
