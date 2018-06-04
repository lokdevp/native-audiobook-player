import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Dimensions, View, StyleSheet, Text } from 'react-native';
import { getIn } from 'immutable';
import {
  play,
  pause,
  skip,
  rewind,
  getCurrentTime,
  setCurrentTime,
  slidingStart,
  slidingChange,
  slidingComplete,
  next,
  prev,
  goToChapter,
} from '../../actions';
import { PlayButton, SkipButton, RewindButton, NextButton, PrevButton } from './ControlButtons';
import SliderControl from './SliderControl';
import ChapterPicker from './ChapterPicker';
import { whiteText, primaryBgColor, primaryColor } from '../styles/Colors';

// const defaultImg = require('../../../resources/default-artwork.png');

const window = Dimensions.get('window');

class Player extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ playerTitle: this.props.title });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.coverArt ? (
          <Image
            resizeMode="cover"
            style={styles.coverArt}
            source={{
              uri: this.props.coverArt,
              width: window.width,
              height: '70%',
            }}
          />
        ) : (
          <View style={[styles.coverArt, styles.coverArtNoImg]}>
            <Text style={styles.coverArtText}>
              {this.props.title}
            </Text>
          </View>
        )}
        <ChapterPicker
          chapters={this.props.chapters}
          chapterIdx={this.props.chapterIdx}
          goToChapter={this.props.goToChapter}
        />
        <SliderControl
          duration={this.props.duration}
          currentTime={this.props.currentTime}
          slidingChange={this.props.slidingChange}
          slidingComplete={this.props.slidingComplete}
          slidingStart={this.props.slidingStart}
        />

        <View style={styles.controls}>
          <PrevButton prev={this.props.prev} />
          <RewindButton rewind={this.props.rewind} />
          <PlayButton
            playing={this.props.playing}
            style={styles.play}
            play={this.props.play}
            pause={this.props.pause}
          />
          <SkipButton skip={this.props.skip} />
          <NextButton next={this.props.next} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: primaryBgColor,
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: whiteText,
    fontSize: 18,
    textAlign: 'center',
  },
  coverArt: {
    marginBottom: 5,
  },
  coverArtNoImg: {
    width: window.width,
    height: '70%',
    backgroundColor: primaryColor,
    justifyContent: 'center',
  },
  coverArtText: {
    fontSize: 40,
    margin: '15%',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 5,
    width: '90%',
    maxWidth: 500,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

function mapStateToProps({ position, player }) {
  const { playing } = player;
  const selectedAudiobookId = position.get('selectedAudiobookId');
  const selectedAudiobook = position.get('selectedAudiobook');
  const title = selectedAudiobook.get('title');
  const coverArt = selectedAudiobook.get('coverArt');
  const chapters = selectedAudiobook.get('chapters');
  const currentPosition = getIn(position, ['positions', selectedAudiobookId]);
  const currentTime = currentPosition.get('currentTime');
  const duration = currentPosition.get('duration');
  const chapterIdx = currentPosition.get('chapterIdx');
  console.log('Player.js', playing, currentTime, duration);
  return {
    playing,
    currentTime,
    duration,
    coverArt,
    chapters,
    chapterIdx,
    title,
  };
}
export default connect(mapStateToProps, {
  play,
  pause,
  skip,
  rewind,
  getCurrentTime,
  setCurrentTime,
  slidingStart,
  slidingChange,
  slidingComplete,
  next,
  prev,
  goToChapter,
})(Player);
