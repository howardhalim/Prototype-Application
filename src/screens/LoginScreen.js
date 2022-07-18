import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View ,Keyboard} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
// import axios from 'axios'
import axios from '../../api.js'
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errormsg, setErrormsg] = useState({ value: '', error: '' })
  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    var temp;
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    else {
      console.log("loging in");
      await axios.post('/login', {
        email: email.value,
        password: password.value,
      })
        .then(function (response) {
          console.log(response.data);
          temp = response.data;
          console.log(temp)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // console.log(temp)
    if (temp == "Incorrect password" || temp == "Email does not exist!") {
      setErrormsg({ ...errormsg, value: temp })
      setEmail({ ...email, value: '' })
      setPassword({ ...password, value: '' })
    }
    else {
      console.log(temp)
      navigation.navigate({
        name: 'Dashboard',
        params: {user : temp}
      })
    }
  }

  return (
    <Background>
      <BackButton goBack={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          }
        }
      } />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        autoCapitalize="none"
        secureTextEntry
      />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
          
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      {
        errormsg.value != "" ?
        <View style={styles.error}>
          <Text style={{ color: 'red' }}>
            {errormsg.value}
          </Text>
          </View>
          :
          <></>
      
      }
      
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  error: {
    width: '100%',
  }
})
