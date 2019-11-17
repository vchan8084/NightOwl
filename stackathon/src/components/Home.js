import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={{
            uri:
              'https://i1.sndcdn.com/artworks-000223801346-h9lz5t-t500x500.jpg',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Map')}
          >
            <Text style={styles.button}>Go To Map</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
  },
});
