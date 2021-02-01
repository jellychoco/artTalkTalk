import React, { useState, useEffect } from "react"
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import { Camera } from "expo-camera"
import * as firebase from "firebase"
import { auth,storage } from "../components/Firebase/firebase"
const UploadScreen = () => {
  const [image, setImage] = useState(null)
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const uid = auth.currentUser.uid
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
      console.log(status)
      setHasPermission(status === "granted")
    })()
  }, [])

  const permitAgain = async()=>{
    const {status} = await Camera.requestPermissionsAsync()
    setHasPermission(status === "granted")
  }

  const uploadImage = async (url, name) => {
    const res = await fetch(url)
    const blob = await res.blob()

    let ref = storage.ref().child(`images/${uid}`)
    return ref.put(blob)
  }

  const getAndSave =  ()=>{

     storage.ref().child(`images/${uid}`).getDownloadURL().then((res)=>{
       console.log(res)
     })
  }
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync()

    if (!result.cancelled) {
      setImage(result.uri)
    }
    return result
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result.url)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  if (hasPermission === null) {
    return <View ><Text>권한이 없써용</Text></View>
  }
  if (hasPermission === false) {
    return (<View><Text>카메라 권한이 없습니다</Text>
    
  <Button title="권한허용 재시도" onPress={permitAgain}/></View>)
  }

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title='사진선택' onPress={pickImage} />

        <Button title='url' onPress={getAndSave} />
        <Button title='카메라열기' onPress={openCamera} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button
          title='확인'
          onPress={() => {
            uploadImage(image, "test")
              .then((res) => {
                console.log(JSON.stringify(res) )
              })
              .catch((err) => {
                console.log(err)
              })
          }}
        />
      </View>
      {/* <View style={styles.container}>
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
    </View> */}
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
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
})

export default UploadScreen
