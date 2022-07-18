import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity , SafeAreaView} from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
// import axios from 'axios';
import axios from '../../api.js'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passport, setPassport] = useState({ value: '', error: '' })
  const [errormsg, setErrormsg] = useState({ value: '', error: '' })
  const onSignUpPressed = async() => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passportError = passwordValidator(passport.value)
    if (emailError || passwordError || nameError || passportError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPassport({ ...passport, error: passportError })
      return
    }
    else {
      console.log("start axios")
     
      await axios.post('/register', {
          email: email.value,
          password: password.value,
          name: name.value,
          passport : passport.value,
      })
        .then(function (response) {
          console.log(response);
          if (response.data == "Email already exists!" || response.data == "Passport already exists!") {
            setErrormsg({ ...errormsg, value: response.data})
            console.log("Email exists")
          }
          else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    
  }

  return (
    
      <Background style = {{flex:1 , backgroundColor: "green"}}>
      <BackButton goBack={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }} />
        <Logo />
        <Header>Create Account</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
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
          secureTextEntry
        />
        <TextInput
          label="Passport"
          returnKeyType="done"
          value={passport.value}
          onChangeText={(text) => setPassport({ value: text, error: '' })}
          error={!!passport.error}
          errorText={passport.error}
          secureTextEntry
      />
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
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    
    
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
