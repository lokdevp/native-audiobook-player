import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { selectAudiobook } from '../../actions/PlayerActions';
import { restoreAudiobooks } from '../../actions/AudiobookActions';
import { CardSection, Spinner } from '../common';
import AudiobookProgress from './AudiobookProgress';
import { whiteText, primaryBgColor, primaryColor } from '../styles/Colors';

class AudiobookList extends Component {
  componentDidMount() {
    this.props.restoreAudiobooks();
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <View style={{ backgroundColor: primaryBgColor }}>
        <ScrollView style={styles.scrollStyle}>
          {this.props.audiobookList.toList().map(audiobook => (
            <CardSection
              style={
                audiobook.get('path') === this.props.selectedAudiobookId
                  ? styles.cardSectionSelected
                  : styles.cardSection
              }
              key={audiobook.get('path')}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
                onPress={() => this.props.selectAudiobook(audiobook)}
              >
                {audiobook.get('coverArt') ? (
                  <Image style={styles.coverArt} source={{ uri: audiobook.get('coverArt') }} />
                ) : (
                  <View style={[styles.coverArt, styles.coverArtNoImg]}>
                    <Text style={styles.coverArtText}>{audiobook.get('title').charAt(0)}</Text>
                  </View>
                )}
                <View style={styles.audiobookStatus}>
                  <Text
                    style={
                      audiobook.get('path') === this.props.selectedAudiobookId
                        ? styles.textSelected
                        : styles.text
                    }
                  >
                    {audiobook.get('title')}
                  </Text>
                  <AudiobookProgress
                    totalProgressTime={this.props.positions
                      .get(audiobook.get('path'))
                      .get('totalProgressTime')}
                    duration={audiobook.get('duration')}
                    progressPercent={
                      this.props.positions.get(audiobook.get('path')).get('totalProgressTime') /
                      audiobook.get('duration') *
                      100
                    }
                  />
                </View>
              </TouchableOpacity>
            </CardSection>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: whiteText,
    fontSize: 13,
  },
  textSelected: {
    color: whiteText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardSection: {
    flexDirection: 'column',
    backgroundColor: '#171e24',
    borderColor: '#000',
    borderBottomWidth: 1,
  },
  cardSectionSelected: {
    flexDirection: 'column',
    backgroundColor: '#1b729c',
    borderColor: '#000',
    borderBottomWidth: 1,
  },
  scrollStyle: {
    height: '100%',
  },
  coverArt: {
    width: 75,
    height: 75,
  },
  coverArtNoImg: {
    backgroundColor: primaryColor,
    justifyContent: 'center',
  },
  coverArtText: {
    fontSize: 30,
    textAlign: 'center',
  },
  audiobookStatus: {
    flexDirection: 'column',
    width: '72%',
    margin: '1%',
    marginLeft: '3%',
    justifyContent: 'space-between',
  },
});
const mapStateToProps = state => ({
  audiobookList: state.audiobook.get('audiobookList'),
  selectedAudiobookId: state.position.get('selectedAudiobookId'),
  positions: state.position.get('positions'),
  loading: state.player.loading,
});
export default connect(mapStateToProps, { selectAudiobook, restoreAudiobooks })(AudiobookList);
