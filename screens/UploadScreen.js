import React, { useState, useEffect } from "react"
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import { Camera } from "expo-camera"
const UploadScreen = () => {
  const [image, setImage] = useState(null)
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [isCameraOpen,setIsCameraOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
      <>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

    </View>
    <View style={styles.container}>
        <Button title="오픈" onPress={()=>{setIsCameraOpen(true)}} />
    {isCameraOpen && <Camera style={styles.camera} type={type}>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
            setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
        }}>
        <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
    </View>
    </Camera>}
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });

export default UploadScreen

