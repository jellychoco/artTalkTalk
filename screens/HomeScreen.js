import React,{useEffect} from 'react';
import { View, StyleSheet, Button, Image,Dimensions,ScrollView } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
// import { ScrollView } from 'react-native-gesture-handler';
import story from '../assets/story.png'


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

export default function HomeScreen({navigation}) {

// const {width,height} = Image.resolveAssetSource(story);

console.log(width,height)
  useStatusBar('dark-content');
  
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
      <Image source={story} resizeMode="contain" style={{minWidth:"100%",minHeight:"100%"}}/>
      </View>
      {/* <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="업로드페이지로" onPress={()=>{navigation.navigate('Upload')}}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
  },
  wrapper:{
    display:"flex",
    width: '100%',
    height: '100%',
    resizeMode: 'cover',        
  }
});
