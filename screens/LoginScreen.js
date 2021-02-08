import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar
} from "react-native"
import * as Yup from "yup"
import AppButton from "../components/AppButton"
import Colors from "../utils/colors"
import SafeView from "../components/SafeView"
import Form from "../components/Forms/Form"
import FormField from "../components/Forms/FormField"
import FormButton from "../components/Forms/FormButton"
import IconButton from "../components/IconButton"
import { loginWithEmail } from "../components/Firebase/firebase"
import FormErrorMessage from "../components/Forms/FormErrorMessage"
import useStatusBar from "../hooks/useStatusBar"
import Login from "../assets/Login.png"

var width = Dimensions.get("window").width
var height = Dimensions.get("window").height

const validationSchema = Yup.object().shape({
  email: Yup.string().required("").email().label("Email"),
  password: Yup.string()
    .required("")
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
})

export default function LoginScreen({ navigation }) {
  useStatusBar("light-content")

  const [passwordVisibility, setPasswordVisibility] = useState(true)
  const [rightIcon, setRightIcon] = useState("eye")
  const [loginError, setLoginError] = useState("")
  const [isIos,setIsIos] = useState("")
  useEffect(()=>{
if(Platform.OS === 'ios'){
  setIsIos(true)
} else {
  setIsIos(false)
}
  },[])
   
  function handlePasswordVisibility() {
    if (rightIcon === "eye") {
      setRightIcon("eye-off")
      setPasswordVisibility(!passwordVisibility)
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye")
      setPasswordVisibility(!passwordVisibility)
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values

    try {
      await loginWithEmail(email, password)
    } catch (error) {
      if ((error.code = "auth/wrong-password")) {
        setLoginError("이메일 또는 비밀번호가 틀렸습니다.")
      }
      console.log(error.code)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={false}/>
      <ImageBackground source={Login} style={{ width: width, height: height }}>
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",width: width, height: height}}>
      <View style={{width:width*0.6,paddingTop:isIos ? height*0.18 : height*0.21}}>
        <Form
          initialValues={{ email: "", password: "" }}
          // validationSchema={validationSchema}
          onSubmit={(values) => handleOnLogin(values)}
        >
          <FormField
            name='email'
            placeholder='이메일'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
          />
          <FormField
            name='password'
            placeholder='비밀번호'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            handlePasswordVisibility={handlePasswordVisibility}
          />
          {<FormErrorMessage error={loginError} visible={true} />}
          <View style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
             
              <AppButton
                title='회원가입'
                color='yellow'
                onPress={() => navigation.navigate("Register")}
              />
              <AppButton title={"로그인"} color="purple" />
                {/* <FormButton color="purple" title={"로그인"} /> */}
               
          </View>
        </Form>
      </View>
      </View>
        {/* <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordButtonText}>비밀번호찾기</Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:0,
    padding:0,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // padding: 15,
    backgroundColor: Colors.mediumGrey,
  },
  logo: {
    width: 250,
    height: 250,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
})
