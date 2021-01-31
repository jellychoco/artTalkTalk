import React,{useEffect} from 'react';
import { View, StyleSheet, Button } from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen({navigation}) {
  useStatusBar('dark-content');
  
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="업로드페이지로" onPress={()=>{navigation.navigate('Upload')}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
