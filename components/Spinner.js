import React from 'react';
import { ActivityIndicator, Image, StyleSheet,Dimensions,View } from 'react-native';
import main from '../assets/Loading.png'
import SafeView from './SafeView';
import Colors from '../utils/colors';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;
export default function Spinner() {
  return (
    <View style={styles.container}>
      <Image style={{width:width,height:height}} source={main} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
