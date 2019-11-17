import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

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
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>Night Owl</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // button: {
  //   width: '100%'
  //   backgroundColor: 'black',
  //   // borderWidth: 1,
  //   // borderRadius: 1,
  //   color: 'white',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   // overflow: 'hidden',
  //   // padding: 5,
  //   textAlign: 'center',
  //   // justifyContent: 'center',
  // },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#336633',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  textStyle: {
    fontFamily: 'Didot-Bold',
    alignSelf: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
