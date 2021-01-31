import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View ,Image} from 'react-native';
import * as Yup from 'yup';
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('')
    .email()
    .label('Email'),
  password: Yup.string()
    .required('')
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});

export default function LoginScreen({ navigation }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      if(error.code = "auth/wrong-password"){

        setLoginError("이메일 또는 비밀번호가 틀렸습니다.");
      }
      console.log(error.code)
    }
  }

  return (
    <SafeView style={styles.container}>
      
      <View style={styles.logoContainer} >
        <Image source={require('../assets/flame.png')} style={styles.logo} />
      </View>
      <Form
        initialValues={{ email: '', password: '' }}
        // validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="이메일을 입력하세요"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="비밀번호를 입력하세요"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormButton title={'로그인'} />
        {<FormErrorMessage error={loginError} visible={true} />}
        <AppButton
          title="회원가입"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordButtonText}>비밀번호찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.mediumGrey
  },
  logo: {
    width: 250,
    height: 250
  },
  logoContainer: {
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
