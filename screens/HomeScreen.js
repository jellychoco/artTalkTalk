import React, { useEffect } from "react"
import {
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
  Text
} from "react-native"
import useStatusBar from "../hooks/useStatusBar"
import { logout } from "../components/Firebase/firebase"
import story from "../assets/story.png"

var width = Dimensions.get("window").width

export default function HomeScreen({ navigation }) {
  const {height} = Image.resolveAssetSource(story);

  useStatusBar("dark-content")

  async function handleSignOut() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ScrollView horizontal={false} bouncesZoom={true}  style={styles.container}>
      <Image source={story} style={{width:width,height:height * 0.4
      }} resizeMethod="scale" resizeMode="cover" />
      <View style={{position:"absolute",top:"2%",left:0}}>
        <Button title="<" />
      </View>
      
      <Button title="Sign Out" onPress={handleSignOut} />
      {/* <Button title="업로드페이지로" onPress={()=>{navigation.navigate('Upload')}}/> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    width:width,
    position:"relative"
  },
  wrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
})
