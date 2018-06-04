import React from 'react';
import { Text, View } from 'react-native';
import DirectoryPickerManager from 'react-native-directory-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { populateAudiobooks } from '../../actions/AudiobookActions';
import { CardSection, Input, Spinner } from '../common';
import { iconColor } from '../styles/Colors';

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = { directoryPath: '' };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFolderPick = this.onFolderPick.bind(this);
  }
  onChangeText(value) {
    this.setState({ directoryPath: value });
  }
  onFolderPick() {
    DirectoryPickerManager.showDirectoryPicker(null, (response) => {
      this.setState({ directoryPath: response.path });
    });
  }
  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <View>
        <CardSection>
          <Input
            value={this.state.directoryPath}
            onChangeText={this.onChangeText}
            placeholder="/path/to/audiobook-folder"
          />
        </CardSection>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <Icon.Button name="md-folder" backgroundColor={iconColor} onPress={this.onFolderPick}>
            Select Folder
          </Icon.Button>
          <Icon.Button
            name="md-refresh"
            backgroundColor={iconColor}
            onPress={() => this.props.populateAudiobooks(this.state.directoryPath)}
          >
            Load Audiobooks
          </Icon.Button>
        </CardSection>
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          Type or paste the path if selection doesnt work
        </Text>
      </View>
    );
  }
}
function mapStateToProps({ player }) {
  const { loading } = player;
  return { loading };
}
export default connect(mapStateToProps, { populateAudiobooks })(Preferences);
